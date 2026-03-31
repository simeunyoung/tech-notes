import Link from '@/components/Link'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

function MacTrafficLights() {
  return (
    <div className="flex items-center gap-2">
      <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
      <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
      <span className="h-3 w-3 rounded-full bg-[#28C840]" />
    </div>
  )
}

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <div className="py-10">
      <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-200/60 dark:bg-gray-900 dark:ring-white/10">
        {/* Title bar */}
        <div className="flex items-center gap-3 border-b border-gray-200/60 bg-gray-50/80 px-4 py-3 dark:border-white/10 dark:bg-gray-800/60">
          <MacTrafficLights />
          <span className="mx-auto font-mono text-xs text-gray-400 dark:text-gray-500">
            blog / tags
          </span>
        </div>

        {/* Content */}
        <div className="px-8 py-8 sm:px-12">
          <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Tags
          </h1>

          {tagKeys.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No tags found.</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {sortedTags.map((t) => (
                <Link
                  key={t}
                  href={`/tags/${slug(t)}`}
                  aria-label={`View posts tagged ${t}`}
                  className="group flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-2 ring-1 ring-gray-200/60 transition hover:bg-gray-100 dark:bg-gray-800/60 dark:ring-white/10 dark:hover:bg-gray-700/60"
                >
                  <span className="font-mono text-sm font-medium text-gray-700 dark:text-gray-300">
                    #{t.split(' ').join('-')}
                  </span>
                  <span className="rounded-full bg-gray-200/80 px-1.5 py-0.5 font-mono text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                    {tagCounts[t]}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
