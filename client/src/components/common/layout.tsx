"use client";

import { usePathname } from "next/navigation";
import Navbar from "../Navbar";

const pathsNotShowHeaders = ["/login", "/register"];

function CommonLayout({ children }: { children: React.ReactNode }) {
    const pathName = usePathname();

    const showHeader = !pathsNotShowHeaders.some((currentPath) =>
        pathName.startsWith(currentPath)
    );

    //   const showFooter = !pathsNotShowHeaders.some((currentPath) =>
    //     pathName.startsWith(currentPath)
    //   );

    return (
        <div className="min-h-screen bg-gray-50">
            {showHeader && <Navbar />}
            <main>{children}</main>
            {/* {showFooter && <Footer />} */}
        </div>
    );
}

export default CommonLayout;
