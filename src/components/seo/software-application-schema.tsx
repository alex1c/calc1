'use client'

import { useTranslations, useLocale } from 'next-intl'
import { generateSoftwareApplicationSchema, type Locale } from '@/lib/seo-utils'

interface SoftwareApplicationSchemaProps {
	category: string
	calculatorId: string
	namespace: string
	featureKeys: string[]
	ratingValue?: string
	ratingCount?: string
	screenshot?: string
	// Optional: if features are not under seo.features, specify custom namespace
	featureNamespace?: string
}

export default function SoftwareApplicationSchema({
	category,
	calculatorId,
	namespace,
	featureKeys,
	ratingValue,
	ratingCount,
	screenshot,
	featureNamespace,
}: SoftwareApplicationSchemaProps) {
	const t = useTranslations(namespace)
	const locale = useLocale() as Locale

	// Get feature translations if custom namespace provided
	// Always call hooks unconditionally to follow React rules
	const tFeaturesBase = useTranslations(featureNamespace || namespace)
	const tFeatures = featureNamespace ? tFeaturesBase : null

	// Try to get features from seo.features first, then fallback to direct keys
	const featureList = featureKeys.map((key) => {
		if (tFeatures) {
			try {
				return tFeatures(key)
			} catch {
				// Continue to next try
			}
		}
		try {
			// Try features.key
			return t(`features.${key}`)
		} catch {
			try {
				// Try direct key
				return t(key)
			} catch {
				// Fallback to key itself
				return key
			}
		}
	})

	const schema = generateSoftwareApplicationSchema({
		category,
		calculatorId,
		locale,
		name: t('title'),
		description: t('description'),
		featureList,
		ratingValue,
		ratingCount,
		screenshot,
	})

	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(schema),
			}}
		/>
	)
}
