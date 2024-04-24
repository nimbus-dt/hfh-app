import React, { useEffect } from 'react';
import { Flex, ScrollView } from '@aws-amplify/ui-react';
import {
  MdOutlineAssignmentTurnedIn,
  MdOutlineFolderCopy,
  MdOutlineSettings,
} from 'react-icons/md';
import useIsHovered from 'hooks/utils/useIsHovered';
import MenuItem from './components/MenuItem/MenuItem';
import Ellipse from './components/Ellipse';

const SideBar = () => {
  const sideBarRef = React.useRef<HTMLDivElement>(null);
  const isHovered = useIsHovered(sideBarRef);

  useEffect(() => {
    console.log('hovered', isHovered);
  }, [isHovered]);

  return (
    <ScrollView
      backgroundColor="black"
      color="white"
      height="100vh"
      padding="24px"
      width={isHovered ? '248px' : 'fit-content'}
      ref={sideBarRef}
    >
      <Flex justifyContent="space-between" direction="column" minHeight="100%">
        <Flex direction="column" gap="16px" justifyContent="space-between">
          <Ellipse />
          <MenuItem
            to=""
            icon={<MdOutlineFolderCopy />}
            label="Applications"
            active
            expanded={isHovered}
          />
          <MenuItem
            to=""
            icon={<MdOutlineAssignmentTurnedIn />}
            label="Decisions"
            expanded={isHovered}
          />
        </Flex>
        <Flex direction="column" gap="16px">
          <MenuItem
            to=""
            icon={<MdOutlineSettings />}
            label="Settings"
            expanded={isHovered}
          />
        </Flex>
      </Flex>
    </ScrollView>
  );
};

export default SideBar;
