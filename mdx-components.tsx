import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { EnrollmentGate, EnrollmentLabel, EnrollmentValue } from '@/components/enrollment/mdx';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    EnrollmentValue,
    EnrollmentLabel,
    EnrollmentGate,
    ...components,
  };
}
