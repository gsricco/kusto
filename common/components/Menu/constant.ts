import { Path } from 'common/enums/path'

export const MenuItems = [
  {
    name: 'Profile Settings',
    href: Path.PROFILE_SETTINGS,
    icon: '/img/icons/settings.svg',
    selectIcon: '/img/icons/settings-outline.svg',
  },
  {
    name: 'Statistics',
    href: '/',
    icon: '/img/icons/trending-up.svg',
    selectIcon: '/img/icons/trending-up_selected.svg',
  },
  {
    name: 'Favorites',
    href: '/',
    icon: '/img/icons/favorites.svg',
    selectIcon: '/img/icons/favorites_selected.svg',
  },

  {
    name: 'Log Out',
    href: '',
    icon: '/img/icons/log-out.svg',
    selectIcon: '/img/icons/log-out.svg',
  },
]

export const links = [
  {
    name: 'home',
    href: '/home',
    icon: '/img/icons/home.svg',
    selectIcon: '/img/icons/homeSelect.svg',
  },
  {
    name: 'create',
    href: '',
    icon: '/img/icons/plus-square.svg',
    selectIcon: '/img/icons/plus-square-select.svg',
  },
  {
    name: 'messenger',
    href: '/messenger',
    icon: '/img/icons/message.svg',
    selectIcon: '/img/icons/message-select.svg',
  },
  {
    name: 'search',
    href: '/search',
    icon: '/img/icons/search.svg',
    selectIcon: '/img/icons/search-select.svg',
  },
  {
    name: 'my_profile',
    href: '/profile',
    icon: '/img/icons/person.svg',
    selectIcon: '/img/icons/person-select.svg',
  },
]
