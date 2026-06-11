import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AddLead from "./pages/AddLead";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Analytics from "./pages/Analytics";
import EditLead from "./pages/EditLead";

function App() {
  const [leads, setLeads] = useState(() => {
    const savedLeads = localStorage.getItem("leads");

    return savedLeads
      ? JSON.parse(savedLeads)
      : [
        {
          id: 1,
          name: "John Doe",
          company: "ABC Ltd",
          email: "john@gmail.com",
          status: "New",
        },
        {
          id: 2,
          name: "Sarah Wilson",
          company: "Tech Corp",
          email: "sarah@gmail.com",
          status: "Contacted",
        },
        {
          id: 3,
          name: "David Lee",
          company: "Startup Inc",
          email: "david@gmail.com",
          status: "Converted",
        },
      ];
  });

  const addLead = (newLead) => {
    setLeads([
      ...leads,
      {
        ...newLead,
        id: Date.now(),
      },
    ]);
  };

  const deleteLead = (email) => {
    setLeads(
      leads.filter((lead) => lead.email !== email)
    );
  };

  const updateLead = (updatedLead) => {
    setLeads(
      leads.map((lead) =>
        lead.id === updatedLead.id
          ? updatedLead
          : lead
      )
    );
  };

  useEffect(() => {
    localStorage.setItem(
      "leads",
      JSON.stringify(leads)
    );
  }, [leads]);

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full">
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                leads={leads}
                deleteLead={deleteLead}
              />
            }
          />

          <Route
            path="/add-lead"
            element={<AddLead addLead={addLead} />}
          />

          <Route
            path="/analytics"
            element={<Analytics leads={leads} />}
          />

          <Route
            path="/edit-lead/:id"
            element={
              <EditLead
                leads={leads}
                updateLead={updateLead}
              />
            }
          />

        </Routes>
      </div>
    </div>
  );
}

export default App;