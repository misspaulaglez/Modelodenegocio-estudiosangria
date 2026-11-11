// Rodaja de cítrico de sangría. El color va desplazado respecto al trazo,
// como un grabado con el color ligeramente fuera de registro.
export default function Rodaja({ className = '' }: { className?: string }) {
  const gajos = Array.from({ length: 9 }, (_, i) => (i * 360) / 9)
  return (
    <svg viewBox="0 0 320 320" className={className} role="img" aria-label="Rodaja de naranja, motivo gráfico del estudio">
      <circle cx="172" cy="170" r="118" fill="#D8B5B5" />
      <circle cx="172" cy="170" r="92" fill="#762F43" opacity="0.9" />
      <circle cx="248" cy="62" r="34" fill="#B9D7E8" />
      <path d="M40 262c36-52 82-54 110-30-24 40-70 56-110 30Z" fill="#78816A" transform="translate(8 6)" />
      <g fill="none" stroke="#49433F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="160" cy="160" r="118" />
        <circle cx="160" cy="160" r="98" />
        <circle cx="160" cy="160" r="10" />
        {gajos.map((a) => (
          <path key={a} d="M160 150 C 168 118, 190 96, 160 70" transform={`rotate(${a} 160 160)`} />
        ))}
        <circle cx="240" cy="54" r="34" />
        <path d="M32 254c36-52 82-54 110-30-24 40-70 56-110 30Z" />
        <path d="M34 252c30-18 62-22 92-8" />
      </g>
    </svg>
  )
}
