import { saveBooking, generateBookingId } from '@/lib/db'

export async function GET(req) {
  const auth = req.headers.get('x-admin-key')
  if (auth !== process.env.ADMIN_SECRET_KEY) return Response.json({ error: 'Unauthorised' }, { status: 401 })

  const bookings = [
    { firstName:'Aoife',  lastName:'Murphy',   email:'aoife.murphy@gmail.com',    phone:'+353851234567', tourId:'shared',   guests:2, date:'2025-07-15', totalPrice:100,  notes:'',                status:'paid' },
    { firstName:'Ciarán', lastName:'O Brien',  email:'ciaran.obrien@hotmail.com', phone:'+353872345678', tourId:'private4', guests:4, date:'2025-07-18', totalPrice:250,  notes:'Anniversary trip',status:'paid' },
    { firstName:'Sarah',  lastName:'Walsh',    email:'sarah.walsh@yahoo.com',     phone:'+353833456789', tourId:'shared',   guests:3, date:'2025-07-22', totalPrice:150,  notes:'',                status:'confirmed' },
    { firstName:'Declan', lastName:'Brennan',  email:'declan.b@outlook.com',      phone:'+353864567890', tourId:'private6', guests:6, date:'2025-08-02', totalPrice:350,  notes:'Family reunion',  status:'paid' },
    { firstName:'Emma',   lastName:'Kelly',    email:'emma.kelly@gmail.com',      phone:'+353895678901', tourId:'shared',   guests:1, date:'2025-08-10', totalPrice:50,   notes:'Solo traveller',  status:'paid' },
  ]

  const saved = []
  for (const b of bookings) {
    const booking = { ...b, id: generateBookingId(), stripeSessionId: 'cs_test_seed', createdAt: Date.now() - Math.floor(Math.random() * 5 * 86400000) }
    const record = await saveBooking(booking)
    saved.push(record.id)
  }

  return Response.json({ seeded: saved.length, ids: saved })
}
