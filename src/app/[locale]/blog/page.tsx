import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import { BlogPostCard } from '@/components/BlogPostCard'
import { PaperButton } from '@/components/PaperButton'
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

  return (
    <div className="min-h-screen text-slate-900 pb-24">
      {/* Hero */}
      <section className="relative pt-12 pb-12 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="tape-section rotate-1">
            <div className="tape-top-center" />
            <div className="bg-white p-8 md:p-16 shadow-xl shadow-slate-300/60 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-600 mb-4">
                {t('hero.eyebrow')}
              </p>
              <h1 className="font-hand text-5xl md:text-7xl font-bold text-slate-900 mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
                {t('hero.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

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
              const imageUrl = post.mainImage
                ? urlFor(post.mainImage).width(600).height(400).url()
                : undefined

              return (
                <div key={post._id} className={`relative ${rotation} washi-tape-top`}>
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
                <p className="font-hand text-3xl text-slate-500">
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
