'use client'
import { useState } from 'react'
import Link from 'next/link'
import { TOURS, TOUR_LIST, OPERATING_SEASON, CANCELLATION_POLICY } from '@/lib/tours'

// ─── Step indicator ────────────────────────────────────────────────
function Steps({ current }) {
  const steps = ['Choose tour', 'Your details', 'Payment']
  return (
    <div className="flex items-center gap-0 mb-10">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className={`flex items-center gap-2 ${i < current ? 'text-moss' : i === current ? 'text-stone' : 'text-stone/30'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border ${
              i < current  ? 'bg-moss border-moss text-white' :
              i === current ? 'bg-white border-stone text-stone' :
              'bg-transparent border-stone/20 text-stone/30'
            }`}>
              {i < current ? '✓' : i + 1}
            </div>
            <span className="text-sm font-semibold hidden sm:block">{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-12 h-px mx-3 ${i < current ? 'bg-moss' : 'bg-stone/20'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Step 1: Choose Tour ───────────────────────────────────────────
function Step1({ selected, onSelect }) {
  return (
    <div>
      <h2 className="font-display text-stone text-3xl mb-2">Choose your tour</h2>
      <p className="text-stone/50 text-sm mb-8">All tours are 4 hours · {OPERATING_SEASON.months}</p>

      <div className="space-y-3">
        {TOUR_LIST.map(tour => (
          <button
            key={tour.id}
            onClick={() => onSelect(tour.id)}
            className={`w-full text-left border p-5 transition-all duration-150 flex items-center justify-between group ${
              selected === tour.id
                ? 'border-atlantic bg-atlantic/5'
                : 'border-limestone bg-white hover:border-stone/40'
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                  selected === tour.id ? 'border-atlantic bg-atlantic' : 'border-stone/30'
                }`}>
                  {selected === tour.id && <div className="w-2 h-2 bg-white rounded-full m-auto mt-0.5" />}
                </div>
                <span className="font-display text-stone text-lg">{tour.name}</span>
              </div>
              <p className="text-stone/50 text-sm ml-7">{tour.tagline}</p>
              <p className="text-stone/40 text-xs ml-7 mt-1">Max {tour.maxPerGroup} people · 4 hours</p>
            </div>
            <div className="text-right flex-shrink-0 ml-4">
              <p className="font-display text-stone text-2xl">{tour.priceLabel.split(' ')[0]}</p>
              <p className="text-stone/40 text-xs">{tour.priceLabel.split(' ').slice(1).join(' ')}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Step 2: Details ───────────────────────────────────────────────
function Step2({ tour, form, onChange }) {
  const today = new Date()
  const minDate = new Date(today.getFullYear(), 2, 1) // March 1
  const maxDate = new Date(today.getFullYear(), 9, 31) // Oct 31

  // Determine if today is in season
  const month = today.getMonth() + 1
  const inSeason = month >= 3 && month <= 10
  const minDateStr = inSeason ? today.toISOString().split('T')[0] : `${today.getFullYear()}-03-01`

  return (
    <div>
      <h2 className="font-display text-stone text-3xl mb-2">Your details</h2>
      <p className="text-stone/50 text-sm mb-8">Selected: <strong className="text-stone">{tour.name}</strong> — {tour.priceLabel}</p>

      <div className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-stone/50 mb-2">First name *</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={onChange}
              required
              className="w-full border border-limestone bg-white px-4 py-3 text-stone text-sm focus:outline-none focus:border-atlantic transition-colors"
              placeholder="Your first name"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-stone/50 mb-2">Last name *</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={onChange}
              required
              className="w-full border border-limestone bg-white px-4 py-3 text-stone text-sm focus:outline-none focus:border-atlantic transition-colors"
              placeholder="Your last name"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase text-stone/50 mb-2">Email address *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
            className="w-full border border-limestone bg-white px-4 py-3 text-stone text-sm focus:outline-none focus:border-atlantic transition-colors"
            placeholder="For your booking confirmation"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase text-stone/50 mb-2">Phone number</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onChange}
            className="w-full border border-limestone bg-white px-4 py-3 text-stone text-sm focus:outline-none focus:border-atlantic transition-colors"
            placeholder="Optional — useful if Thomas needs to contact you"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-stone/50 mb-2">Tour date *</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={onChange}
              required
              min={minDateStr}
              max={`${today.getFullYear()}-10-31`}
              className="w-full border border-limestone bg-white px-4 py-3 text-stone text-sm focus:outline-none focus:border-atlantic transition-colors"
            />
            <p className="text-stone/40 text-xs mt-1">Season: March – October</p>
          </div>

          {tour.id === 'shared' && (
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-stone/50 mb-2">Number of people *</label>
              <div className="flex items-center border border-limestone bg-white">
                <button
                  type="button"
                  onClick={() => onChange({ target: { name: 'guests', value: Math.max(1, (form.guests || 1) - 1) } })}
                  className="px-4 py-3 text-stone hover:bg-limestone transition-colors text-lg leading-none"
                >
                  −
                </button>
                <span className="flex-1 text-center text-stone font-semibold text-lg">{form.guests || 1}</span>
                <button
                  type="button"
                  onClick={() => onChange({ target: { name: 'guests', value: Math.min(12, (form.guests || 1) + 1) } })}
                  className="px-4 py-3 text-stone hover:bg-limestone transition-colors text-lg leading-none"
                >
                  +
                </button>
              </div>
              <p className="text-stone/40 text-xs mt-1">€50 per person</p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase text-stone/50 mb-2">Any notes for Thomas?</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={onChange}
            rows={3}
            className="w-full border border-limestone bg-white px-4 py-3 text-stone text-sm focus:outline-none focus:border-atlantic transition-colors resize-none"
            placeholder="Special requirements, accessibility needs, anything you'd like Thomas to know..."
          />
        </div>
      </div>

      {/* Price summary */}
      <div className="mt-8 bg-cream border border-limestone p-5">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-stone font-semibold">{tour.name}</p>
            {tour.id === 'shared' && (
              <p className="text-stone/50 text-sm">{form.guests || 1} × €50</p>
            )}
          </div>
          <p className="font-display text-stone text-2xl">
            {tour.id === 'shared'
              ? `€${(form.guests || 1) * 50}`
              : `€${tour.price}`
            }
          </p>
        </div>
        <p className="text-stone/40 text-xs mt-2">Inclusive of all charges. No booking fees.</p>
      </div>
    </div>
  )
}

// ─── Booking Page ─────────────────────────────────────────────────
export default function BookPage() {
  const [step, setStep]         = useState(0)
  const [tourId, setTourId]     = useState('shared')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [form, setForm]         = useState({
    firstName: '', lastName: '', email: '',
    phone: '', date: '', guests: 2, notes: '',
  })

  const tour = TOURS[tourId]

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: name === 'guests' ? Number(value) : value }))
  }

  const totalPrice = tourId === 'shared' ? form.guests * 50 : tour.price

  const handleCheckout = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tourId, form, totalPrice }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Something went wrong. Please try again or call Thomas directly.')
      }
    } catch {
      setError('Connection error. Please try again or call +353 (0) 852 859 777.')
    }
    setLoading(false)
  }

  const canProceed1 = !!tourId
  const canProceed2 = form.firstName && form.lastName && form.email && form.date

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24">
      <div className="container-site max-w-2xl">

        <div className="mb-8">
          <Link href="/experience" className="text-stone/40 text-xs tracking-widest uppercase hover:text-amber transition-colors">
            ← Back to tour details
          </Link>
        </div>

        <Steps current={step} />

        <div className="bg-white border border-limestone p-8">

          {step === 0 && (
            <>
              <Step1 selected={tourId} onSelect={setTourId} />
              <div className="mt-8">
                <button
                  disabled={!canProceed1}
                  onClick={() => setStep(1)}
                  className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue →
                </button>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <Step2 tour={tour} form={form} onChange={handleChange} />
              <div className="mt-8 flex gap-3">
                <button onClick={() => setStep(0)} className="border border-limestone text-stone px-6 py-4 text-sm hover:bg-limestone transition-colors">
                  ← Back
                </button>
                <button
                  disabled={!canProceed2}
                  onClick={() => setStep(2)}
                  className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue to payment →
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-display text-stone text-3xl mb-6">Review & pay</h2>

              {/* Summary */}
              <div className="space-y-3 mb-8">
                {[
                  { label: 'Tour',   val: tour.name },
                  { label: 'Date',   val: form.date },
                  { label: 'Name',   val: `${form.firstName} ${form.lastName}` },
                  { label: 'Email',  val: form.email },
                  ...(tourId === 'shared' ? [{ label: 'Guests', val: `${form.guests} people` }] : []),
                  ...(form.notes ? [{ label: 'Notes', val: form.notes }] : []),
                ].map(r => (
                  <div key={r.label} className="flex gap-4 text-sm border-b border-limestone pb-3">
                    <span className="text-stone/40 uppercase tracking-wide text-xs font-semibold w-16 flex-shrink-0 pt-0.5">{r.label}</span>
                    <span className="text-stone">{r.val}</span>
                  </div>
                ))}
                <div className="flex gap-4 items-center pt-2">
                  <span className="text-stone/40 uppercase tracking-wide text-xs font-semibold w-16 flex-shrink-0">Total</span>
                  <span className="font-display text-stone text-3xl">€{totalPrice}</span>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 mb-6">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="border border-limestone text-stone px-6 py-4 text-sm hover:bg-limestone transition-colors">
                  ← Back
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="btn-primary flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Redirecting to payment…' : `Pay €${totalPrice} securely →`}
                </button>
              </div>

              <p className="text-stone/30 text-xs text-center mt-4">
                Secure payment via Stripe. Your card details are never stored by us.
              </p>

              {/* Cancellation reminder */}
              <div className="mt-6 border-t border-limestone pt-6">
                <p className="text-xs font-semibold text-stone/50 uppercase tracking-widest mb-2">Cancellation policy</p>
                {CANCELLATION_POLICY.map((p, i) => (
                  <p key={i} className="text-stone/40 text-xs mb-1">— {p}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reassurance */}
        <div className="mt-6 flex flex-wrap gap-6 justify-center text-xs text-stone/40">
          <span>✓ No booking fees</span>
          <span>✓ Secure Stripe checkout</span>
          <span>✓ Email confirmation within minutes</span>
          <span>✓ 7-day free cancellation</span>
        </div>

        <p className="text-center mt-4 text-stone/40 text-xs">
          Prefer to book by phone? Call Thomas on{' '}
          <a href="tel:+353852859777" className="underline hover:text-amber transition-colors">+353 (0) 852 859 777</a>
        </p>
      </div>
    </div>
  )
}
