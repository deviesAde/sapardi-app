import AppLogoSidebar from "./app-logo-sidebar";

export default function AppLogo() {
    return (
        <>
            <AppLogoSidebar />

            <div className="grid flex-1 text-left text-sm">
                <span className="text-[#F4D793] mb-0.5 truncate leading-none font-bold">SAPARDI</span>
            </div>
        </>
    );
}
