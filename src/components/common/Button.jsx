import { Link } from 'react-router-dom'

export default function Button({ to, variant = 'dark', className = '', children, ...props }) {
  let variantClasses = 'bg-ink text-white hover:bg-black dark:bg-white dark:text-ink dark:hover:bg-ivory shadow-xs'

  if (variant === 'outline') {
    variantClasses = 'border border-ink/20 bg-transparent text-ink hover:bg-ink hover:text-white dark:border-white/30 dark:text-white dark:hover:bg-white dark:hover:text-ink'
  } else if (variant === 'gold') {
    variantClasses = 'bg-gold text-white hover:bg-[#a5743f] active:scale-[0.99]'
  } else if (variant === 'secondary' || variant === 'light') {
    variantClasses = 'bg-mist text-ink hover:bg-linen border border-stone-200/60 dark:bg-white/10 dark:text-white dark:border-white/10 dark:hover:bg-white/15'
  } else if (variant === 'whatsapp') {
    variantClasses = 'bg-[#1FB357] text-white hover:bg-[#1a9d4c] active:scale-[0.99]'
  }

  const classes = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${variantClasses} ${className}`

  return to ? <Link className={classes} to={to}>{children}</Link> : <button className={classes} {...props}>{children}</button>
}
