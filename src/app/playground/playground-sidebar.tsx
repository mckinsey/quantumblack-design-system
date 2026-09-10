import {
  type NavId,
  primaryNav,
  utilityNav,
} from '@/app/demo/[name]/ui/sidebar-demo-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarNav,
  SidebarNavIconButton,
  SidebarNavRail,
  SidebarNavUtilityButton,
  SidebarProvider,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';

const basePath = import.meta.env.VITE_BASE_PATH ?? '';

const playgroundUtilityNav = utilityNav.filter(item => item.label !== 'Theme');

function NavRail({
  active,
  onActive,
}: {
  active: NavId;
  onActive: (id: NavId) => void;
}) {
  const { size } = useSidebar();
  const iconSize = size === 'lg' ? 'lg' : 'default';

  return (
    <SidebarNavRail>
      <SidebarHeader>
        <SidebarMenu>
          {primaryNav.map(item => {
            const isActive = active === item.id;

            return (
              <SidebarMenuItem key={item.id}>
                <SidebarNavIconButton
                  isActive={isActive}
                  tooltip={item.label}
                  onClick={() => onActive(item.id)}>
                  <IconShell
                    size={iconSize}
                    variant={isActive ? 'primary' : 'secondary'}>
                    <Icon icon={item.icon} />
                  </IconShell>
                </SidebarNavIconButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarHeader>
      <SidebarFooter>
        <SidebarSeparator className="mb-4" />
        <SidebarMenu className="items-center gap-4">
          {playgroundUtilityNav.map(item => (
            <SidebarMenuItem key={item.label}>
              <SidebarNavUtilityButton tooltip={item.label}>
                <IconShell size="default" hoverable>
                  <Icon icon={item.icon} />
                </IconShell>
              </SidebarNavUtilityButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarSeparator className="mt-4 mb-6" />
        <div className="flex justify-center">
          <Avatar size="sm">
            <AvatarImage src={`${basePath}/users/avatar-1.jpg`} />
            <AvatarFallback>PP</AvatarFallback>
          </Avatar>
        </div>
      </SidebarFooter>
    </SidebarNavRail>
  );
}

export function PlaygroundSidebar({
  activeNav,
  onActiveNavChange,
}: {
  activeNav: NavId;
  onActiveNavChange: (nav: NavId) => void;
}) {
  return (
    <SidebarProvider layout="nav" defaultOpen className="h-full min-h-0 w-auto">
      <SidebarNav>
        <NavRail active={activeNav} onActive={onActiveNavChange} />
      </SidebarNav>
    </SidebarProvider>
  );
}

export { primaryNav };
