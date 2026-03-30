import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_DISPLAY = 5

function MacTrafficLights() {
  return (
    <div className="flex items-center gap-2">
      <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
      <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
      <span className="h-3 w-3 rounded-full bg-[#28C840]" />
    </div>
  )
}

export default function Home({ posts }) {
  return (
    <div className="py-10">
      {/* Hero — macOS window card */}
      <div className="mb-12 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-200/60 dark:bg-gray-900 dark:ring-white/10">
        <div className="flex items-center gap-3 border-b border-gray-200/60 bg-gray-50/80 px-4 py-3 dark:border-white/10 dark:bg-gray-800/60">
          <MacTrafficLights />
          <span className="mx-auto text-xs font-medium text-gray-400 dark:text-gray-500">
            tech-notes — Backend Developer Blog
          </span>
        </div>
        <div className="px-8 py-12 text-center sm:px-16 sm:py-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5 dark:bg-gray-800">
            <span className="h-2 w-2 rounded-full bg-[#28C840]" />
            <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
              {siteMetadata.author}
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
            Tech Notes
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/blog"
              className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 rounded-full px-5 py-2 text-sm font-medium text-white shadow-sm transition"
            >
              글 읽기
            </Link>
            <Link
              href="/about"
              className="rounded-full bg-gray-100 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              소개
            </Link>
          </div>
        </div>
      </div>

      {/* Recent posts */}
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-widest text-gray-400 uppercase dark:text-gray-500">
            최근 글
          </h2>
          {posts.length > MAX_DISPLAY && (
            <Link
              href="/blog"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-xs font-medium transition"
            >
              전체 보기 →
            </Link>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/60 dark:bg-gray-900 dark:ring-white/10">
          <div className="flex items-center gap-3 border-b border-gray-200/60 bg-gray-50/80 px-4 py-3 dark:border-white/10 dark:bg-gray-800/60">
            <MacTrafficLights />
            <span className="mx-auto text-xs font-medium text-gray-400 dark:text-gray-500">
              posts
            </span>
          </div>

          {!posts.length ? (
            <p className="py-16 text-center text-sm text-gray-400">아직 작성된 글이 없습니다.</p>
          ) : (
            <ul className="divide-y divide-gray-100 dark:divide-white/[0.06]">
              {posts.slice(0, MAX_DISPLAY).map((post) => {
                const { slug, date, title, summary, tags } = post
                return (
                  <li
                    key={slug}
                    className="group transition-colors hover:bg-gray-50/80 dark:hover:bg-white/[0.03]"
                  >
                    <div className="flex items-start gap-4 px-6 py-5">
                      {/* Date */}
                      <time
                        dateTime={date}
                        className="w-28 shrink-0 font-mono text-xs whitespace-nowrap text-gray-400 tabular-nums dark:text-gray-500"
                        style={{ paddingTop: '2px' }}
                      >
                        {formatDate(date, siteMetadata.locale)}
                      </time>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <Link href={`/blog/${slug}`} aria-label={`Read more: "${title}"`}>
                          <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-1.5 text-sm leading-snug font-semibold tracking-tight text-gray-900 transition-colors dark:text-gray-100">
                            {title}
                          </h3>
                        </Link>
                        <p className="mb-2 line-clamp-1 text-xs leading-relaxed text-gray-400 dark:text-gray-500">
                          {summary}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {tags.map((tag) => (
                            <span key={tag} className="text-xs text-gray-400 dark:text-gray-500">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Arrow — 별도 Link로 분리 */}
                      <Link
                        href={`/blog/${slug}`}
                        aria-label={`Read more: "${title}"`}
                        className="group-hover:text-primary-500 dark:group-hover:text-primary-400 mt-1 shrink-0 text-gray-300 transition-colors dark:text-gray-600"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M3 8h10M9 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
