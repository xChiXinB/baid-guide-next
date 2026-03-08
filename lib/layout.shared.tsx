import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import { EnrollmentSelectorButton } from '@/components/enrollment/selector-button'

interface BaseOptionsConfig {
    showSelectorInNavbar?: boolean;
}

export function baseOptions({
                                showSelectorInNavbar = true,
                            }: BaseOptionsConfig = {}): BaseLayoutProps {
    return {
        themeSwitch: {
            enabled: false
        },
        nav: {
            title: 'The BAID Survival Guide',
            children: showSelectorInNavbar ? <div className="ml-3"><EnrollmentSelectorButton/></div> : null
        }
    }
}
