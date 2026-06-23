import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#09090B]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 border-2 border-[#27272A] rounded-full" />
          <div className="absolute inset-0 border-2 border-transparent border-t-[#10B981] rounded-full animate-spin" />
        </div>
        <p className="text-sm text-[#71717A] font-medium">Cargando...</p>
      </motion.div>
    </div>
  )
}
