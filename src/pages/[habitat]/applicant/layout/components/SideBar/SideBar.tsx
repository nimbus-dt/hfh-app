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
import style from './SideBar.module.css';

const SideBar = () => {
  const sideBarRef = React.useRef<HTMLDivElement>(null);
  const isHovered = useIsHovered(sideBarRef);

  return (
    <ScrollView ref={sideBarRef} className={`${style.sideBar}`}>
      <Flex justifyContent="space-between" direction="column" minHeight="100%">
        <Flex direction="column" gap="16px" justifyContent="space-between">
          <Ellipse />
          <MenuItem
            to="applications"
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
