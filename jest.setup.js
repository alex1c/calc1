// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock next-intl
jest.mock('next-intl', () => ({
	useTranslations: () => key => key,
	useLocale: () => 'en',
}))

jest.mock('next-intl/server', () => ({
	getTranslations: jest.fn(() => key => key),
	getLocale: jest.fn(() => Promise.resolve('en')),
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn(),
		replace: jest.fn(),
		prefetch: jest.fn(),
	}),
	usePathname: () => '/',
	useSearchParams: () => new URLSearchParams(),
	notFound: jest.fn(),
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
	motion: {
		div: ({ children, ...props }) => <div {...props}>{children}</div>,
		section: ({ children, ...props }) => <section {...props}>{children}</section>,
	},
	AnimatePresence: ({ children }) => children,
}))


