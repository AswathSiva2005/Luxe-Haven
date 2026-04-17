import { cva } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        gold: 'bg-gold-gradient text-black shadow-gold hover:-translate-y-0.5 hover:shadow-gold-glow',
        ghost:
          'border border-gold-300/25 bg-white/5 text-gold-100 hover:border-gold-200 hover:bg-gold-300/10 hover:text-white',
      },
      size: {
        sm: 'h-9 px-4 text-xs tracking-[0.18em] uppercase',
        md: 'h-11 px-6 text-sm tracking-[0.2em] uppercase',
        lg: 'h-12 px-8 text-sm tracking-[0.24em] uppercase',
      },
    },
    defaultVariants: {
      variant: 'gold',
      size: 'md',
    },
  },
)

function Button({ className, variant, size, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button }
