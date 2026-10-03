import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-zinc-400 font-mono',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-zinc-100 text-zinc-950 shadow-xs hover:bg-zinc-200',
        secondary:
          'border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800',
        outline: 'border-zinc-800 text-zinc-400',
        amber: 'border-amber-900/60 bg-amber-950/40 text-amber-300',
        emerald: 'border-emerald-900/60 bg-emerald-950/40 text-emerald-300',
      },
    },
    defaultVariants: {
      variant: 'secondary',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
