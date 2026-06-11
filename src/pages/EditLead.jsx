import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function EditLead({ leads, updateLead }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const existingLead = leads.find(
        (lead) => lead.id === Number(id)
    );

    console.log("ID =", id);
    console.log("Lead =", existingLead);
    const [lead, setLead] = useState(
        existingLead || {
            id: "",
            name: "",
            company: "",
            email: "",
            status: "New",
        }
    );

    const handleChange = (e) => {
        setLead({
            ...lead,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        updateLead(lead);

        navigate("/");
    };

    return (
        <div className="p-10">
            <h1 className="text-5xl font-bold text-cyan-400 mb-8">
                Edit Lead
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-slate-800 p-8 rounded-2xl max-w-2xl"
            >
                <input
                    name="name"
                    value={lead.name}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded bg-slate-700"
                />

                <input
                    name="company"
                    value={lead.company}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded bg-slate-700"
                />

                <input
                    name="email"
                    value={lead.email}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded bg-slate-700"
                />

                <select
                    name="status"
                    value={lead.status}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded bg-slate-700"
                >
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Converted</option>
                </select>

                <button
                    type="submit"
                    className="bg-cyan-500 px-6 py-3 rounded-lg"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default EditLead;