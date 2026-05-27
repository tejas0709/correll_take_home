import React from 'react'
import type { Status } from '../api/client'

function severityClass(sev: string) {
  switch (sev) {
    case 'critical':
      return 'sev critical'
    case 'high':
      return 'sev high'
    case 'warning':
      return 'sev warning'
    case 'medium':
      return 'sev medium'
    case 'low':
      return 'sev low'
    case 'info':
    default:
      return 'sev info'
  }
}

export default function StatusFeed({ statuses }: { statuses: Status[] }) {
  if (!statuses.length) return <div className="info">No statuses yet.</div>

  return (
    <ul className="feed">
      {statuses.map((s) => (
        <li key={s.id} className="item">
          <div className="meta">
            <strong>{s.title}</strong>
            <span className={severityClass(s.severity)}>{s.severity}</span>
          </div>
          <div className="message">{s.message}</div>
          <div className="time">{new Date(s.createdAt).toLocaleString()}</div>
        </li>
      ))}
    </ul>
  )
}
