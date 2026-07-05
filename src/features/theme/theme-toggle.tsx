import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  // Sincronizar estado inicial con el DOM (ya fijado por el script inline)
  useEffect(() => {
    const dark = document.documentElement.classList.contains('dark')
    setIsDark(dark)
  }, [])

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    document.documentElement.classList.toggle('dark', newDark)
    localStorage.setItem('theme', newDark ? 'dark' : 'light')
  }

  return (
    <button type="button" onClick={toggleTheme} className="glass-smoked px-4 py-2">
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}
