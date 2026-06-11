import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddLead({ addLead }) {
    const [lead, setLead] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        status: "New",
    });

    const handleChange = (e) => {
        setLead({
            ...lead,
            [e.target.name]: e.target.value,
        });
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        addLead(lead);

        setLead({
            name: "",
            company: "",
            email: "",
            phone: "",
            status: "New",
        });

        alert("Lead Added Successfully!");

        navigate("/");
    };
    return (
        <div className="p-10">
            <h1 className="text-5xl font-bold text-cyan-400 mb-8">
                Add New Lead
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-slate-800 p-8 rounded-2xl max-w-2xl"
            >
                <div className="mb-5">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={lead.name}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-slate-700 mt-2"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label>Company</label>
                    <input
                        type="text"
                        name="company"
                        value={lead.company}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-slate-700 mt-2"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={lead.email}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-slate-700 mt-2"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={lead.phone}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-slate-700 mt-2"
                    />
                </div>

                <div className="mb-5">
                    <label>Status</label>
                    <select
                        name="status"
                        value={lead.status}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-slate-700 mt-2"
                    >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold transition"
                >
                    Add Lead
                </button>
            </form>
        </div>
    );
}

export default AddLead;