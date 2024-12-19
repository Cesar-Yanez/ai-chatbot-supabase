import { ComponentProps } from 'react';

import { SidebarLeftIcon } from './icons';
import { Button } from '../ui/button';

import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { BetterTooltip } from '@/components/ui/tooltip';


export function SidebarToggle({
  className,
}: ComponentProps<typeof SidebarTrigger>) {
  const { toggleSidebar } = useSidebar();

  return (
    <BetterTooltip content="Toggle Sidebar" align="start">
      <Button
        onClick={toggleSidebar}
        variant="outline"
        className="md:px-2 md:h-fit"
      >
        <SidebarLeftIcon size={16} />
      </Button>
    </BetterTooltip>
  );
}
