'use client'

import { ChevronDown } from 'lucide-react'
import { buttonVariants } from 'fumadocs-ui/components/ui/button'
import { cn } from '@fumadocs/ui/cn'
import { useEnrollmentSelector } from '@/components/enrollment/selector-context'

interface EnrollmentSelectorButtonProps {
    className?: string
    fullWidth?: boolean
}

export function EnrollmentSelectorButton({
                                             className,
                                             fullWidth = false
                                         }: EnrollmentSelectorButtonProps) {
    const { selectionLabel, openDialog } = useEnrollmentSelector()

    return (
        <button
            type="button"
            onClick={openDialog}
            className={cn(
                buttonVariants({
                    color: 'outline',
                    size: 'sm'
                }),
                fullWidth
                    ? 'w-full justify-between gap-2 px-3 py-2 text-sm'
                    : 'max-w-[250px] gap-1.5 px-2 py-1.5 text-xs',
                className
            )}
        >
      <span className="truncate">
        {selectionLabel}
      </span>
            <ChevronDown className="size-4 shrink-0"/>
        </button>
    )
}
