import React, { useState, useEffect } from "react";

const PoliceManagement = () => {
  const [policeList, setPoliceList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    rank: "",
    station: "",
    email: "",
    phone: "",
  });

  // Use VITE_API_URL from .env (frontend calls port 2001)
  const baseURL = import.meta.env.VITE_API_URL;

  // Fetch all police data
  const fetchPolice = async () => {
    const response = await fetch(`${baseURL}/view`);
    const data = await response.json();
    setPoliceList(data);
  };

  useEffect(() => {
    fetchPolice();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseURL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Police added successfully!");
      setFormData({
        name: "",
        rank: "",
        station: "",
        email: "",
        phone: "",
      });
      fetchPolice();
    } else {
      alert("Failed to add police!");
    }
  };

  const deletePolice = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    const response = await fetch(`${baseURL}/delete/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Police deleted successfully!");
      fetchPolice();
    } else {
      alert("Failed to delete police!");
    }
  };

  return (
    <div className="container">
      <h1>🚔 Police Management System</h1>

      <div className="form-section">
        <h2>Add Police Officer</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="rank" placeholder="Rank" value={formData.rank} onChange={handleChange} required />
          <input type="text" name="station" placeholder="Station" value={formData.station} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="number" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
          <button type="submit">Add Police</button>
        </form>
      </div>

      <div className="list-section">
        <h2>All Police Officers</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Rank</th><th>Station</th><th>Email</th><th>Phone</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {policeList.length > 0 ? policeList.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td><td>{p.name}</td><td>{p.rank}</td><td>{p.station}</td><td>{p.email}</td><td>{p.phone}</td>
                <td><button className="delete-btn" onClick={() => deletePolice(p.id)}>Delete</button></td>
              </tr>
            )) : (
              <tr><td colSpan="7">No data available</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .container { max-width: 900px; margin: 30px auto; padding: 20px; background: #f9f9f9; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        h1 { text-align: center; color: #003366; margin-bottom: 30px; }
        .form-section { background: #e6f0ff; padding: 20px; border-radius: 10px; margin-bottom: 30px; }
        form { display: flex; flex-wrap: wrap; gap: 10px; }
        input { flex: 1 1 calc(33.33% - 10px); padding: 10px; border-radius: 5px; border: 1px solid #ccc; }
        button { background-color: #007bff; color: white; padding: 10px 15px; border: none; border-radius: 5px; cursor: pointer; transition: 0.3s; }
        button:hover { background-color: #0056b3; }
        .list-section { margin-top: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 10px; border-bottom: 1px solid #ccc; text-align: center; }
        th { background: #003366; color: white; }
        .delete-btn { background-color: #ff4d4d; }
        .delete-btn:hover { background-color: #cc0000; }
        @media (max-width: 768px) { input { flex: 1 1 100%; } }
      `}</style>
    </div>
  );
};

export default PoliceManagement;
