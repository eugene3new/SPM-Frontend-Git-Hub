export interface ILinkProps {
  href: string;
  title: string;
}

const headerLinksItems: ILinkProps[] = [
  { title: 'setup', href: '/setup' },
  { title: 'timeline', href: '/timeline' },
  { title: 'login', href: '/login' },
];

export default headerLinksItems;
