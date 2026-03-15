import Stripe from 'stripe'
import { saveBooking, generateBookingId } from '@/lib/db'
import { sendCustomerConfirmation, sendThomasNotification } from '@/lib/email'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  const payload = await req.text()
  const sig = req.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature error:', err.message)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const meta = session.metadata || {}

    const booking = {
      id:           generateBookingId(),
      stripeSessionId: session.id,
      stripePaymentIntent: session.payment_intent,
      status:       'paid',
      tourId:       meta.tourId,
      date:         meta.tourDate,
      guests:       parseInt(meta.guests || '1'),
      totalPrice:   (session.amount_total || 0) / 100,
      firstName:    meta.firstName,
      lastName:     meta.lastName,
      email:        session.customer_email || meta.email || '',
      phone:        meta.phone || '',
      notes:        meta.notes || '',
      createdAt:    Date.now(),
    }

    try {
      const saved = await saveBooking(booking)
      await Promise.all([
        sendCustomerConfirmation(saved),
        sendThomasNotification(saved),
      ])
      console.log(`Booking saved: ${saved.id} for ${saved.date}`)
    } catch (err) {
      console.error('Failed to process booking:', err)
      return Response.json({ received: true, error: err.message })
    }
  }

  return Response.json({ received: true })
}
