import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import { BlogPostCard } from '@/components/BlogPostCard'
import { PageHero } from '@/components/PageHero'
import { PaperButton } from '@/components/PaperButton'
import { WashiTape } from '@/components/WashiTape'
import { washiPick } from '@/lib/washiPick'
import { getTranslations } from 'next-intl/server'

export const revalidate = 3600

const POSTS_QUERY = `*[_type == "post" && language == $language && defined(slug.current) && publishedAt < now()] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  "authorName": author->name
}`

type Props = {
  params: Promise<{ locale: string }>
}

export default async function BlogListPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations('BlogPage')

  const posts = await client.fetch(POSTS_QUERY, { language: locale })

  const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2']
  const variants = ['indigo', 'sakura', 'mint', 'mustard', 'emerald'] as const

  return (
    <div className="min-h-screen text-slate-900 pb-24">
      {/* Hero */}
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        description={t('hero.description')}
        locale={locale}
      />

      {/* Posts Grid */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        {posts.length > 0 ? (
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: {
              _id: string
              title: string
              slug: { current: string }
              excerpt?: string
              mainImage?: { asset: { _ref: string }; alt?: string }
              publishedAt?: string
              authorName?: string
            }, idx: number) => {
              const rotation = rotations[idx % rotations.length]
              const variant = variants[washiPick(post._id, 0, variants.length)]
              const variant2 = variants[washiPick(post._id, 1, variants.length)]
              const imageUrl = post.mainImage
                ? urlFor(post.mainImage).width(600).height(400).url()
                : undefined

              const useCenterTape = washiPick(post._id, 7, 100) < 40

              return (
                <div key={post._id} className={`relative card-stack-z ${rotation}`}>
                  {useCenterTape ? (
                    <WashiTape variant={variant} placement="top-center" rotation={-2} size="md" widthPct={60} />
                  ) : (
                    <>
                      <WashiTape variant={variant} placement="top-left" rotation={-36} size="md" />
                      <WashiTape variant={variant2} placement="top-right" rotation={36} size="md" />
                    </>
                  )}
                  <BlogPostCard
                    title={post.title}
                    excerpt={post.excerpt || ''}
                    slug={post.slug.current}
                    locale={locale}
                    imageUrl={imageUrl}
                    imageAlt={post.mainImage?.alt}
                    publishedAt={post.publishedAt}
                    authorName={post.authorName}
                  />
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="tape-section mx-auto max-w-md">
              <div className="tape-top-center" />
              <div className="bg-white p-8 shadow-lg text-center">
                <p className="font-decorative text-3xl text-slate-500">
                  {t('empty')}
                </p>
                <div className="mt-6">
                  <PaperButton
                    href="/"
                    type="link"
                    locale={locale}
                    variant="outline"
                    color="emerald"
                    size="md"
                    className="font-bold"
                  >
                    {t('backHome')}
                  </PaperButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
