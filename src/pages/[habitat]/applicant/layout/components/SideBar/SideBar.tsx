import React from 'react';
import { Button, Flex, ScrollView } from '@aws-amplify/ui-react';
import {
  MdOutlineAssignmentTurnedIn,
  MdOutlineClose,
  MdOutlineFolderCopy,
  MdOutlineSettings,
} from 'react-icons/md';
import useIsHovered from 'hooks/utils/useIsHovered';
import useCloseContextMenu from 'hooks/utils/useCloseContextMenu';
import MenuItem from './components/MenuItem/MenuItem';
import Ellipse from './components/Ellipse';
import style from './SideBar.module.css';

interface IProperties {
  mobile: boolean;
  expanded: boolean;
  onExpand: () => void;
}

const SideBar = ({ mobile, expanded, onExpand }: IProperties) => {
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
        style={{
          zIndex: 1,
        }}
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
              to="applications"
              icon={<MdOutlineFolderCopy />}
              label="Applications"
              active
              expanded={isHoveredOrExpanded}
            />
            <MenuItem
              to=""
              icon={<MdOutlineAssignmentTurnedIn />}
              label="Decisions"
              expanded={isHoveredOrExpanded}
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
