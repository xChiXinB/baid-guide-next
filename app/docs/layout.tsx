import { source } from '@/lib/source'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { baseOptions } from '@/lib/layout.shared'
import { EnrollmentSelectorButton } from '@/components/enrollment/selector-button'
import { EnrollmentGate } from '@/components/enrollment/mdx' // Keep this imported so that we don't have to import it again in MDX files

export default function Layout({ children }: LayoutProps<'/docs'>) {
    return (
        <DocsLayout
            tree={source.pageTree}
            {...baseOptions({ showSelectorInNavbar: false })}
            sidebar={{
                banner: <EnrollmentSelectorButton fullWidth />
            }}
        >
            <EnrollmentGate when="0.5"> </EnrollmentGate>
            {children}
        </DocsLayout>
    )
}
