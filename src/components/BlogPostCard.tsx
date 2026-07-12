'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePaperLift } from '@/hooks/usePaperLift'
import { RoughHighlight } from './RoughHighlight'

interface BlogPostCardProps {
  title: string
  excerpt: string
  slug: string
  locale: string
  imageUrl?: string
  imageAlt?: string
  publishedAt?: string
  authorName?: string
}

export function BlogPostCard({
  title,
  excerpt,
  slug,
  locale,
  imageUrl,
  imageAlt,
  publishedAt,
  authorName,
}: BlogPostCardProps) {
  const { isHovered, isActive, containerProps, cardStyle } = usePaperLift()

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <div className="h-full" {...containerProps}>
      <Link
        href={`/${locale}/blog/${slug}`}
        className={`group flex h-full flex-col overflow-hidden paper-card text-slate-900 ${isActive ? 'card-is-active' : ''}`}
        style={cardStyle}
      >
        {imageUrl && (
          <div className="relative h-48 w-full overflow-hidden bg-slate-100">
            <Image
              src={imageUrl}
              alt={imageAlt || title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-heading text-2xl font-bold text-slate-900">
            <RoughHighlight
              type="highlight"
              multiline={true}
              color="rgba(167, 243, 208, 0.4)" // emerald-200 with opacity
              className="group-hover:[&>span]:text-slate-900!" // prevent link color change
              show={isHovered}
            >
              <span>{title}</span>
            </RoughHighlight>
          </h3>

          {(formattedDate || authorName) && (
            <p className="mt-1 text-xs text-slate-500">
              {formattedDate}
              {formattedDate && authorName && ' · '}
              {authorName}
            </p>
          )}

          <p className="mt-3 flex-1 text-sm text-slate-600 line-clamp-3">{excerpt}</p>

          <span className="mt-4 font-decorative text-lg font-bold text-emerald-700">
            <RoughHighlight type="underline" color="#10b981" strokeWidth={2} show={isHovered}>
              <span className="whitespace-nowrap">{locale === 'ja' ? '続きを読む →' : 'Read more →'}</span>
            </RoughHighlight>
          </span>
        </div>
      </Link>
    </div>
  )
}
