import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="bg-primary-50 text-primary-700 ring-primary-200/60 hover:bg-primary-100 dark:bg-primary-950/40 dark:text-primary-300 dark:ring-primary-800/40 dark:hover:bg-primary-900/60 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 transition-colors ring-inset"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
