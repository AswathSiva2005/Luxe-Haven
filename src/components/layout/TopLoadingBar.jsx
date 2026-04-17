import { useEffect, useState } from 'react'

export function TopLoadingBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight

      if (scrollRange <= 0) {
        setProgress(0)
        return
      }

      const nextProgress = Math.min(Math.max((scrollTop / scrollRange) * 100, 0), 100)
      setProgress(nextProgress)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed left-0 top-[61px] z-[120] h-[3px] w-full bg-transparent sm:top-[65px]">
      <div
        className="h-full bg-[#A5F2F3] shadow-[0_0_12px_rgba(165,242,243,0.75)] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
