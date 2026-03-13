import Link from 'next/link'

export const metadata = {
  title: 'Booking Confirmed!',
  robots: { index: false },
}

export default function ConfirmedPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 pt-20">
      <div className="max-w-lg w-full text-center">

        {/* Success icon */}
        <div className="w-20 h-20 rounded-full bg-moss/10 border-2 border-moss flex items-center justify-center mx-auto mb-8">
          <span className="text-3xl">✓</span>
        </div>

        <p className="section-label mb-3">You're all set</p>
        <h1 className="font-display text-stone text-4xl md:text-5xl mb-4">
          Your tour is booked!
        </h1>
        <p className="text-stone/60 leading-relaxed mb-8">
          A confirmation email is on its way to you now.
          Thomas will see your booking and looks forward to welcoming you to Inis Mór.
        </p>

        {/* What happens next */}
        <div className="bg-white border border-limestone p-6 text-left mb-8">
          <h3 className="font-display text-stone text-lg mb-4">What happens next</h3>
          <div className="space-y-3">
            {[
              'You\'ll receive an email confirmation with your booking details.',
              'Make your way to Kilronan Pier on the day of your tour.',
              'Thomas and Johnny Cash will be there to meet you.',
              'If anything changes, call Thomas on +353 (0) 852 859 777.',
            ].map((step, i) => (
              <div key={i} className="flex gap-3 text-sm text-stone/60">
                <span className="w-5 h-5 rounded-full bg-amber/10 border border-amber text-amber text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {step}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/inis-mor" className="btn-primary">
            Explore the Island Guide →
          </Link>
          <Link href="/stay" className="btn-outline border-stone text-stone hover:bg-stone hover:text-white">
            Book a room too
          </Link>
        </div>

        <p className="text-stone/30 text-xs mt-8">
          Questions? Email <a href="mailto:thomasfahertytours@gmail.com" className="underline hover:text-amber transition-colors">thomasfahertytours@gmail.com</a>
          {' '}or call <a href="tel:+353852859777" className="underline hover:text-amber transition-colors">+353 (0) 852 859 777</a>
        </p>
      </div>
    </div>
  )
}
