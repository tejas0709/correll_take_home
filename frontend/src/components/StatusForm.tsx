import React, { useState } from 'react'
import type { Status } from '../api/client'

const severities = ['low', 'medium', 'high', 'warning', 'critical', 'info'] as const

export default function StatusForm({
  onSubmit,
}: {
  onSubmit: (payload: Omit<Status, 'id' | 'createdAt'>) => Promise<void>
}) {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<typeof severities[number]>('low')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !message.trim()) {
      setError('Title and message are required')
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      await onSubmit({ title: title.trim(), message: message.trim(), severity })
      setTitle('')
      setMessage('')
      setSeverity('low')
    } catch (err) {
      setError('Submit failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="row">
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="row">
        <label>Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <div className="row">
        <label>Severity</label>
        <select value={severity} onChange={(e) => setSeverity(e.target.value as any)}>
          {severities.map((s) => (
            <option value={s} key={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="actions">
        <button type="submit" disabled={submitting}>
          {submitting ? 'Posting…' : 'Post Status'}
        </button>
      </div>
    </form>
  )
}
