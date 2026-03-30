import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
      {children}
    </h1>
  )
}
