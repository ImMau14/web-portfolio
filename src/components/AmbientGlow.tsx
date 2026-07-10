export default function AmbientGlow() {
  return (
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[50vw] rounded-[100%] blur-[120px] opacity-100 pointer-events-none -z-10"
      style={{
        backgroundColor: 'var(--ui-glow-primary)',
      }}
    />
  )
}
