import Stripe from 'stripe'
import { saveBooking, generateBookingId } from '@/lib/db'
import { sendCustomerConfirmation, sendThomasNotification } from '@/lib/email'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  try {
    const { tourId, form, totalPrice, payOnDay } = await req.json()

    if (payOnDay) {
      const booking = { id:generateBookingId(), status:'confirmed', tourId, date:form.date, guests:form.guests||1, totalPrice, guideId:form.guideId||'', guideName:form.guideName||'', firstName:form.firstName, lastName:form.lastName, email:form.email, phone:form.phone||'', notes:form.notes||'', paymentMethod:'cash_on_day', createdAt:Date.now() }
      const saved = await saveBooking(booking)
      try { await Promise.all([sendCustomerConfirmation(saved), sendThomasNotification(saved)]) } catch(e){console.error('Email error:',e)}
      return Response.json({ bookingId: saved.id })
    }

    const guestNote = tourId==='shared'?` · ${form.guests} people`:''
    const guideNote = form.guideName?` · Guide: ${form.guideName}`:''
    const session = await stripe.checkout.sessions.create({
      payment_method_types:['card'], mode:'payment',
      line_items:[{price_data:{currency:'eur',product_data:{name:'Aran Pony & Trap Tour',description:`Aran Pony & Trap Tour — ${form.date}${guestNote}${guideNote}`,images:['https://static.wixstatic.com/media/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg/v1/fill/w_900,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg']},unit_amount:totalPrice*100},quantity:1}],
      customer_email:form.email,
      metadata:{tourId,tourDate:form.date,firstName:form.firstName,lastName:form.lastName,phone:form.phone||'',guests:String(form.guests||1),notes:form.notes||'',guideId:form.guideId||'',guideName:form.guideName||''},
      success_url:`${process.env.NEXT_PUBLIC_SITE_URL}/book/confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:`${process.env.NEXT_PUBLIC_SITE_URL}/book`,
    })
    return Response.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return Response.json({ error: 'Payment setup failed. Please try again or call Thomas directly.' }, { status: 500 })
  }
}
