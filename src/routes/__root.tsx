import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { AppHeader } from "@/components/app-header";
import { NotFound } from "@/components/not-found";

export const Route = createRootRoute({
	component: RootLayout,
	notFoundComponent: NotFound,
});

function RootLayout() {
	const location = useLocation();
	const isLanding = location.pathname === "/";
	const isAuth = location.pathname === "/auth";
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	if (isLanding || isAuth) {
		return <Outlet />;
	}

	return (
		<div className="relative flex h-screen overflow-hidden bg-background p-3 gap-3">
			{/* Decorative arcane grid */}
			<div className="pointer-events-none fixed inset-0 -z-10 arcane-grid opacity-[0.05]" />
			
			<Sidebar isOpen={isSidebarOpen} />
			
			<div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-border/60 bg-card/30 shadow-2xl shadow-black/20 backdrop-blur-md">
				<AppHeader 
					isSidebarOpen={isSidebarOpen} 
					onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
				/>
				<main className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden scrollbar-none">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
