'use client';

import { type ReactNode } from 'react';
import { isEnrollmentSelection, type EnrollmentSelection } from '@/lib/enrollment';
import { useEnrollmentSelector } from '@/components/enrollment/selector-context';

function normalizeWhen(when: EnrollmentSelection | EnrollmentSelection[] | string): EnrollmentSelection[] {
  if (Array.isArray(when)) {
    return when;
  }

  if (isEnrollmentSelection(when)) {
    return [when];
  }

  return when
    .split(',')
    .map((value) => value.trim())
    .filter((value): value is EnrollmentSelection => isEnrollmentSelection(value));
}

export function EnrollmentValue() {
  const { selection } = useEnrollmentSelector();

  return <>{selection ?? 'other'}</>;
}

export function EnrollmentLabel() {
  const { selectionLabel } = useEnrollmentSelector();

  return <>{selectionLabel}</>;
}

interface EnrollmentGateProps {
  when: EnrollmentSelection | EnrollmentSelection[] | string;
  children: ReactNode;
  fallback?: ReactNode;
}

export function EnrollmentGate({ when, children, fallback = null }: EnrollmentGateProps) {
  const { selection } = useEnrollmentSelector();
  const allowed = normalizeWhen(when);

  if (!selection || !allowed.includes(selection)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
