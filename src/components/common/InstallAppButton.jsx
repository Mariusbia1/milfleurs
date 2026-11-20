import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import toast from 'react-hot-toast'

export default function InstallAppButton({ compact = false, label = 'Installer Milfleurs' }) {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [installed, setInstalled] = useState(
    window.matchMedia?.('(display-mode: standalone)').matches
  )

  useEffect(() => {
    const capturePrompt = (event) => {
      event.preventDefault()
      setInstallPrompt(event)
    }
    const markInstalled = () => setInstalled(true)

    window.addEventListener('beforeinstallprompt', capturePrompt)
    window.addEventListener('appinstalled', markInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', capturePrompt)
      window.removeEventListener('appinstalled', markInstalled)
    }
  }, [])

  if (installed) return null

  const install = async () => {
    if (installPrompt) {
      await installPrompt.prompt()
      const { outcome } = await installPrompt.userChoice
      if (outcome === 'accepted') setInstalled(true)
      setInstallPrompt(null)
      return
    }

    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent)
    toast(isIOS
      ? 'Sur Safari : touchez Partager, puis « Sur l’écran d’accueil ».'
      : 'Ouvrez le menu du navigateur puis choisissez « Installer l’application ».'
    , { duration: 6000 })
  }

  return (
    <button
      onClick={install}
      className={compact
        ? 'grid h-9 w-9 place-items-center rounded-full bg-mist text-stone-700 transition hover:bg-stone-200 dark:bg-white/10 dark:text-white'
        : 'flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200/80 bg-white px-4 py-2.5 text-xs font-semibold text-ink shadow-xs transition hover:bg-stone-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10'
      }
      aria-label={label}
    >
      <Download className="h-4 w-4" />
      {!compact && label}
    </button>
  )
}
