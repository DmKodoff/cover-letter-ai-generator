import React from 'react'
import styles from './Header.module.scss'
import ProgressBar from '../../ui/ProgressBar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLetterStore } from '@/store/letterStore'

const Header: React.FC = () => {
  const { currentLetters, totalLetters } = useLetterStore()
  const router = useRouter()

  const handleHomeClick = () => {
    router.push('/')
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <div className={styles.logo} onClick={handleHomeClick}>
            <span className={styles.logoText}>CoverLetter</span>
          </div>
          <div className={styles.progressWrapper}>
            <ProgressBar current={currentLetters} total={totalLetters} />
          </div>
          <div className={styles.homeButton}>
            <Link href='/' className={styles.homeLink}>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
