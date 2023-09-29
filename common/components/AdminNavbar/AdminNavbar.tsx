import styled from 'styled-components'
import Image from 'next/image'
import personActive from 'public/img/icons/person-select.svg'
import person from 'public/img/icons/person-admin.svg'
import statistics from 'public/img/icons/trending-up.svg'
import statisticsActive from 'public/img/icons/trending-up_selected.svg'
import payments from 'public/img/icons/credit.svg'
import paymentsActive from 'public/img/icons/credit-active.svg'
import posts from 'public/img/icons/image-outline.svg'
import postsActive from 'public/img/icons/image.svg'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

export const AdminNavbar = () => {
  const path = usePathname()
  const { t } = useTranslation('admin_navbar')

  const links = [
    {
      title: t('users'),
      href: person,
      activeHref: personActive,
      name: '/admin',
    },
    {
      title: t('statistics'),
      href: statistics,
      activeHref: statisticsActive,
      name: '/admin/statistics',
    },
    {
      title: t('payments'),
      href: payments,
      activeHref: paymentsActive,
      name: '/admin/payments',
    },
    {
      title: t('posts'),
      href: posts,
      activeHref: postsActive,
      name: '/admin/posts',
    },
  ]

  const isActive = (pathName: string) => {
    return path === pathName
  }

  return (
    <Navbar>
      {links.map(link => (
        <StyledLink key={link.title} href={link.name} isActive={isActive(link.name)}>
          <LinkIcon alt={link.title} src={isActive(link.name) ? link.activeHref : link.href} />
          {link.title}
        </StyledLink>
      ))}
    </Navbar>
  )
}

export const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 24px;

  position: fixed;
  top: 60px;

  padding: 72px 31px 20px 4.6%;
`
const StyledLink = styled(Link)<{ isActive: boolean }>`
  text-decoration: none;
  cursor: pointer;
  display: flex;
  gap: 12px;
  color: ${props => (props.isActive ? '#397DF6' : 'white')};
`
const LinkIcon = styled(Image)``
