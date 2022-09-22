import type { NextPage } from 'next'
import Link from 'next/link'
import { link, navList, subHeading } from '../styles/app.css'
import Layout from '../layouts/layout'

const Home: NextPage = () => {
  return (
    <Layout pageName="Listbox experiments">
      <p className={subHeading}>
        {`Made with  `}
        <NavLink href="https://nextjs.org/" text="next.js" />
        <NavLink href="https://www.npmjs.com/package/@vanilla-extract/css" text="@vanilla-extract/css" last />
      </p>
      <nav className={navList} aria-label="type of component">
        <Link href="/checkbox">
          <a className={link}>Checkboxes</a>
        </Link>
        <Link href="/dropdown">
          <a className={link}>Dropdowns</a>
        </Link>
      </nav>
    </Layout>
  )
}

const NavLink = ({
  href,
  text,
  last,
}: {
  href: string;
  text: string;
  last?: boolean;
}) => {
  return (
    <>
      <a href={href} className={link}>
        {text}
      </a>
      {last ? '' : `, `}
    </>
  )
}

export default Home
