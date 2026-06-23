import { useState } from 'react'
import { useProducts } from '../../hooks/useProducts'
import {
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from '../../services/productService'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import Loader from '../../components/Loader'

const emptyForm = { title: '', description: '', price: '' }

export default function ProductsPage() {
  const { products, loading } = useProducts()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [deleteId, setDeleteId] = useState(null)

  const resetForm = () => {
    setForm(emptyForm)
    setFile(null)
    setEditing(null)
    setUploadProgress(0)
  }

  const openCreate = () => {
    resetForm()
    setModalOpen(true)
  }

  const openEdit = (p) => {
    setEditing(p)
    setForm({ title: p.title, description: p.description || '', price: String(p.price) })
    setModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.price) return

    setUploading(true)

    try {
      let imageUrl = editing?.imageUrl || ''

      if (file) {
        await new Promise((resolve, reject) => {
          uploadProductImage(
            file,
            (pct) => setUploadProgress(Math.round(pct)),
            (url) => {
              imageUrl = url
              resolve()
            },
            reject
          )
        })
      }

      const data = {
        title: form.title.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        imageUrl,
      }

      if (editing) {
        await updateProduct(editing.id, data)
      } else {
        await createProduct(data)
      }

      setModalOpen(false)
      resetForm()
    } catch {
      alert('Error al guardar producto')
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await deleteProduct(deleteId)
    } catch {
      alert('Error al eliminar')
    }
    setDeleteId(null)
  }

  if (loading) return <Loader />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#FAFAFA] tracking-tight">
          Productos ({products.length})
        </h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-[#10B981] text-white text-sm font-medium rounded-xl hover:bg-[#059669] transition-all duration-200 cursor-pointer"
        >
          + Nuevo producto
        </button>
      </div>

      <div className="bg-[#121214] border border-[#27272A] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#27272A]">
                <th className="text-left py-3 px-4 font-medium text-[#71717A]">Imagen</th>
                <th className="text-left py-3 px-4 font-medium text-[#71717A]">Título</th>
                <th className="text-left py-3 px-4 font-medium text-[#71717A]">Precio</th>
                <th className="text-right py-3 px-4 font-medium text-[#71717A]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-[#52525B]">
                    No hay productos registrados
                  </td>
                </tr>
              )}
              {products.map((p) => (
                <tr key={p.id} className="border-b border-[#1A1A1E] hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4">
                    {p.imageUrl ? (
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-[#1A1A1E] rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#3F3F46]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium text-[#E4E4E7]">{p.title}</td>
                  <td className="py-3 px-4 text-[#34D399] font-medium">
                    ${Number(p.price).toLocaleString('es-CO')}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => openEdit(p)}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-[#10B981]/10 text-[#34D399] hover:bg-[#10B981]/20 border border-[#10B981]/20 transition-all duration-200 cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all duration-200 cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => { setModalOpen(false); resetForm() }}
        title={editing ? 'Editar producto' : 'Nuevo producto'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#A1A1AA] mb-1.5">Título</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full px-4 py-2.5 bg-[#1A1A1E] border border-[#27272A] rounded-xl text-sm text-white placeholder-[#52525B] focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#A1A1AA] mb-1.5">Descripción</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 bg-[#1A1A1E] border border-[#27272A] rounded-xl text-sm text-white placeholder-[#52525B] focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] transition-all duration-200 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#A1A1AA] mb-1.5">
              Precio
            </label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
              min={0}
              className="w-full px-4 py-2.5 bg-[#1A1A1E] border border-[#27272A] rounded-xl text-sm text-white placeholder-[#52525B] focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#A1A1AA] mb-1.5">
              Imagen
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0] || null)}
              className="w-full text-sm text-[#71717A] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-[#10B981]/10 file:text-[#34D399] hover:file:bg-[#10B981]/20 transition-all duration-200 file:cursor-pointer"
            />
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-3">
                <div className="w-full h-2 bg-[#1A1A1E] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#059669] to-[#10B981] rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-[#52525B] mt-1">{uploadProgress}% subido</p>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="w-full py-2.5 bg-[#10B981] text-white font-medium rounded-xl hover:bg-[#059669] disabled:opacity-50 transition-all duration-200 text-sm cursor-pointer"
          >
            {uploading ? 'Subiendo...' : editing ? 'Guardar cambios' : 'Crear producto'}
          </button>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        message="¿Estás seguro de eliminar este producto?"
      />
    </div>
  )
}
