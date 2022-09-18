import { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import {
  appContainer,
  container,
  heading,
  header,
  footer,
  link,
} from "../styles/app.css";
const Layout = ({
  children,
  pageName,
}: {
  children: ReactNode;
  pageName: string;
}) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{title(router.asPath)}</title>
      </Head>
      <div className={appContainer}>
        <header className={header}>
          <h1 className={heading}>{pageName}</h1>
          {router.pathname !== "/" && (
            <Link href="/">
              <a className={link}>{`index`}</a>
            </Link>
          )}
        </header>
        <main className={container}>{children}</main>
        <footer className={footer}>
          <a className={link} href="http://www.github.com/klassenl">
            Github
          </a>
        </footer>
      </div>
    </>
  );
};

const title = (path: string) => {
  switch (path) {
    case "/checkbox":
      return "Checkbox Listbox";
    default:
      return "Listbox";
  }
};

export default Layout;
