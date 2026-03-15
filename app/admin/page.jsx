'use client'
import { useState, useEffect, useCallback } from 'react'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function fmtDate(ts) {
  if (!ts) return '—'
  const d = new Date(ts)
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

function StatusBadge({ status }) {
  const colours = {
    paid:        'bg-green-100 text-green-800',
    confirmed:   'bg-green-100 text-green-800',
    pending:     'bg-yellow-100 text-yellow-800',
    cancelled:   'bg-red-100 text-red-700',
    refunded:    'bg-grey-100 text-stone/50',
  }
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${colours[status] || 'bg-limestone text-stone/50'}`}>
      {status || 'unknown'}
    </span>
  )
}

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-white border border-limestone p-5">
      <p className="text-stone/50 text-xs uppercase tracking-wide">{label}</p>
      <p className="font-display text-atlantic text-3xl mt-1">{value}</p>
      {sub && <p className="text-stone/40 text-xs mt-1">{sub}</p>}
    </div>
  )
}

function LoginScreen({ onLogin }) {
  const [key, setKey]   = useState('')
  const [err, setErr]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setErr('')
    try {
      const r = await fetch('/api/bookings?stats=1', {
        headers: { 'x-admin-key': key }
      })
      if (r.ok) {
        sessionStorage.setItem('admin_key', key)
        onLogin(key)
      } else {
        setErr('Incorrect password. Try again.')
      }
    } catch {
      setErr('Connection error.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="bg-white border border-limestone p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="font-display text-stone text-2xl">Admin Dashboard</h1>
          <p className="text-stone/50 text-sm mt-1">Aran Pony & Trap Tours</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-stone mb-1.5">Admin password</label>
            <input type="password" value={key} onChange={e => setKey(e.target.value)} className="w-full border border-limestone px-3 py-2 text-sm focus:outline-none focus:border-atlantic" placeholder="Enter your admin password" required />
          </div>
          {err && <p className="text-red-600 text-sm">{err}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full text-center disabled:opacity-60">{loading ? 'Checking…' : 'Sign in →'}</button>
        </form>
      </div>
    </div>
  )
}

function BlockDateModal({ adminKey, onClose }) {
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')
  const [closed, setClosed] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const handleSave = async () => {
    if (!date) return
    setSaving(true)
    try {
      const r = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey }, body: JSON.stringify({ date, closed, note }) })
      const d = await r.json()
      if (d.success) { setMsg(closed ? `${date} blocked.` : `${date} open.`); setTimeout(onClose, 1500) }
      else setMsg('Error: ' + d.error)
    } catch { setMsg('Connection error.') }
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-limestone p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-display text-stone text-xl">Manage Availability</h2>
          <button onClick={onClose} className="text-stone/40 hover:text-stone text-xl">×</button>
        </div>
        <div className="space-y-4">
          <div><label className="block text-sm font-semibold text-stone mb-1.5">Date</label><input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border border-limestone px-3 py-2 text-sm focus:outline-none focus:border-atlantic" /></div>
          <div className="flex gap-3">
            <button onClick={() => setClosed(true)} className={`flex-1 py-2 text-sm border font-semibold ${closed ? 'bg-red-50 border-red-400 text-red-700' : 'border-limestone text-stone/50'}`}>🔒 Block</button>
            <button onClick={() => setClosed(false)} className={`flex-1 py-2 text-sm border font-semibold ${!closed ? 'bg-green-50 border-green-400 text-green-700' : 'border-limestone text-stone/50'}`}>✓ Open</button>
          </div>
          {closed && <div><label className="block text-sm font-semibold text-stone mb-1.5">Reason (optional)</label><input type="text" value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. Off island…" className="w-full border border-limestone px-3 py-2 text-sm focus:outline-none focus:border-atlantic" /></div>}
          {msg && <p className={`text-sm ${msg.includes('Error') ? 'text-red-600' : 'text-moss font-semibold'}`}>{msg}</p>}
          <button onClick={handleSave} disabled={!date || saving} className="btn-primary w-full text-center disabled:opacity-50">{saving ? 'Saving…' : 'Save changes'}</button>
        </div>
      </div>
    </div>
  )
}

function BookingDetail({ booking, adminKey, onClose, onUpdate }) {
  const [updating, setUpdating] = useState(false)
  const setStatus = async (status) => {
    setUpdating(true)
    try {
      const r = await fetch('/api/admin', { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey }, body: JSON.stringify({ bookingId: booking.id, status }) })
      const d = await r.json()
      if (d.success) onUpdate(d.booking)
    } catch {}
    setUpdating(false)
  }
  const tourNames = { shared:'Shared', private4:'Private 4', private6:'Private 6', private8:'Private 8', private10:'Private 10' }
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white border border-limestone w-full sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-5 border-b border-limestone sticky top-0 bg-white">
          <div><h2 className="font-display text-stone text-lg">{booking.id}</h2><StatusBadge status={booking.status} /></div>
          <button onClick={onClose} className="text-stone/40 hover:text-stone text-2xl">×</button>
        </div>
        <div className="p-5 space-y-4">
          <dl className="space-y-2.5 text-sm">
            {[['Tour', tourNames[booking.tourId]],['Date', booking.date],['Guests', booking.guests||1],['Total', `€${booking.totalPrice}`],['Name', `${booking.firstName} ${booking.lastName}`],['Email', booking.email],['Phone', booking.phone||'—'],['Notes', booking.notes||'—'],['Booked', fmtDate(booking.createdAt)]].map(([k,v]) => (
              <div key={k} className="flex justify-between gap-4 py-1.5 border-b border-limestone/50"><dt className="text-stone/50 shrink-0">{k}</dt><dd className="text-stone font-medium text-right break-all">{v}</dd></div>
            ))}
          </dl>
          <div className="pt-2">
            <p className="text-xs text-stone/50 uppercase tracking-wide mb-2">Update status</p>
            <div className="grid grid-cols-3 gap-2">
              {['confirmed','cancelled','refunded'].map(s => (
                <button key={s} onClick={() => setStatus(s)} disabled={updating || booking.status === s} className={`py-1.5 text-xs border font-semibold capitalize disabled:opacity-40 ${s==='confirmed'? 'border-green-400 text-green-700':s==='cancelled'? 'border-red-400 text-red-700':'border-stone/30 text-stone/50'}`}>{s}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Dashboard({ adminKey }) {
  const [bookings, setBookings] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [showBlock, setShowBlock] = useState(false)
  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [bRes, sRes] = await Promise.all([fetch('/api/bookings',{headers:{'x+admin-key':adminKey}}),fetch('/api/bookings?stats=1',{headers:{'x+admin-key':adminKey}})])
      setBookings(Array.isArray(await bRes.clone().json())? await bRes.json():[])
      setStats(await sRes.json())
    } catch {}
    setLoading(false)
  },[adminKey])
  useEffect(()=>{load()},[load])
  const todayStr = new Date().toISOString().slice(0,10)
  const filtered = bookings.filter(b=>{if(filter==='upcoming')return b.date>=todayStr&&(b.status==='paid'||b.status==='confirmed');if(filter==='paid')return b.status==='paid'||b.status==='confirmed';return true}).filter(b=>{if(!search)return true;const q=search.toLowerCase();return b.id?.toLowerCase().includes(q)||b.firstName?.toLowerCase().includes(q)||b.lastName?.toLowerCase().includes(q)||b.email?.toLowerCase().includes(q)||b.date?.includes(q)})
  const tourShort = {shared:'Shared',private4:'Pvt 4',private6:'Pvt 6',private8:'Pvt 8'private10:'Pvt 10'}
  return(<div className="min-h-screen bg-cream"><div className="bg-atlantic text-white px-6 py-5 flex items-center justify-between"><div><h1 className="font-display text-xl">Aran Pony & Trap — Bookings</h1><p className="text-white/60 text-xs mt-0.5">Thomas Faherty Admin</p></div><div className="flex gap-3"><button onClick={()=>setShowBlock(true)} className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1.5 border border-white/20">🗓 Manage dates</button><button onClick={load} className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1.5 border border-white/20">↻ Refresh</button></div></div><div className="max-w-5xl mx-auto px-4 py-6">{stats&&(<div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"><StatCard label="Total bookings" value={stats.totalBookings}/><StatCard label="Total revenue" value={`€${stats.totalRevenue?.toLocaleString()}`}/><StatCard label="Total guests" value={stats.totalGuests}/><StatCard label="Upcoming" value={bookings.filter(b=>b.date>=todayStr&&(b.status==='paid'||b.status==='confirmed')).length} sub="future tours"/></div>)}<div className="flex flex-col sm:flex-row gap-3 mb-4"><div className="flex gap-1">{[['all','All'],['upcoming','Upcoming'],['paid','Paid']].map(([v,l])=>(<button key={v} onClick={()=>setFilter(v)} className={`px-3 py-1.5 text-sm border font-semibold ${filter===v?'bg-atlantic text-white border-atlantic':'bg-white text-stone border-limestone'}`}>{l}</button>))}</div><input type="text" placeholder="Search…" value={search} onChange={e=>setSearch(e.target.value)} className="flex-1 border border-limestone px-3 py-1.5 text-sm focus:outline-none focus:border-atlantic"/></div><div className="bg-white border border-limestone overflow-hidden">{loading?(<div className="text-center py-12 text-stone/40">Loading…</div>):filtered.length===0?(<div className="text-center py-12 text-stone/40">{search?'No matches.':'No bookings yet.'}</div>):(<div className="overflow-x-auto"><table className="w4full text-sm"><thead><tr className="border-b border-limestone bg-cream">{['Date','Ref','Name','Tour','Guests','Total','Status'].map(h=>(<th key={h} className="text-left px-4 py-3 text-xs font-semibold text-stone/50 uppercase tracking-wide">{h}</th>))}</tr></thead><tbody>{filtered.map(b=>(<tr key={b.id} onClick={()=>setSelected(b)} className="border-b border-limestone/50 hover:bg-cream cursor-pointer"><td className="px-4 py-3 font-semibold">{b.date}</td><td className="px-4 py-3 text-stone/50 font-mono text-xs">{b.id}</td><td className="px-4 py-3">{b.firstName} {b.lastName}</td><td className="px-4 py-3 text-stone/70">{tourShort[b.tourId]||b.tourId}</td><td className="px-4 py-3 text-center">{b.guests||1}</td><td className="px-4 py-3 font-semibold text-atlantic">€{b.totalPrice}</td><td className="px-4 py-3"><StatusBadge status={b.status}/></td></tr>))}</tbody></table></div>)}</div><p className="text-center text-xs text-stone/30 mt-4">{filtered.length} booking{filtered.length!==1?'s':''} shown</p></div>{showBlock&&<BlockDateModal adminKey={adminKey} onClose={()=>setShowBlock(false)}/>}{selected&&<BookingDetail booking={selected} adminKey={adminKey} onClose={()=>setSelected(null)} onUpdate={u=>{setSelected(u);setBookings(bs=>bs.map(b=>b.id===u.id?u:b))}}/>}</div>))

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState(null)
  useEffect(()=>{const s=sessionStorage.getItem('admin_key');if(s)setAdminKey(s)},[])
  if(!adminKey)return<LoginScreen onLogin={setAdminKey}/>
  return<Dashboard adminKey={adminKey}/>
}
