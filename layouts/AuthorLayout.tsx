import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content

  return (
    <div className="py-10">
      <h1 className="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        About
      </h1>
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-12">
        {/* Profile card */}
        <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/60 sm:w-56 sm:shrink-0 dark:bg-gray-900 dark:ring-white/10">
          {avatar && (
            <Image
              src={avatar}
              alt="avatar"
              width={120}
              height={120}
              className="h-24 w-24 rounded-full"
            />
          )}
          <h3 className="mt-4 text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            {name}
          </h3>
          {occupation && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{occupation}</p>
          )}
          {company && <p className="text-sm text-gray-400 dark:text-gray-500">{company}</p>}
          <div className="mt-4 flex gap-2">
            {email && <SocialIcon kind="mail" href={`mailto:${email}`} size={5} />}
            {github && <SocialIcon kind="github" href={github} size={5} />}
            {linkedin && <SocialIcon kind="linkedin" href={linkedin} size={5} />}
            {twitter && <SocialIcon kind="x" href={twitter} size={5} />}
            {bluesky && <SocialIcon kind="bluesky" href={bluesky} size={5} />}
          </div>
        </div>

        {/* Bio */}
        <div className="prose dark:prose-invert max-w-none flex-1">{children}</div>
      </div>
    </div>
  )
}
