'use client'

import { cn } from '@fumadocs/ui/cn'
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogTitle } from '@radix-ui/react-dialog'
import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { buttonVariants } from 'fumadocs-ui/components/ui/button'
import {
    ENROLLMENT_COOKIE_MAX_AGE_SECONDS,
    ENROLLMENT_COOKIE_NAME,
    ENROLLMENT_OPTIONS,
    ENROLLMENT_STORAGE_KEY,
    type EnrollmentSelection,
    getEnrollmentLabel,
    isEnrollmentSelection
} from '@/lib/enrollment'

interface EnrollmentSelectorContextValue {
    selection: EnrollmentSelection | null
    selectionLabel: string
    openDialog: () => void
    setSelection: (value: EnrollmentSelection) => void
}

const EnrollmentSelectorContext = createContext<EnrollmentSelectorContextValue | null>(null)

function getCookieValue(cookieName: string): string | null {
    const prefix = `${cookieName}=`
    const values = document.cookie.split(';')

    for (const value of values) {
        const trimmed = value.trim()
        if (trimmed.startsWith(prefix)) {
            return decodeURIComponent(trimmed.slice(prefix.length))
        }
    }

    return null
}

function readPersistedSelection(): EnrollmentSelection | null {
    const fromStorage = localStorage.getItem(ENROLLMENT_STORAGE_KEY)
    if (isEnrollmentSelection(fromStorage)) {
        return fromStorage
    }

    const fromCookie = getCookieValue(ENROLLMENT_COOKIE_NAME)
    if (isEnrollmentSelection(fromCookie)) {
        return fromCookie
    }

    return null
}

function persistSelection(value: EnrollmentSelection): void {
    localStorage.setItem(ENROLLMENT_STORAGE_KEY, value)
    document.cookie = `${ENROLLMENT_COOKIE_NAME}=${encodeURIComponent(value)}; path=/; max-age=${ENROLLMENT_COOKIE_MAX_AGE_SECONDS}; samesite=lax`
}

export function EnrollmentSelectorProvider({ children }: { children: ReactNode }) {
    const [ selection, setSelectionState ] = useState<EnrollmentSelection | null>(null)
    const [ open, setOpen ] = useState(false)

    useEffect(() => {
        const persisted = readPersistedSelection()
        if (persisted) {
            setSelectionState(persisted)
            return
        }

        setOpen(true)
    }, [])

    const contextValue = useMemo<EnrollmentSelectorContextValue>(() => {
        return {
            selection,
            selectionLabel: getEnrollmentLabel(selection),
            openDialog: () => setOpen(true),
            setSelection: (value) => {
                setSelectionState(value)
                persistSelection(value)
                setOpen(false)
            }
        }
    }, [ selection ])

    return (
        <EnrollmentSelectorContext.Provider value={contextValue}>
            {children}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogOverlay
                    className="fixed inset-0 z-50 bg-fd-overlay backdrop-blur-xs data-[state=open]:animate-fd-fade-in data-[state=closed]:animate-fd-fade-out"/>
                <DialogContent
                    aria-describedby="enrollment-selector-description"
                    className="fixed left-1/2 top-6 z-50 w-[calc(100%-1rem)] max-w-xl -translate-x-1/2 rounded-xl border bg-fd-popover p-5 text-fd-popover-foreground shadow-2xl shadow-black/40 data-[state=open]:animate-fd-dialog-in data-[state=closed]:animate-fd-dialog-out md:top-[15vh] md:p-6"
                >
                    <DialogTitle className="text-lg font-semibold">
                        选择您的入学时间
                    </DialogTitle>
                    <DialogDescription
                        id="enrollment-selector-description"
                        className="mt-2 text-sm leading-6 text-fd-muted-foreground"
                    >
                        北京中学国际部有许多不同的招生方式。您的入学时间将用于显示符合您学制的内容。
                    </DialogDescription>
                    <div className="mt-4 flex flex-col gap-2">
                        {ENROLLMENT_OPTIONS.map((option) => {
                            const selected = option.value === selection

                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => contextValue.setSelection(option.value)}
                                    className={cn(
                                        buttonVariants({
                                            color: selected ? 'primary' : 'outline'
                                        }),
                                        'h-auto w-full justify-between gap-3 px-3 py-2.5 text-start text-sm'
                                    )}
                                >
                                    <span>{option.label}</span>
                                </button>
                            )
                        })}
                    </div>
                </DialogContent>
            </Dialog>
        </EnrollmentSelectorContext.Provider>
    )
}

export function useEnrollmentSelector() {
    const context = useContext(EnrollmentSelectorContext)

    if (!context) {
        throw new Error('useEnrollmentSelector must be used within EnrollmentSelectorProvider')
    }

    return context
}
