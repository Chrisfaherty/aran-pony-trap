import { Resend } from 'resend'
import { TOURS } from './tours'

const THOMAS_EMAIL = 'thomasfahertytours@gmail.com'
const FROM_EMAIL = 'bookings@aranponytrap.com'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

export async function sendCustomerConfirmation(booking) {
  const tour = TOURS[booking.tourId]
  const guestText = booking.tourId === 'shared'
    ? booking.guests + ' guest' + (booking.guests > 1 ? 's' : '')
    : 'Private group (up to ' + (tour?.maxPerGroup || '?') + ')'

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
body{font-family:Georgia,serif;color:#2C3E50;max-width:600px;margin:0 auto;padding:20px}
.header{background:#1A4A6E;color:white;padding:30px;text-align:center}
.ref-box{background:#F5F0E8;border:2px solid #E8A020;padding:20px;text-align:center;margin:20px 0}
.ref{font-size:28px;font-weight:bold;color:#1A4A6E;letter-spacing:2px}
.details{background:#f9f9f9;padding:20px;margin:20px 0}
table{width:100%;border-collapse:collapse}
td{padding:8px 0;border-bottom:1px solid #eee}
td:first-child{color:#666;width:140px}
td:last-child{font-weight:bold}
.info{background:#E8F4F8;border-left:4px solid #1A4A6E;padding:15px;margin:20px 0}
.footer{text-align:center;color:#999;font-size:12px;margin-top:30px;border-top:1px solid #eee;padding-top:20px}
</style></head>
<body>
<div class="header"><h1>Aran Pony &amp; Trap Tours</h1><p>Inis M&oacute;r &middot; Thomas Faherty</p></div>
<p>Dear ${booking.firstName},</p>
<p>Your booking is confirmed! We can&apos;t wait to show you Inis M&oacute;r the way it was meant to be seen.</p>
<div class="ref-box">
  <p style="margin:0 0 8px;color:#666;font-size:13px;text-transform:uppercase">Your Booking Reference</p>
  <div class="ref">${booking.id}</div>
  <p style="margin:8px 0 0;color:#666;font-size:12px">Please quote this when contacting Thomas</p>
</div>
<div class="details"><table>
  <tr><td>Tour</td><td>${tour?.name || booking.tourId}</td></tr>
  <tr><td>Date</td><td>${booking.date}</td></tr>
  <tr><td>Guests</td><td>${guestText}</td></tr>
  <tr><td>Amount Paid</td><td>&euro;${booking.totalPrice}</td></tr>
  <tr><td>Meeting Point</td><td>Kilronan Pier, Inis M&oacute;r</td></tr>
  <tr><td>What to bring</td><td>Layers, waterproofs, camera</td></tr>
</table></div>
<div class="info"><strong>&#x1F4CD; How it works:</strong><br>
When you arrive at Kilronan Pier on the ferry, call or text Thomas and he will meet you there.<br>
<strong>Thomas:</strong> <a href="tel:+353852859777">+353 (0) 85 285 9777</a></div>
<div class="info"><strong>&#x26F4; Getting to Inis M&oacute;r:</strong><br>
Ferry from Rossaveal (~40 min) or Doolin (~75 min).<br>
Book at <a href="https://www.aranislandferries.com">aranislandferries.com</a> or <a href="https://www.doolin2aranferries.com">doolin2aranferries.com</a>.</div>
<div class="info"><strong>&#x274C; Cancellation:</strong><br>
Free cancellation or rescheduling within 7 days of booking.<br>
If the ferry isn&apos;t running, contact Thomas before 10am on the day.</div>
${booking.notes ? '<p><strong>Your notes:</strong> ' + booking.notes + '</p>' : ''}
<div class="footer">
  <p>Aran Pony &amp; Trap Tours &middot; Kilronan, Inis M&oacute;r, Co. Galway</p>
  <p><a href="mailto:thomasfahertytours@gmail.com">thomasfahertytours@gmail.com</a> &middot; +353 (0) 85 285 9777</p>
  <p><a href="https://www.aranponytrap.com">www.aranponytrap.com</a></p>
</div>
</body></html>`

  try {
    await getResend().emails.send({
      from: FROM_EMAIL, to: booking.email,
      subject: 'Booking Confirmed — ' + booking.date + ' | Ref: ' + booking.id,
      html,
    })
  } catch (err) {
    console.error('Failed to send customer email:', err)
  }
}

export async function sendThomasNotification(booking) {
  const tour = TOURS[booking.tourId]
  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
body{font-family:Arial,sans-serif;color:#333;max-width:500px;margin:0 auto;padding:20px}
.alert{background:#1A4A6E;color:white;padding:20px;margin-bottom:20px}
table{width:100%;border-collapse:collapse}
td{padding:10px;border-bottom:1px solid #eee}
td:first-child{color:#666;width:130px;font-size:13px}
td:last-child{font-weight:bold}
.big{font-size:22px;color:#1A4A6E}
</style></head>
<body>
<div class="alert"><h1>&#x1F389; New Booking!</h1><p style="margin:5px 0 0;opacity:.8">Aran Pony &amp; Trap Tours</p></div>
<table>
  <tr><td>Reference</td><td>${booking.id}</td></tr>
  <tr><td>Date</td><td class="big">${booking.date}</td></tr>
  <tr><td>Tour</td><td>${tour?.name || booking.tourId}</td></tr>
  <tr><td>Guests</td><td>${booking.guests || 1}</td></tr>
  <tr><td>Paid</td><td class="big">&euro;${booking.totalPrice}</td></tr>
  <tr><td>Name</td><td>${booking.firstName} ${booking.lastName}</td></tr>
  <tr><td>Email</td><td><a href="mailto:${booking.email}">${booking.email}</a></td></tr>
  <tr><td>Phone</td><td>${booking.phone || '—'}</td></tr>
  ${booking.notes ? '<tr><td>Notes</td><td>' + booking.notes + '</td></tr>' : ''}
</table>
<p style="margin-top:20px;color:#666;font-size:13px">
  View all bookings at <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin">your admin dashboard</a>
</p>
</body></html>`

  try {
    await getResend().emails.send({
      from: FROM_EMAIL, to: THOMAS_EMAIL,
      subject: 'New Booking: ' + booking.firstName + ' ' + booking.lastName + ' — ' + booking.date + ' (€' + booking.totalPrice + ')',
      html,
    })
  } catch (err) {
    console.error('Failed to send Thomas notification:', err)
  }
}
