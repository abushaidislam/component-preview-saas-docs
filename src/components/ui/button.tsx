import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-zinc-100 text-zinc-950 shadow-sm hover:bg-white active:bg-zinc-200',
        destructive:
          'bg-red-900 text-red-100 shadow-sm hover:bg-red-800',
        outline:
          'border border-zinc-800 bg-transparent shadow-sm hover:bg-zinc-900 hover:text-white text-zinc-300',
        secondary:
          'bg-zinc-900 text-zinc-200 shadow-sm border border-zinc-800 hover:bg-zinc-800 hover:text-white',
        ghost:
          'hover:bg-zinc-900 hover:text-white text-zinc-400',
        link: 'text-zinc-100 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-8 px-3 py-1.5',
        sm: 'h-7 rounded px-2.5 text-[11px]',
        lg: 'h-9 rounded-md px-4 text-xs',
        icon: 'h-7 w-7',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
