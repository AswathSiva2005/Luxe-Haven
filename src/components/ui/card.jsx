import { cn } from '../../lib/utils'

function Card({ className, ...props }) {
  return (
    <article
      className={cn(
        'rounded-3xl border border-white/10 bg-black/40 p-5 backdrop-blur-sm transition-colors duration-300',
        className,
      )}
      {...props}
    />
  )
}

export { Card }
