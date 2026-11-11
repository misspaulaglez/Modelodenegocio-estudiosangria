import { useConfirm } from '../../store/confirm'

export default function ConfirmHost() {
  const { mensaje, resolver } = useConfirm()
  if (!mensaje) return null
  const cerrar = (v: boolean) => { resolver?.(v); useConfirm.setState({ mensaje: null, resolver: null }) }
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/50 p-6">
      <div className="w-full max-w-md bg-papel p-8 text-carbon">
        <p className="font-serif text-xl">{mensaje}</p>
        <div className="mt-6 flex justify-end gap-3 text-sm">
          <button onClick={() => cerrar(false)} className="rounded-full border border-carbon/40 px-5 py-2 hover:bg-rosa/50">Cancelar</button>
          <button onClick={() => cerrar(true)} className="rounded-full bg-vino px-5 py-2 text-marfil hover:bg-carbon">Confirmar</button>
        </div>
      </div>
    </div>
  )
}
