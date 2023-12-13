import {
   faHeart,
   faRightFromBracket,
   faShoppingCart,
   faUser,
   faHome,
} from '@fortawesome/free-solid-svg-icons';

export const navbar = [
   {title: 'Home', href: '/'},
   {title: 'Take Action', href: '/take-action'},
   {title: 'Adopt', href: '/adopt'},
   {title: 'Contact', href: '/contact'},
   {title: 'Donation', href: '/donation', style: {border: true}},
];

export const listProfile = [
   {title: 'Profile', href: '/profile', icon: faUser},
   {title: 'Cart', href: '/cart', icon: faShoppingCart, style: {badge: true}},
   {title: 'Favorite', href: '/favorite', icon: faHeart},
   {title: 'Log out', href: '/log-out', icon: faRightFromBracket},
];
