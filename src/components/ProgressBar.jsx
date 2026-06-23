import { motion } from 'framer-motion'

export default function ProgressBar({ percentage, label, sublabel }) {
  const safe = Math.min(Math.max(percentage || 0, 0), 100)

  return (
    <div className="w-full space-y-3">
      <div className="flex items-end justify-between">
        <div>
          {label && <p className="text-sm font-medium text-[#A1A1AA]">{label}</p>}
          {sublabel && <p className="text-xs text-[#52525B] mt-0.5">{sublabel}</p>}
        </div>
        <span className="text-sm font-semibold text-[#34D399] tabular-nums">{safe}%</span>
      </div>
      <div className="relative w-full h-2 bg-[#1A1A1E] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${safe}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#059669] to-[#10B981] rounded-full"
        />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent rounded-full" />
      </div>
    </div>
  )
}
