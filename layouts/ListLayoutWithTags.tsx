'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  totalPosts: number
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function MacTrafficLights() {
  return (
    <div className="flex items-center gap-2">
      <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
      <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
      <span className="h-3 w-3 rounded-full bg-[#28C840]" />
    </div>
  )
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="mt-6 flex items-center justify-between border-t border-gray-100 px-6 py-4 dark:border-white/[0.06]">
      {prevPage ? (
        <Link
          href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
          rel="prev"
          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 text-sm font-medium transition"
        >
          ← 이전
        </Link>
      ) : (
        <span />
      )}
      <span className="font-mono text-xs text-gray-400">
        {currentPage} / {totalPages}
      </span>
      {nextPage ? (
        <Link
          href={`/${basePath}/page/${currentPage + 1}`}
          rel="next"
          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 text-sm font-medium transition"
        >
          다음 →
        </Link>
      ) : (
        <span />
      )}
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  totalPosts,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <div className="py-10">
      {/* Mobile title */}
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 sm:hidden dark:text-gray-100">
        {title}
      </h1>

      <div className="flex gap-6">
        {/* Sidebar — macOS window */}
        <aside className="hidden w-48 shrink-0 sm:block">
          <div className="sticky top-20 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/60 dark:bg-gray-900 dark:ring-white/10">
            {/* Tag list */}
            <div className="p-2 pt-3">
              <p className="mb-1.5 px-2 text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
                태그
              </p>
              <ul className="space-y-0.5">
                <li>
                  {pathname.startsWith('/blog') && !pathname.includes('/tags') ? (
                    <span className="text-primary-600 dark:text-primary-400 flex items-center justify-between rounded-lg px-2 py-1.5 text-sm font-semibold">
                      <span>전체 글</span>
                      <span className="text-primary-400 dark:text-primary-500 font-mono text-xs">
                        {totalPosts}
                      </span>
                    </span>
                  ) : (
                    <Link
                      href="/blog"
                      className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-gray-100"
                    >
                      <span>전체 글</span>
                      <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
                        {totalPosts}
                      </span>
                    </Link>
                  )}
                </li>
                {sortedTags.map((t) => {
                  const isActive = decodeURI(pathname.split('/tags/')[1]) === slug(t)
                  return (
                    <li key={t}>
                      {isActive ? (
                        <span className="text-primary-600 dark:text-primary-400 flex items-center justify-between rounded-lg px-2 py-1.5 text-sm font-semibold">
                          <span className="truncate">{t}</span>
                          <span className="text-primary-400 dark:text-primary-500 ml-1 shrink-0 font-mono text-xs">
                            {tagCounts[t]}
                          </span>
                        </span>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-gray-100"
                          aria-label={`View posts tagged ${t}`}
                        >
                          <span className="truncate">{t}</span>
                          <span className="ml-1 shrink-0 font-mono text-xs text-gray-400 dark:text-gray-500">
                            {tagCounts[t]}
                          </span>
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </aside>

        {/* Post list — macOS window */}
        <div className="min-w-0 flex-1">
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/60 dark:bg-gray-900 dark:ring-white/10">
            {/* Title bar */}
            <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/80 px-4 py-3 dark:border-white/[0.06] dark:bg-gray-800/60">
              <MacTrafficLights />
              <span className="mx-auto font-mono text-xs text-gray-400 dark:text-gray-500">
                {title.toLowerCase()}
              </span>
            </div>

            {!displayPosts.length ? (
              <p className="py-16 text-center text-sm text-gray-400">게시글이 없습니다.</p>
            ) : (
              <ul className="divide-y divide-gray-100 dark:divide-white/[0.06]">
                {displayPosts.map((post) => {
                  const { path, date, title: postTitle, summary, tags } = post
                  return (
                    <li
                      key={path}
                      className="group transition-colors hover:bg-gray-50/80 dark:hover:bg-white/[0.03]"
                    >
                      <div className="flex items-start gap-4 px-5 py-5">
                        {/* Date — 고정 너비로 레이아웃 고정 */}
                        <time
                          dateTime={date}
                          suppressHydrationWarning
                          className="w-28 shrink-0 font-mono text-xs whitespace-nowrap text-gray-400 tabular-nums dark:text-gray-500"
                          style={{ paddingTop: '3px' }}
                        >
                          {formatDate(date, siteMetadata.locale)}
                        </time>

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                          <Link href={`/${path}`}>
                            <h2 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-1.5 text-sm leading-snug font-semibold tracking-tight text-gray-900 transition-colors dark:text-gray-100">
                              {postTitle}
                            </h2>
                          </Link>
                          <p className="mb-2 line-clamp-1 text-xs leading-relaxed text-gray-400 dark:text-gray-500">
                            {summary}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {tags?.map((tag) => (
                              <span key={tag} className="text-xs text-gray-400 dark:text-gray-500">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Arrow */}
                        <Link
                          href={`/${path}`}
                          aria-label={`Read more: "${postTitle}"`}
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

            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
