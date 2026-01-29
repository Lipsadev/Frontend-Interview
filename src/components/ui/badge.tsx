import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-all duration-150",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary/10 text-primary",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground",
                destructive:
                    "border-transparent bg-destructive/10 text-destructive",
                outline:
                    "border-border text-foreground bg-transparent",
                // Category-specific colors with soft backgrounds
                finance: "border-transparent bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
                tech: "border-transparent bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300",
                career: "border-transparent bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
                education: "border-transparent bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
                regulations: "border-transparent bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300",
                lifestyle: "border-transparent bg-pink-50 text-pink-700 dark:bg-pink-950/50 dark:text-pink-300",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
