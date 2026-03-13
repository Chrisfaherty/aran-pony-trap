import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Tour name lookup
const TOUR_NAMES = {
  shared:    'Shared Island Tour (€50pp)',
  private4:  'Private Tour — up to 4 people (€250)',
  private6:  'Private Tour — up to 6 people (€350)',
  private8:  'Private Tour — up to 8 people (€450)',
  private10: 'Private Tour — up to 10 people (€550)',
}

export async function POST(req) {
  const body = await req.text()
  const sig  = req.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature error:', err.message)
    return new Response('Webhook error', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session  = event.data.object
    const meta     = session.metadata
    const amount   = (session.amount_total / 100).toFixed(2)
    const tourName = TOUR_NAMES[meta.tourId] || meta.tourId

    // ── Send emails via Resend ──────────────────────────────
    // Only runs if RESEND_API_KEY is set
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      // 1. Confirmation email to customer
      await resend.emails.send({
        from: `Aran Pony & Trap Tours <${process.env.RESEND_FROM_EMAIL}>`,
        to:   session.customer_email,
        subject: `Booking confirmed — Aran Pony & Trap, ${meta.tourDate}`,
        html: customerEmailHtml({ meta, tourName, amount }),
      })

      // 2. Notification to Thomas
      await resend.emails.send({
        from: `Booking System <${process.env.RESEND_FROM_EMAIL}>`,
        to:   process.env.THOMAS_EMAIL,
        subject: `New booking: ${meta.firstName} ${meta.lastName} — ${meta.tourDate}`,
        html: thomasEmailHtml({ meta, tourName, amount, customerEmail: session.customer_email }),
      })
    }
  }

  return new Response('OK', { status: 200 })
}

// ── Email templates ────────────────────────────────────────────────

function customerEmailHtml({ meta, tourName, amount }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="font-family: Georgia, serif; background: #F5F0E8; margin: 0; padding: 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: white; border: 1px solid #e8e2d6;">

    <!-- Header -->
    <div style="background: #1a4a6e; padding: 32px; text-align: center;">
      <p style="color: #E8A020; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 8px;">Booking confirmed</p>
      <h1 style="color: white; font-size: 24px; margin: 0; font-weight: normal;">Aran Pony & Trap Tours</h1>
      <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 6px 0 0; font-family: sans-serif;">Inis Mór · Aran Islands</p>
    </div>

    <!-- Body -->
    <div style="padding: 32px;">
      <p style="font-family: sans-serif; color: #4a6070; font-size: 15px; line-height: 1.6;">
        Dear ${meta.firstName},
      </p>
      <p style="font-family: sans-serif; color: #4a6070; font-size: 15px; line-height: 1.6;">
        Your booking is confirmed. Thomas and Johnny Cash look forward to welcoming you to Inis Mór.
      </p>

      <!-- Booking details -->
      <div style="background: #F5F0E8; border: 1px solid #e8e2d6; padding: 20px; margin: 24px 0;">
        <h3 style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #888; margin: 0 0 16px; font-family: sans-serif;">Your booking</h3>
        ${row('Tour',  tourName)}
        ${row('Date',  meta.tourDate)}
        ${meta.tourId === 'shared' ? row('Guests', `${meta.guests} people`) : ''}
        ${row('Total paid', `€${amount}`)}
        ${meta.notes ? row('Your notes', meta.notes) : ''}
      </div>

      <h3 style="font-family: sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #888; margin: 24px 0 12px;">On the day</h3>
      ${step(1, 'Make your way to Kilronan Pier, Inis Mór')}
      ${step(2, 'Thomas will meet you at the pier with the pony & trap')}
      ${step(3, 'Your tour lasts 4 hours — wear comfortable shoes and a warm layer')}

      <div style="border-top: 1px solid #e8e2d6; margin-top: 32px; padding-top: 24px;">
        <p style="font-family: sans-serif; color: #4a6070; font-size: 14px; line-height: 1.6;">
          Need to make changes? Contact Thomas directly:
        </p>
        <p style="font-family: sans-serif; color: #888; font-size: 13px;">
          📞 +353 (0) 852 859 777<br>
          ✉️ thomasfahertytours@gmail.com
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #2C3E50; padding: 20px; text-align: center;">
      <p style="color: rgba(255,255,255,0.3); font-size: 11px; font-family: sans-serif; margin: 0;">
        © ${new Date().getFullYear()} Thomas Faherty Tours · Kilronan, Inis Mór · aranponytrap.com
      </p>
    </div>
  </div>
</body>
</html>`
}

function thomasEmailHtml({ meta, tourName, amount, customerEmail }) {
  return `
<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; background: #f5f5f5; padding: 20px;">
  <div style="max-width: 500px; margin: 0 auto; background: white; padding: 24px; border: 1px solid #ddd;">
    <h2 style="color: #1a4a6e; margin-top: 0;">New booking received</h2>
    ${row('Name',    `${meta.firstName} ${meta.lastName}`)}
    ${row('Email',   customerEmail)}
    ${row('Phone',   meta.phone || 'Not provided')}
    ${row('Tour',    tourName)}
    ${row('Date',    meta.tourDate)}
    ${meta.tourId === 'shared' ? row('Guests', meta.guests) : ''}
    ${row('Total',   `€${amount}`)}
    ${meta.notes ? row('Notes', meta.notes) : ''}
    <p style="color: #888; font-size: 12px; margin-top: 24px;">
      This booking was paid via Stripe. You can view all bookings at
      <a href="https://dashboard.stripe.com/payments">dashboard.stripe.com</a>
    </p>
  </div>
</body>
</html>`
}

function row(label, val) {
  return `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e8e2d6;font-family:sans-serif;font-size:13px;">
    <span style="color:#888;text-transform:uppercase;font-size:11px;letter-spacing:1px;">${label}</span>
    <span style="color:#2C3E50;font-weight:600;">${val}</span>
  </div>`
}

function step(n, text) {
  return `<div style="display:flex;gap:12px;margin-bottom:10px;font-family:sans-serif;font-size:13px;color:#4a6070;">
    <span style="width:20px;height:20px;border-radius:50%;background:#E8A020;color:white;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:bold;flex-shrink:0;line-height:20px;text-align:center;">${n}</span>
    ${text}
  </div>`
}
