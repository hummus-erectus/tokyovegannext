import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

export const revalidate = 3600

const POST_QUERY = `*[_type == "post" && slug.current == $slug && language == $language][0] {
  _id,
  title,
  slug,
  body,
  mainImage,
  publishedAt,
  excerpt,
  "authorName": author->name,
  "authorImage": author->image,
}`

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

function buildPtComponents(): PortableTextComponents {
  let imageIndex = 0
  return {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) return null
        const url = urlFor(value).width(800).auto('format').url()
        const rotation = imageIndex % 2 === 0 ? 'rotate-1' : '-rotate-1'
        imageIndex++
        return (
          <figure className={`my-8 ${rotation}`}>
            <div className="relative photo-slit" style={{ '--clip': '40px' } as React.CSSProperties}>
              <Image
                src={url}
                alt={value.alt || ''}
                width={800}
                height={500}
                sizes="(max-width: 768px) 100vw, 700px"
                className="max-w-full h-auto block"
              />
            </div>
            {value.caption && (
              <figcaption className="mt-2 text-center text-sm text-slate-500 font-hand">
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },
    },
    block: {
      h2: ({ children }) => (
        <h2 className="font-hand text-3xl md:text-4xl font-bold text-emerald-700 mt-10 mb-4 -rotate-1">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="font-hand text-2xl md:text-3xl font-bold text-slate-800 mt-8 mb-3">
          {children}
        </h3>
      ),
      normal: ({ children }) => (
        <p className="text-base md:text-lg leading-relaxed text-slate-700 mb-4">
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-emerald-400 pl-4 italic text-slate-600 my-6 bg-white/50 py-2">
          {children}
        </blockquote>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({ value, children }) => {
        const href = value?.href || ''
        const isExternal = href.startsWith('http')
        return (
          <a
            href={href}
            className="text-emerald-700 underline underline-offset-2 hover:text-emerald-500 transition-colors"
            {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            {children}
          </a>
        )
      },
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc pl-6 space-y-2 mb-4 text-slate-700">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal pl-6 space-y-2 mb-4 text-slate-700">{children}</ol>,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  const t = await getTranslations('BlogPostPage')

  const post = await client.fetch(POST_QUERY, { slug, language: locale })

  if (!post) {
    notFound()
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  const mainImageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(600).url()
    : null

  const authorImageUrl = post.authorImage
    ? urlFor(post.authorImage).width(80).height(80).url()
    : null

  return (
    <div className="min-h-screen text-slate-900 pb-24">
      <article className="mx-auto max-w-3xl px-4 pt-12">
        {/* Back link */}
        <div className="mb-8">
          <Link
            href={`/${locale}/blog`}
            className="font-hand text-lg text-emerald-700 hover:text-emerald-500 transition-colors"
          >
            ← {t('backToList')}
          </Link>
        </div>

        {/* Article paper card */}
        <div className="tape-section">
          <div className="tape-top-center" />
          <div className="bg-paper-texture p-6 md:p-12 shadow-xl shadow-slate-300/60">
            {/* Title */}
            <h1 className="font-hand text-4xl md:text-6xl font-bold text-slate-900 mb-4 -rotate-1">
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              {/* Author byline */}
              {post.authorName && (
                <div className="flex items-center gap-3 bg-white px-3 py-2 post-it-shadow">
                  {authorImageUrl && (
                    <Image
                      src={authorImageUrl}
                      alt={post.authorName}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-sm font-semibold text-slate-700">{post.authorName}</span>
                </div>
              )}

              {formattedDate && (
                <span className="text-sm text-slate-500">{formattedDate}</span>
              )}

            </div>

            {/* Main image */}
            {mainImageUrl && (
              <div className="mb-10 -rotate-1">
                <div className="relative photo-slit" style={{ '--clip': '40px' } as React.CSSProperties}>
                  <Image
                    src={mainImageUrl}
                    alt={post.mainImage?.alt || post.title}
                    width={1200}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="w-full h-auto block"
                  />
                </div>
              </div>
            )}

            {/* Body */}
            {post.body && (
              <div className="prose-custom">
                <PortableText value={post.body} components={buildPtComponents()} />
              </div>
            )}
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/blog`}
            className="font-hand text-xl text-emerald-700 hover:text-emerald-500 transition-colors"
          >
            ← {t('backToList')}
          </Link>
        </div>
      </article>
    </div>
  )
}
