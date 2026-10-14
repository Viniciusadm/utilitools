
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/nav-link";
import { groupToolsByCategory } from "@/lib/nav-tools";
import { House } from "lucide-react";

const linkClassName =
  "flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors [&>svg]:text-muted-foreground";
const activeLinkClassName =
  "bg-primary/10 text-primary font-medium hover:bg-primary/10 hover:text-primary [&>svg]:text-primary";

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas" className="border-r border-sidebar-border">
      <SidebarContent className="bg-sidebar scrollbar-sidebar py-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink href="/" end className={linkClassName} activeClassName={activeLinkClassName}>
                    <House className="h-4 w-4" />
                    <span>Página inicial</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {groupToolsByCategory().map(({ category, tools }) => (
          <SidebarGroup key={category}>
            <SidebarGroupLabel className="px-3 text-xs font-semibold text-foreground/70">{category}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {tools.map((tool) => (
                  <SidebarMenuItem key={tool.url}>
                    <SidebarMenuButton asChild>
                      <NavLink href={tool.url} end className={linkClassName} activeClassName={activeLinkClassName}>
                        <tool.icon className="h-4 w-4" />
                        <span>{tool.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
