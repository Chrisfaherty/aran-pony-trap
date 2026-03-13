import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  try {
    const { tourId, form, totalPrice } = await req.json()

    // Build a readable description for the Stripe receipt
    const guestNote = tourId === 'shared' ? ` · ${form.guests} people` : ''
    const description = `Aran Pony & Trap Tour — ${form.date}${guestNote}`

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',

      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Aran Pony & Trap Tour',
              description,
              images: ['https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80'],
            },
            unit_amount: totalPrice * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],

      // Pre-fill customer email
      customer_email: form.email,

      // Metadata stored on the payment — visible in Stripe dashboard
      metadata: {
        tourId,
        tourDate:  form.date,
        firstName: form.firstName,
        lastName:  form.lastName,
        phone:     form.phone || '',
        guests:    String(form.guests || 1),
        notes:     form.notes || '',
      },

      // Where to send the customer after payment
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/book/confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.NEXT_PUBLIC_SITE_URL}/book`,

      // Allow promo codes if Thomas ever wants to offer them
      allow_promotion_codes: false,
    })

    return Response.json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    return Response.json(
      { error: 'Payment setup failed. Please try again or call Thomas directly.' },
      { status: 500 }
    )
  }
}
