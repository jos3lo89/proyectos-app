import { AppSidebar } from "@/components/sidebar/AppSidebar";
import SideBarNavMenu from "@/components/sidebar/SidebarNavMenu";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SideBarNavMenu />
        <section className="p-4">{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default PrivateLayout;
