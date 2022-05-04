import React from 'react';
import { Nav } from 'react-bootstrap';
import clsx from 'clsx';
import NavBarOverflowMenu, { NavItemChildType } from './NavBarOverflowMenu';

interface NavBarOverflowWrapperProps {
  component: boolean;
  aditionalComponentProps?: Record<string, unknown>;
}

const NavBarOverflowWrapper: React.FC<NavBarOverflowWrapperProps> = ({ children, component, aditionalComponentProps }) => {
  const navRef = React.useRef<HTMLDivElement | null>(null);
  const [visibilityMap, setVisibilityMap] = React.useState<Record<string, boolean>>({});

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const updatedEntries: { [key: string]: boolean } = {};
    entries.forEach((entry) => {
      const target = entry.target as HTMLElement;
      const targetid = target.dataset?.targetid;
      if (targetid) {
        if (entry.isIntersecting) {
          updatedEntries[targetid] = true;
        } else {
          updatedEntries[targetid] = false;
        }
      }
    });
    setVisibilityMap((prev) => {
      return {
        ...prev,
        ...updatedEntries,
      };
    });
  };
  React.useEffect(() => {
    let observer: IntersectionObserver;
    if (navRef.current && navRef.current.children.length > 0) {
      observer = new IntersectionObserver(handleIntersection, {
        root: navRef.current,
        threshold: 1,
      });
      Array.from(navRef.current.children).forEach((item) => {
        const navRefChildItem = item as HTMLElement;
        if (navRefChildItem.dataset.targetid) {
          observer.observe(navRefChildItem);
        }
      });
    }

    return () => observer && observer.disconnect();
  }, [navRef.current?.children]);

  return (
    <Nav role="navigation" aria-label="main_navigation" className="flex-nowrap text-nowrap nav-bar" ref={navRef}>
      {React.Children.map<NavItemChildType, React.ReactNode>(children, (child) => {
        if (React.isValidElement(child)) {
          if (component) {
            const element = React.cloneElement(child, {
              ...child.props,
              children: {
                ...child.props.children,
                props: {
                  ...child.props.children.props,
                  className: clsx(child.props.children.props.className, {
                    visible: visibilityMap[child.props.children.props['data-targetid']],
                    inVisible: !visibilityMap[child.props.children.props['data-targetid']],
                  }),
                },
              },
            });
            return element;
          }
          const element = React.cloneElement(child, {
            className: clsx(child.props.className, {
              visible: visibilityMap[child.props['data-targetid']],
              inVisible: !visibilityMap[child.props['data-targetid']],
            }),
          });
          return element;
        }
        return null;
      })}
      <NavBarOverflowMenu visibilityMap={visibilityMap} component={component} aditionalComponentProps={aditionalComponentProps}>
        {children}
      </NavBarOverflowMenu>
    </Nav>
  );
};

export default NavBarOverflowWrapper;
