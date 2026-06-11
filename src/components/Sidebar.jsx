import {
    FaUsers,
    FaUserPlus,
    FaChartBar,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="w-64 h-screen bg-slate-900 p-6 fixed">

            <h1 className="text-2xl font-bold text-teal-400 mb-10">
                LeadFlow CRM
            </h1>

            <div className="space-y-6 text-lg">

                <Link
                    to="/"
                    className="flex items-center gap-3 hover:text-cyan-400 transition"
                >
                    <FaUsers />
                    Dashboard
                </Link>

                <Link
                    to="/add-lead"
                    className="flex items-center gap-3 hover:text-cyan-400 transition"
                >
                    <FaUserPlus />
                    Add Lead
                </Link>

                <Link
                    to="/analytics"
                    className="flex items-center gap-3 hover:text-cyan-400 transition"
                >
                    <FaChartBar />
                    Analytics
                </Link>

            </div>
        </div>
    );
}

export default Sidebar;