import { useLayoutEffect, useRef } from 'react'
import { useApp } from '../../store/useApp'

interface Props { value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string }

// En presentación muestra el texto tal cual. En edición, un campo que hereda
// la tipografía del elemento que lo contiene, así se edita "en su sitio".
export default function EditableText({ value, onChange, multiline = false, placeholder = 'Escribe aquí' }: Props) {
  const edicion = useApp((s) => s.modo === 'edicion')
  const ref = useRef<HTMLTextAreaElement>(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (el) { el.style.height = 'auto'; el.style.height = `${el.scrollHeight}px` }
  })
  if (!edicion) return <>{value}</>
  return (
    <textarea
      ref={ref} rows={1} value={value} placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => { if (!multiline && e.key === 'Enter') e.preventDefault() }}
      className="block w-full resize-none overflow-hidden border-b border-dashed border-current bg-papel/25 px-1 text-inherit [font:inherit] [letter-spacing:inherit] placeholder:opacity-50 focus:bg-papel/50"
    />
  )
}
