import Nav from './Nav'
import Meta from './Meta'
import styles from '../../styles/Layout.module.css'

interface LayoutProps {
  children: React.ReactNode;
}


const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Meta />
      <Nav />
      <div className={styles.container}>
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </>
  )
}

export default Layout