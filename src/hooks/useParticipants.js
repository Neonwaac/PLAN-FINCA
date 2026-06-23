import { useState, useEffect } from 'react'
import { getParticipantsRealtime } from '../services/participantService'
import { PAYMENT_PER_PERSON } from '../constants'

export function useParticipants() {
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = getParticipantsRealtime((list) => {
      setParticipants(list)
      setLoading(false)
    })
    return unsub
  }, [])

  const total = participants.length
  const paid = participants.filter((p) => p.paid).length
  const totalCollected = paid * PAYMENT_PER_PERSON

  return { participants, loading, total, paid, totalCollected }
}
