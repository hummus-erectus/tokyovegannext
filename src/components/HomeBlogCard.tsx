'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RoughHighlight } from './RoughHighlight'

interface HomeBlogCardProps {
  featured?: boolean
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
  featured = false,
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
      className={`group flex h-full text-slate-900 transition-all duration-500 ${
        featured ? 'flex-col' : 'flex-row items-start gap-4 sm:flex-col sm:items-stretch sm:gap-0'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageUrl && (
        <div className={featured ? 'mb-6' : 'w-28 shrink-0 sm:w-auto sm:mb-6'}>
          <div
            className={`relative photo-slit ${
              featured ? '[--clip:30px]' : '[--clip:14px] sm:[--clip:30px]'
            }`}
          >
            <Image
              src={imageUrl}
              alt={imageAlt || title}
              width={600}
              height={450}
              sizes={
                featured
                  ? '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
                  : '(max-width: 640px) 112px, (max-width: 768px) 50vw, 33vw'
              }
              className="w-full aspect-4/3 object-cover transition-all duration-500 group-hover:grayscale"
            />
          </div>
        </div>
      )}

      <div className={`flex flex-1 flex-col ${featured ? 'px-2' : 'px-0 sm:px-2'}`}>
        <h3
          className={`font-heading font-bold leading-tight text-slate-900 line-clamp-3 ${
            featured ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-2xl md:text-3xl'
          }`}
        >
          <RoughHighlight
            type="highlight"
            multiline={true}
            color="rgba(167, 243, 208, 0.4)" // emerald-200 with opacity
            className="group-hover:[&>span]:text-slate-900!" // prevent link color change if any
            trigger="none"
            show={isHovered}
          >
            <span>{title}</span>
          </RoughHighlight>
        </h3>

        {(formattedDate || authorName) && (
          <p
            className={`font-decorative text-slate-600 font-bold ${
              featured ? 'mt-2 text-lg' : 'mt-1 text-sm sm:mt-2 sm:text-lg'
            }`}
          >
            {formattedDate}
            {formattedDate && authorName && ' · '}
            {authorName}
          </p>
        )}

        <p
          className={`flex-1 text-base text-slate-700 line-clamp-3 leading-relaxed ${
            featured ? 'mt-3' : 'hidden sm:mt-3 sm:block'
          }`}
        >
          {excerpt}
        </p>

        <span
          className={`font-decorative font-bold text-emerald-700 transition-colors group-hover:text-emerald-500 ${
            featured ? 'mt-4 text-xl' : 'mt-2 text-base sm:mt-4 sm:text-xl'
          }`}
        >
          <RoughHighlight type="underline" color="#10b981" strokeWidth={2} trigger="hover" show={isHovered}>
            <span className="whitespace-nowrap">{locale === 'ja' ? '続きを読む →' : 'Read more →'}</span>
          </RoughHighlight>
        </span>
      </div>
    </Link>
  )
}


