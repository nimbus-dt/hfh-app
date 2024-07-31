/* eslint-disable react/style-prop-object */
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  MdAutoGraph,
  MdOutlineAssignmentTurnedIn,
  MdOutlineClose,
  MdOutlineFeed,
  MdOutlineFolderCopy,
  MdOutlineHome,
  MdOutlinePeopleOutline,
  MdOutlineSettings,
} from 'react-icons/md';
import { Button, Flex } from '@aws-amplify/ui-react';

import useCloseContextMenu from 'hooks/utils/useCloseContextMenu';
import useIsHovered from 'hooks/utils/useIsHovered';
import useRoutes, { isActive } from 'utils/routes';

import MenuItem from './components/MenuItem/MenuItem';
import style from './SideBar.module.css';
import HabitatHeader from './components/HabitatHeader';

interface IProperties {
  mobile: boolean;
  expanded: boolean;
  onExpand: () => void;
  pathname: string;
  variation: 'applicant' | 'affiliate';
}

const SideBar = ({
  mobile,
  expanded,
  onExpand,
  pathname,
  variation,
}: IProperties) => {
  const sideBarRef = React.useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const routes = useRoutes(t);

  const isHovered = useIsHovered(sideBarRef);

  useCloseContextMenu(sideBarRef, onExpand);

  const isHoveredOrExpanded = isHovered || (mobile && expanded);

  if (!mobile || (mobile && expanded)) {
    return (
      <div
        ref={sideBarRef}
        className={`${style.sideBar}`}
        style={{ position: mobile ? 'absolute' : undefined }}
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
            <HabitatHeader />
            {variation === 'affiliate' && (
              <>
                <MenuItem
                  to="home"
                  icon={<MdOutlineHome />}
                  label={routes.affiliateHome.title}
                  active={isActive(pathname, routes.affiliateHome.route)}
                  expanded={isHoveredOrExpanded}
                />
                <MenuItem
                  to="forms"
                  icon={<MdOutlineFeed />}
                  label={routes.affiliateForms.title}
                  expanded={isHoveredOrExpanded}
                  active={isActive(pathname, routes.affiliateForms.route)}
                />
                <MenuItem
                  to="analytics"
                  icon={<MdAutoGraph />}
                  label={routes.affiliateAnalytics.title}
                  expanded={isHoveredOrExpanded}
                  active={isActive(pathname, routes.affiliateAnalytics.route)}
                />
                <MenuItem
                  to="users"
                  icon={<MdOutlinePeopleOutline />}
                  label={routes.affiliateUsers.title}
                  expanded={isHoveredOrExpanded}
                  active={isActive(pathname, routes.affiliateUsers.route)}
                />
              </>
            )}
            {variation === 'applicant' && (
              <>
                <MenuItem
                  to="applications"
                  icon={<MdOutlineFolderCopy />}
                  label={routes.applicantApplications.title}
                  active={isActive(
                    pathname,
                    routes.applicantApplications.route
                  )}
                  expanded={isHoveredOrExpanded}
                />
                <MenuItem
                  to="decisions"
                  icon={<MdOutlineAssignmentTurnedIn />}
                  label={routes.applicantDecisions.title}
                  expanded={isHoveredOrExpanded}
                  active={isActive(pathname, routes.applicantDecisions.route)}
                />
              </>
            )}
          </Flex>
          <Flex direction="column" gap="16px">
            <MenuItem
              to=""
              icon={<MdOutlineSettings />}
              label={routes.settings.title}
              expanded={isHoveredOrExpanded}
            />
          </Flex>
        </Flex>
      </div>
    );
  }
};

export default SideBar;
