import { useEffect, useState } from 'react'
import { useSiteData } from '../content/SiteDataContext'
import { api } from '../api'

export function useSectionDraft(section) {
  const { content, refreshContent } = useSiteData()
  const [draft, setDraft] = useState(() => structuredClone(content[section]))
  const [dirty, setDirty] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (!dirty) setDraft(structuredClone(content[section]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  const update = (updater) => {
    setDirty(true)
    setStatus('')
    setDraft((prev) => (typeof updater === 'function' ? updater(prev) : updater))
  }

  const save = async () => {
    setStatus('saving')
    try {
      await api.updateSection(section, draft)
      await refreshContent()
      setDirty(false)
      setStatus('saved')
      setTimeout(() => setStatus((s) => (s === 'saved' ? '' : s)), 2500)
    } catch (err) {
      setStatus(`error: ${err.message}`)
    }
  }

  return { draft, update, save, status, dirty }
}
