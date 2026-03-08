export type EnrollmentSelection = '1.5' | '1+3' | '0.5' | 'typical' | 'other'

export interface EnrollmentOption {
    label: string
    shortLabel: string
    value: EnrollmentSelection
}

export const ENROLLMENT_STORAGE_KEY = 'baid-guide-enrollment-selection'
export const ENROLLMENT_COOKIE_NAME = 'baid-guide-enrollment-selection'
export const ENROLLMENT_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365 * 3

export const ENROLLMENT_OPTIONS: EnrollmentOption[] = [
    {
        label: '八年级下学期入学 (1.5 项目)',
        shortLabel: '1.5 项目',
        value: '1.5'
    },
    {
        label: '九年级上学期入学 (1+3 项目)',
        shortLabel: '1+3 项目',
        value: '1+3'
    },
    {
        label: '九年级下学期入学 (0.5 项目)',
        shortLabel: '0.5 项目',
        value: '0.5'
    },
    {
        label: '十年级上学期入学 (中考)',
        shortLabel: '中考',
        value: 'typical'
    },
    {
        label: '其他 / 非学生',
        shortLabel: '选择入学时间',
        value: 'other'
    }
]

export function isEnrollmentSelection(value: string | null | undefined): value is EnrollmentSelection {
    if (!value) {
        return false
    }

    return ENROLLMENT_OPTIONS.some((option) => option.value === value)
}

export function getEnrollmentLabel(selection: EnrollmentSelection | null): string {
    if (!selection) {
        return '选择入学时间'
    }

    return (
        ENROLLMENT_OPTIONS.find((option) => option.value === selection)?.shortLabel ??
        '选择入学时间'
    )
}
