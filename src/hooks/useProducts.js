import { useState, useEffect } from 'react'
import { getProductsRealtime } from '../services/productService'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = getProductsRealtime((list) => {
      setProducts(list)
      setLoading(false)
    })
    return unsub
  }, [])

  const totalCost = products.reduce((acc, p) => acc + (Number(p.totalPrice) || Number(p.units) * Number(p.unitPrice) || 0), 0)

  return { products, loading, totalCost }
}
