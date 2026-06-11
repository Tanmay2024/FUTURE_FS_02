import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

function Analytics({ leads }) {
    const newLeads = leads.filter(
        (lead) => lead.status === "New"
    ).length;

    const contacted = leads.filter(
        (lead) => lead.status === "Contacted"
    ).length;

    const converted = leads.filter(
        (lead) => lead.status === "Converted"
    ).length;

    const total = leads.length;

    const conversionRate =
        total > 0
            ? ((converted / total) * 100).toFixed(1)
            : 0;

    const data = [
        { name: "New", value: newLeads },
        { name: "Contacted", value: contacted },
        { name: "Converted", value: converted },
    ];

    const COLORS = [
        "#eab308",
        "#3b82f6",
        "#22c55e",
    ];

    return (
        <div className="p-10">
            <h1 className="text-5xl font-bold text-cyan-400 mb-10">
                Analytics
            </h1>

            <div className="grid lg:grid-cols-2 gap-8">

                {/* Pie Chart */}
                <div className="bg-slate-800 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6">
                        Lead Distribution
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={350}
                    >
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                outerRadius={120}
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="bg-slate-800 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6">
                        Lead Status Overview
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={350}
                    >
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />

                            <Bar
                                dataKey="value"
                                fill="#06b6d4"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-4 gap-6 mt-10">

                <div className="bg-yellow-500/20 p-6 rounded-2xl">
                    <h3 className="text-yellow-400 text-xl">
                        New Leads
                    </h3>

                    <p className="text-4xl font-bold mt-3">
                        {newLeads}
                    </p>
                </div>

                <div className="bg-blue-500/20 p-6 rounded-2xl">
                    <h3 className="text-blue-400 text-xl">
                        Contacted
                    </h3>

                    <p className="text-4xl font-bold mt-3">
                        {contacted}
                    </p>
                </div>

                <div className="bg-green-500/20 p-6 rounded-2xl">
                    <h3 className="text-green-400 text-xl">
                        Converted
                    </h3>

                    <p className="text-4xl font-bold mt-3">
                        {converted}
                    </p>
                </div>

                <div className="bg-emerald-500/20 p-6 rounded-2xl">
                    <h3 className="text-emerald-400 text-xl">
                        Conversion Rate
                    </h3>

                    <p className="text-4xl font-bold mt-3">
                        {conversionRate}%
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Analytics;