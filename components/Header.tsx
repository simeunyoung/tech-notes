import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-gray-950/80">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <span className="text-base font-semibold tracking-tight text-gray-900 dark:text-gray-100">
              {siteMetadata.headerTitle}
            </span>
          ) : (
            siteMetadata.headerTitle
          )}
        </Link>

        <div className="flex items-center gap-1">
          <nav className="no-scrollbar hidden items-center overflow-x-auto sm:flex">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-gray-100"
                >
                  {link.title}
                </Link>
              ))}
          </nav>
          <div className="flex items-center gap-1 pl-2">
            <SearchButton />
            <ThemeSwitch />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
