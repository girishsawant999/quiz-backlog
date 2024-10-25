import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

const PrivateLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative w-full h-svh overflow-hidden grid py-6 px-8">
        {children}
      </main>
    </SidebarProvider>
  );
};

export default PrivateLayout;
