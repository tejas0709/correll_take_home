import React, { useEffect, useState } from 'react'
import { getStatuses, postStatus, Status } from './api/client'
import StatusForm from './components/StatusForm'
import StatusFeed from './components/StatusFeed'

export default function App() {
  const [statuses, setStatuses] = useState<Status[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    getStatuses()
      .then((data) => setStatuses(data.sort((a, b) => b.createdAt - a.createdAt)))
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false))
  }, [])

  const handleNewStatus = async (payload: Omit<Status, 'id' | 'createdAt'>) => {
    try {
      const created = await postStatus(payload)
      setStatuses((s) => [created, ...s].sort((a, b) => b.createdAt - a.createdAt))
    } catch (err) {
      setError('Failed to post status')
    }
  }

  return (
    <div className="container">
      <h1>Status Board</h1>
      <StatusForm onSubmit={handleNewStatus} />

      {loading ? (
        <div className="info">Loading statuses…</div>
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : (
        <StatusFeed statuses={statuses} />
      )}
    </div>
  )
}
