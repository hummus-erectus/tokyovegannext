'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RoughHighlight } from './RoughHighlight'

interface HomeBlogCardProps {
  title: string
  excerpt: string
  slug: string
  locale: string
  imageUrl?: string
  imageAlt?: string
  publishedAt?: string
  authorName?: string
}

export function HomeBlogCard({
  title,
  excerpt,
  slug,
  locale,
  imageUrl,
  imageAlt,
  publishedAt,
  authorName,
}: HomeBlogCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <Link
      href={`/${locale}/blog/${slug}`}
      className="group flex h-full flex-col text-slate-900 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageUrl && (
        <div className="mb-6">
          <div className="relative photo-slit" style={{ '--clip': '30px' } as React.CSSProperties}>
            <Image
              src={imageUrl}
              alt={imageAlt || title}
              width={600}
              height={450}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="w-full aspect-4/3 object-cover transition-all duration-500 group-hover:grayscale"
            />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col px-2">
        <h3 className="font-hand text-2xl sm:text-3xl font-bold text-slate-900">
          <RoughHighlight
            type="highlight"
            multiline={true}
            color="rgba(167, 243, 208, 0.4)" // emerald-200 with opacity
            className="group-hover:[&>span]:text-slate-900!" // prevent link color change if any
            show={isHovered}
          >
            <span>{title}</span>
          </RoughHighlight>
        </h3>

        {(formattedDate || authorName) && (
          <p className="mt-2 font-hand text-lg text-slate-600 font-bold">
            {formattedDate}
            {formattedDate && authorName && ' · '}
            {authorName}
          </p>
        )}

        <p className="mt-3 flex-1 text-base text-slate-700 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>

        <span className="mt-4 font-hand text-xl font-bold text-emerald-700 transition-colors group-hover:text-emerald-500">
          {locale === 'ja' ? '続きを読む →' : 'Read more →'}
        </span>
      </div>
    </Link>
  )
}


