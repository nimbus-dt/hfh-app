import { useBreakpointValue } from '@aws-amplify/ui-react';
import { SidebarLG } from './SidebarLG';
import { SidebarSM } from './SidebarSM';

export function Sidebar() {
  const isLargeLayout = useBreakpointValue({
    base: false,
    large: true,
  });

  const SidebarElement = isLargeLayout ? SidebarLG : SidebarSM;

  return <SidebarElement />;
}
