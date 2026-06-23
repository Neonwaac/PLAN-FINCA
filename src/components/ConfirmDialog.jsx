import Modal from './Modal'

export default function ConfirmDialog({ open, onClose, onConfirm, message }) {
  return (
    <Modal open={open} onClose={onClose} title="Confirmar">
      <p className="text-[#A1A1AA] mb-6 text-sm">{message}</p>
      <div className="flex gap-3 justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-[#A1A1AA] bg-[#1A1A1E] border border-[#27272A] rounded-xl hover:bg-[#222226] transition-all duration-200 cursor-pointer"
        >
          Cancelar
        </button>
        <button
          onClick={() => {
            onConfirm()
            onClose()
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-red-500/80 rounded-xl hover:bg-red-500 transition-all duration-200 cursor-pointer"
        >
          Eliminar
        </button>
      </div>
    </Modal>
  )
}
