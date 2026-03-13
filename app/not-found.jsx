import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="font-display text-atlantic text-8xl mb-4">404</p>
        <h1 className="font-display text-stone text-3xl mb-4">Lost on the island?</h1>
        <p className="text-stone/60 mb-8 leading-relaxed">
          Even Thomas takes a wrong turn sometimes. This page doesn't exist —
          but the rest of the island is right here.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">Back to home →</Link>
          <Link href="/book" className="btn-outline border-stone text-stone hover:bg-stone hover:text-white">Book a tour</Link>
        </div>
      </div>
    </div>
  )
}
