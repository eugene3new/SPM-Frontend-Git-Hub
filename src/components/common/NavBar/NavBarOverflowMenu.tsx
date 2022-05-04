import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { setLazyProp } from 'next/dist/server/api-utils';

export type NavItemChildType =
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  | readonly React.ReactElement<any, string | React.JSXElementConstructor<any>>[]
  | null
  | undefined;

export interface OverflowMenuProps {
  visibilityMap: Record<string, boolean>;
  component?: any;
  aditionalComponentProps?: Record<string, unknown>;
}

interface MenuProps {
  children: React.ReactNode;
  style: React.CSSProperties | undefined;
  className: string;
  labeledBy: string;
}

interface ToggleProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomMenu = React.forwardRef<HTMLDivElement, MenuProps>(({ children, style, className, labeledBy }, ref) => {
  return (
    <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
      <ul className="list-unstyled mb-0">{React.Children.toArray(children)}</ul>
    </div>
  );
});

const CustomToggle = React.forwardRef<HTMLButtonElement, ToggleProps>(({ children, onClick }, ref) => (
  <button
    ref={ref}
    type="button"
    className="dropdown-button"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </button>
));

const NavBarOverflowMenu: React.FC<OverflowMenuProps> = ({ visibilityMap, children, component: Component, aditionalComponentProps }) => {
  const shouldShowMenu = React.useMemo(() => Object.values(visibilityMap).some((v) => v === false), [visibilityMap]);
  if (!shouldShowMenu) {
    return null;
  }
  return (
    <Dropdown role="navigation" aria-label="sub_navigation">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <FontAwesomeIcon icon={faEllipsisV} />
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu} labeledBy="">
        {React.Children.map<NavItemChildType, React.ReactNode>(children, (child) => {
          if (Component) {
            if (React.isValidElement(child) && !visibilityMap[child.props.children.props['data-targetid']]) {
              return (
                <Component href={child.props.href} {...aditionalComponentProps}>
                  <Dropdown.Item>{child.props.children.props.children}</Dropdown.Item>
                </Component>
              );
            }
          } else if (React.isValidElement(child) && !visibilityMap[child.props['data-targetid']]) {
            return <Dropdown.Item href={child.props.href}>{child.props.children}</Dropdown.Item>;
          }
          return null;
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavBarOverflowMenu;
