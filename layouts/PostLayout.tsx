import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
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

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <>
      <ScrollTopAndComment />
      <div className="py-10">
        {/* macOS window */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-200/60 dark:bg-gray-900 dark:ring-white/10">
          {/* Title bar */}
          <div className="flex items-center gap-3 border-b border-gray-200/60 bg-gray-50/80 px-4 py-3 dark:border-white/10 dark:bg-gray-800/60">
            <MacTrafficLights />
            <span className="mx-auto font-mono text-xs text-gray-400 dark:text-gray-500">
              blog / {slug}
            </span>
          </div>

          {/* Article header */}
          <div className="border-b border-gray-100 px-8 pt-10 pb-8 sm:px-12 dark:border-white/[0.06]">
            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-1.5">
              {tags?.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>

            {/* Title */}
            <PageTitle>{title}</PageTitle>

            {/* Meta row */}
            <div className="mt-5 flex flex-wrap items-center gap-4">
              {authorDetails.map((author) => (
                <div key={author.name} className="flex items-center gap-2">
                  {author.avatar && (
                    <Image
                      src={author.avatar}
                      width={24}
                      height={24}
                      alt="avatar"
                      className="h-6 w-6 rounded-full"
                    />
                  )}
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {author.name}
                  </span>
                </div>
              ))}
              <span className="text-gray-300 dark:text-gray-600">·</span>
              <time dateTime={date} className="font-mono text-sm text-gray-400 dark:text-gray-500">
                {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
              </time>
            </div>
          </div>

          {/* Article body */}
          <div className="px-8 py-10 sm:px-12">
            <div className="prose dark:prose-invert max-w-none">{children}</div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-8 py-8 sm:px-12 dark:border-white/[0.06]">
            {/* Comments */}
            {siteMetadata.comments && (
              <div className="mb-8" id="comment">
                <Comments slug={slug} />
              </div>
            )}

            {/* Prev / Next */}
            {(next || prev) && (
              <nav className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {prev && prev.path && (
                  <Link
                    href={`/${prev.path}`}
                    className="group flex flex-col gap-1 rounded-xl bg-gray-50 p-4 ring-1 ring-gray-200/60 transition-all hover:bg-gray-100 dark:bg-gray-800 dark:ring-white/10 dark:hover:bg-gray-700"
                  >
                    <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                      ← 이전 글
                    </span>
                    <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-sm font-semibold text-gray-900 transition-colors dark:text-gray-100">
                      {prev.title}
                    </span>
                  </Link>
                )}
                {next && next.path && (
                  <Link
                    href={`/${next.path}`}
                    className="group flex flex-col gap-1 rounded-xl bg-gray-50 p-4 text-right ring-1 ring-gray-200/60 transition-all hover:bg-gray-100 sm:col-start-2 dark:bg-gray-800 dark:ring-white/10 dark:hover:bg-gray-700"
                  >
                    <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                      다음 글 →
                    </span>
                    <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-sm font-semibold text-gray-900 transition-colors dark:text-gray-100">
                      {next.title}
                    </span>
                  </Link>
                )}
              </nav>
            )}

            {/* Bottom actions */}
            <div className="flex items-center justify-between">
              <Link
                href={`/${basePath}`}
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center gap-1.5 text-sm font-medium transition"
              >
                ← 블로그로
              </Link>
              <Link
                href={editUrl(filePath)}
                className="inline-flex items-center gap-1.5 text-xs text-gray-400 transition hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.25.25 0 00.108-.064l6.286-6.286z" />
                </svg>
                GitHub에서 수정
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
