import React from 'react';
import { Button, Flex, ScrollView } from '@aws-amplify/ui-react';
import {
  MdOutlineClose,
  MdOutlineSettings,
  MdOutlineHome,
  MdOutlineFeed,
  MdAutoGraph,
  MdOutlinePeopleOutline,
} from 'react-icons/md';
import useIsHovered from 'hooks/utils/useIsHovered';
import useCloseContextMenu from 'hooks/utils/useCloseContextMenu';
import { ROUTES, isCurrentRouteActive } from 'utils/routes';
import MenuItem from './components/MenuItem/MenuItem';
import Ellipse from './components/Ellipse';
import style from './SideBar.module.css';

interface IProperties {
  mobile: boolean;
  expanded: boolean;
  onExpand: () => void;
  pathname: string;
}

const SideBar = ({ mobile, expanded, onExpand, pathname }: IProperties) => {
  const sideBarRef = React.useRef<HTMLDivElement>(null);
  const isHovered = useIsHovered(sideBarRef);
  useCloseContextMenu(sideBarRef, onExpand);

  const isHoveredOrExpanded = isHovered || (mobile && expanded);

  if (!mobile || (mobile && expanded)) {
    return (
      <ScrollView
        ref={sideBarRef}
        className={`${style.sideBar}`}
        position={mobile ? 'absolute' : ''}
      >
        <Flex
          justifyContent="space-between"
          direction="column"
          minHeight="100%"
          width={isHoveredOrExpanded ? '248px' : ''}
          position="relative"
        >
          {mobile && expanded && (
            <Button
              position="absolute"
              top="0"
              right="0"
              variation="destructive"
              padding="6px"
              onClick={onExpand}
            >
              <MdOutlineClose size="24px" />
            </Button>
          )}
          <Flex direction="column" gap="16px" justifyContent="space-between">
            <Ellipse />
            <MenuItem
              to="home"
              icon={<MdOutlineHome />}
              label="Home"
              active={isCurrentRouteActive(
                pathname,
                ROUTES.affiliateHome.route
              )}
              expanded={isHoveredOrExpanded}
            />
            <MenuItem
              to="forms"
              icon={<MdOutlineFeed />}
              label="Forms"
              expanded={isHoveredOrExpanded}
              active={isCurrentRouteActive(
                pathname,
                ROUTES.affiliateForms.route
              )}
            />
            <MenuItem
              to="analytics"
              icon={<MdAutoGraph />}
              label="Analytics"
              expanded={isHoveredOrExpanded}
              active={isCurrentRouteActive(
                pathname,
                ROUTES.affiliateAnalytics.route
              )}
            />
            <MenuItem
              to="users"
              icon={<MdOutlinePeopleOutline />}
              label="Users"
              expanded={isHoveredOrExpanded}
              active={isCurrentRouteActive(
                pathname,
                ROUTES.affiliateUsers.route
              )}
            />
          </Flex>
          <Flex direction="column" gap="16px">
            <MenuItem
              to=""
              icon={<MdOutlineSettings />}
              label="Settings"
              expanded={isHoveredOrExpanded}
            />
          </Flex>
        </Flex>
      </ScrollView>
    );
  }
};

export default SideBar;
