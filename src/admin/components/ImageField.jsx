import { useState } from 'react'
import { IconPhoto, IconUpload } from '@tabler/icons-react'
import { api } from '../../api'

const ImageField = ({ label, value, onChange }) => {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const { url } = await api.uploadImage(file)
      onChange(url)
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
      <div className="flex items-center gap-3">
        <div className="w-20 h-20 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
          {value ? <img src={value} alt="" className="w-full h-full object-cover" /> : <IconPhoto className="text-slate-300" size={28} />}
        </div>
        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium cursor-pointer transition-colors">
          <IconUpload size={16} />
          {uploading ? 'Subiendo...' : 'Cambiar imagen'}
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
      </div>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  )
}

export default ImageField
