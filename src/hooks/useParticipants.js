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
  const pagado = participants.filter((p) => p.status === 'pagado').length
  const confirmado = participants.filter((p) => p.status === 'confirmado').length
  const pendiente = participants.filter((p) => p.status === 'pendiente' || !p.status).length
  const totalCollected = pagado * PAYMENT_PER_PERSON

  return { participants, loading, total, pagado, confirmado, pendiente, totalCollected }
}
