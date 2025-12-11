
import { NAVBAR_HEIGHT } from "@/lib/constants";
import Navbar from "@/components/Navbar";

const DashboardLayout = () => {
    return <div>
        <Navbar />
        <div style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>
            <main className="flex">

            </main>
        </div>
    </div>;
};