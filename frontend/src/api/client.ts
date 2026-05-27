export type Status = {
  id: string
  title: string
  message: string
  severity: 'low' | 'medium' | 'high' | 'warning' | 'critical' | 'info'
  createdAt: number
}

const API_BASE = 'http://localhost:5000/api'
const CACHE_KEY = 'status_board_cache'

// Debounce helper to prevent rapid repeated requests
const debounce = (fn: () => void, ms: number) => {
  let timeout: number
  return () => {
    clearTimeout(timeout)
    timeout = window.setTimeout(fn, ms)
  }
}

export async function getStatuses(): Promise<Status[]> {
  try {
    const res = await fetch(`${API_BASE}/statuses`, {
      headers: { 'Accept': 'application/json' },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = (await res.json()) as Status[]
    // Validate response shape
    if (!Array.isArray(data)) throw new Error('Invalid response shape')
    data.forEach((s) => {
      if (typeof s.id !== 'string' || typeof s.title !== 'string' || typeof s.message !== 'string' || typeof s.createdAt !== 'number') {
        throw new Error('Invalid status shape')
      }
    })
    // Cache successful response
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
    return data
  } catch (err) {
    // Attempt to load from cache
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const data = JSON.parse(cached) as Status[]
        return Array.isArray(data) ? data : []
      }
    } catch {}
    return []
  }
}

export async function postStatus(payload: Omit<Status, 'id' | 'createdAt'>): Promise<Status> {
  // Validate input on client side
  if (!payload.title?.trim() || !payload.message?.trim()) {
    throw new Error('Title and message are required')
  }
  if (!['low', 'medium', 'high', 'warning', 'critical', 'info'].includes(payload.severity)) {
    throw new Error('Invalid severity')
  }

  try {
    const res = await fetch(`${API_BASE}/statuses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    if (!res.status.toString().startsWith('2')) throw new Error(`HTTP ${res.status}`)
    const data = (await res.json()) as Status
    if (typeof data.id !== 'string' || typeof data.createdAt !== 'number') {
      throw new Error('Invalid response shape')
    }
    // Update local cache optimistically with the returned status
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      const list = cached ? (JSON.parse(cached) as Status[]) : []
      // Prepend newest
      const updated = [data, ...list].slice(0, 200)
      localStorage.setItem(CACHE_KEY, JSON.stringify(updated))
    } catch {}
    return data
  } catch (err) {
    // Throw a user-friendly message
    throw new Error(err instanceof Error ? err.message : 'Failed to submit status')
  }
}

