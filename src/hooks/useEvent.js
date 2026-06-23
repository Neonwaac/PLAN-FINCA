import { useState, useEffect } from 'react'
import { onEventSnapshot } from '../services/eventService'

export function useEvent() {
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onEventSnapshot((data) => {
      if (data && data.eventDate && typeof data.eventDate.toDate === 'function') {
        data.eventDate = data.eventDate.toDate().toISOString()
      }
      setEvent(data)
      setLoading(false)
    })
    return unsub
  }, [])

  return { event, loading }
}
