import { useState } from "react";
import { Link } from "react-router-dom";

function Dashboard({ leads, deleteLead }) {
    const [search, setSearch] = useState("");

    const filteredLeads = leads.filter(
        (lead) =>
            lead.name.toLowerCase().includes(search.toLowerCase()) ||
            lead.company.toLowerCase().includes(search.toLowerCase()) ||
            lead.email.toLowerCase().includes(search.toLowerCase())
    );

    const total = leads.length;

const newLeads = leads.filter(
    (lead) => lead.status === "New"
).length;

const contacted = leads.filter(
    (lead) => lead.status === "Contacted"
).length;

const converted = leads.filter(
    (lead) => lead.status === "Converted"
).length;

const cards = [
    {
        title: "Total Leads",
        value: total,
        color: "bg-blue-500/20 text-blue-400",
    },
    {
        title: "New Leads",
        value: newLeads,
        color: "bg-yellow-500/20 text-yellow-400",
    },
    {
        title: "Contacted",
        value: contacted,
        color: "bg-purple-500/20 text-purple-400",
    },
    {
        title: "Converted",
        value: converted,
        color: "bg-green-500/20 text-green-400",
    },
];

    const exportToCSV = () => {
        const headers = [
            "Name",
            "Company",
            "Email",
            "Status"
        ];

        const rows = leads.map((lead) => [
            lead.name,
            lead.company,
            lead.email,
            lead.status,
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map((row) => row.join(","))
        ].join("\n");

        const blob = new Blob(
            [csvContent],
            { type: "text/csv" }
        );

        const url =
            window.URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;
        link.download = "leads.csv";

        link.click();

        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 px-6">
            <h2 className="text-4xl font-bold text-cyan-400 mb-8">
                Dashboard
            </h2>

            {/* Dashboard Cards */}
            <div className="grid md:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-2xl shadow-lg ${card.color}`}
                    >
                        <h3 className="text-gray-300">
                            {card.title}
                        </h3>

                        <p className="text-4xl font-bold mt-3">
                            {card.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="mt-10">
                <input
                    type="text"
                    placeholder="Search Leads..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="
                    w-full
                    md:w-96
                    p-3
                    rounded-lg
                    bg-slate-700
                    text-white
                    outline-none
                    "
                />
                <button
                    onClick={() => {
                        if (window.confirm("Delete all leads?")) {
                            localStorage.removeItem("leads");
                            window.location.reload();
                        }
                    }}
                    className="
                             bg-red-500
                             hover:bg-red-600
                             px-4
                             py-2
                             rounded-lg
                             ml-4
                            "
                >
                    Clear All
                </button>

                <button
                    onClick={exportToCSV}
                    className="
                             bg-green-500
                             hover:bg-green-600
                             px-4
                             py-2
                             rounded-lg
                             ml-4
                           "
                >
                    Export CSV
                </button>
            </div>

            {/* Recent Leads */}
            <div className="mt-8">
                <h2 className="text-3xl font-bold text-cyan-400 mb-6">
                    Recent Leads
                </h2>

                <div className="bg-slate-800 rounded-2xl p-6 overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-700">
                                <th className="text-left py-3">Name</th>
                                <th className="text-left py-3">Company</th>
                                <th className="text-left py-3">Email</th>
                                <th className="text-left py-3">Status</th>
                                <th className="text-left py-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredLeads.map((lead, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-slate-700"
                                >
                                    <td className="py-4">
                                        {lead.name}
                                    </td>

                                    <td>
                                        {lead.company}
                                    </td>

                                    <td>
                                        {lead.email}
                                    </td>

                                    <td>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm text-white ${lead.status === "New"
                                                ? "bg-yellow-500"
                                                : lead.status === "Contacted"
                                                    ? "bg-blue-500"
                                                    : "bg-green-500"
                                                }`}
                                        >
                                            {lead.status}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="flex gap-2">

                                            <Link
                                                to={`/edit-lead/${lead.id}`}
                                                className="
                                                      bg-blue-500
                                                      px-3
                                                      py-1
                                                      rounded
                                                      text-white
                                                     "
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    deleteLead(lead.email)
                                                }
                                                className="
                                                       bg-red-500
                                                       px-3
                                                       py-1
                                                       rounded
                                                       text-white
                                    "
                                            >
                                                Delete
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredLeads.length === 0 && (
                        <p className="text-center text-gray-400 py-6">
                            No leads found
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;