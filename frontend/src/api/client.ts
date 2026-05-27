export type Status = {
  id: string
  title: string
  message: string
  severity: 'low' | 'medium' | 'high' | 'warning' | 'critical' | 'info'
  createdAt: number
}

const API_BASE = '/api'

export async function getStatuses(): Promise<Status[]> {
  try {
    const res = await fetch(`${API_BASE}/statuses`)
    if (!res.ok) throw new Error('Network error')
    const data = (await res.json()) as Status[]
    return data
  } catch (err) {
    // Backend not available yet — return empty list
    return []
  }
}

export async function postStatus(payload: Omit<Status, 'id' | 'createdAt'>): Promise<Status> {
  try {
    const res = await fetch(`${API_BASE}/statuses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Failed to post')
    const data = (await res.json()) as Status
    return data
  } catch (err) {
    // Fallback: create locally so frontend can function before backend exists
    const fallback: Status = {
      id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: payload.title,
      message: payload.message,
      severity: payload.severity,
      createdAt: Date.now(),
    }
    return fallback
  }
}
