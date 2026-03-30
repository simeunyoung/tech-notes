import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200/60 dark:border-white/10">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 xl:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Brand */}
          <Link href="/" className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {siteMetadata.title}
          </Link>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {siteMetadata.email && (
              <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={5} />
            )}
            {siteMetadata.github && (
              <SocialIcon kind="github" href={siteMetadata.github} size={5} />
            )}
            {siteMetadata.linkedin && (
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={5} />
            )}
            {siteMetadata.x && <SocialIcon kind="x" href={siteMetadata.x} size={5} />}
            {siteMetadata.instagram && (
              <SocialIcon kind="instagram" href={siteMetadata.instagram} size={5} />
            )}
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} {siteMetadata.author}
          </p>
        </div>
      </div>
    </footer>
  )
}
