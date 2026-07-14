// Static background lights component for decorative glow effects.

export default function StaticBackgroundLights() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Top left glow */}
      <div
        className="absolute top-0 left-0 w-[40vw] h-[40vw] rounded-full blur-[120px] opacity-30"
        style={{ backgroundColor: 'var(--ui-glow-primary)' }}
      />

      {/* Top right glow */}
      <div
        className="absolute top-0 right-0 w-[35vw] h-[35vw] rounded-full blur-[120px] opacity-30"
        style={{ backgroundColor: 'var(--ui-glow-primary)' }}
      />

      {/* Bottom left glow */}
      <div
        className="absolute bottom-0 left-0 w-[45vw] h-[45vw] rounded-full blur-[120px] opacity-30"
        style={{ backgroundColor: 'var(--ui-glow-primary)' }}
      />

      {/* Bottom right glow */}
      <div
        className="absolute bottom-0 right-0 w-[30vw] h-[30vw] rounded-full blur-[120px] opacity-30"
        style={{ backgroundColor: 'var(--ui-glow-primary)' }}
      />

      {/* Center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-20"
        style={{ backgroundColor: 'var(--ui-glow-primary)' }}
      />
    </div>
  )
}
