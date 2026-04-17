import { animated, useSpring } from '@react-spring/web'
import { motion } from 'framer-motion'

import { Button } from '../ui/button'
import { Card } from '../ui/card'
import poloImage from '../../assets/company details/polo.jpg'
import oversizedImage from '../../assets/company details/over sized.jpg'

function CategoryCard({ title, description, tag, image, onClick }) {
  const AnimatedContainer = animated.div
  const [style, api] = useSpring(() => ({
    transform: 'translateY(0px) scale(1)',
    boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
  }))

  return (
    <AnimatedContainer
      style={style}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onClick()
        }
      }}
      onMouseEnter={() =>
        api.start({
          transform: 'translateY(-5px) scale(1.01)',
          boxShadow: '0px 20px 45px rgba(212, 175, 55, 0.18)',
        })
      }
      onMouseLeave={() =>
        api.start({
          transform: 'translateY(0px) scale(1)',
          boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
        })
      }
      className="cursor-pointer"
    >
      <Card className="group h-full overflow-hidden border-white/15 p-0">
        <div className="relative h-64 overflow-hidden border-b border-white/10 bg-black/80 sm:h-72">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-contain opacity-95 transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
          <div className="absolute left-4 top-4 rounded-full border border-gold-300/30 bg-black/60 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-gold-100">
            {tag}
          </div>
        </div>
        <div className="p-7">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-300">{tag}</p>
          <h3 className="font-display mt-3 text-2xl uppercase tracking-[0.09em] text-white">
            {title}
          </h3>
          <p className="mt-3 text-sm text-white/70">{description}</p>
          <Button onClick={onClick} className="mt-8 w-full" size="lg">
            View Collection
          </Button>
        </div>
      </Card>
    </AnimatedContainer>
  )
}

export function CategoryCards({ onSelect }) {
  const MotionContainer = motion.div

  return (
    <MotionContainer
      id="categories"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      className="grid gap-5 md:grid-cols-2"
    >
      <CategoryCard
        title="T-Shirts"
        tag="Core Collection"
        // description="Tailored tees with clean construction and premium cotton blends."
        image={poloImage}
        onClick={() => onSelect('tshirt')}
      />
      <CategoryCard
        title="Oversized T-Shirts"
        tag="Street Edit"
        // description="Relaxed drape and bold silhouettes built for modern layered looks."
        image={oversizedImage}
        onClick={() => onSelect('oversized')}
      />
    </MotionContainer>
  )
}
