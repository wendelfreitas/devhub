import classNames from 'classnames'
import Link from 'next/link'

import HeaderLink from './HeaderLink'

const twClasses = {
  headerLink__rightMargin: 'mr-6 md:mr-12',
}

export default function Header() {
  return (
    <header className="container mb-10 py-4">
      <div className="flex flex-row items-center overflow-x-auto">
        <Link href="/">
          <a
            className={classNames(
              'flex flex-row items-center',
              twClasses.headerLink__rightMargin,
            )}
          >
            <div className="w-8 h-8 sm:mr-3 bg-primary rounded-full" />
            <span className="text-lg font-semibold text-black hidden sm:inline-block">
              DevHub
            </span>
          </a>
        </Link>

        <div className="flex-1" />

        <HeaderLink
          prefetch
          href="/features"
          className={twClasses.headerLink__rightMargin}
        >
          Features
        </HeaderLink>

        <HeaderLink
          prefetch
          href="/pricing"
          className={twClasses.headerLink__rightMargin}
        >
          Pricing
        </HeaderLink>

        <HeaderLink
          href="/changelog"
          className={twClasses.headerLink__rightMargin}
        >
          Changelog
        </HeaderLink>

        <HeaderLink prefetch href="/download" type="primary">
          Download
        </HeaderLink>
      </div>
    </header>
  )
}
