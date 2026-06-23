import { motion } from 'framer-motion'

export default function ProductCard({ product, index = 0 }) {
  const units = Number(product.units) || 1
  const unitPrice = Number(product.unitPrice) || 0
  const totalPrice = Number(product.totalPrice) || (units * unitPrice)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      className="group relative bg-[#121214] border border-[#27272A] rounded-2xl overflow-hidden hover:border-[#3F3F46] transition-all duration-500"
    >
      <div className="aspect-[4/3] overflow-hidden bg-[#1A1A1E]">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-8 h-8 text-[#3F3F46]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-[#FAFAFA] text-sm leading-tight">{product.title}</h3>
        {product.description && (
          <p className="text-xs text-[#71717A] leading-relaxed line-clamp-2">{product.description}</p>
        )}
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-xs text-[#71717A]">{units} × ${unitPrice.toLocaleString('es-CO')}</span>
          <p className="text-base font-semibold text-[#34D399] tracking-tight">
            ${totalPrice.toLocaleString('es-CO')}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
