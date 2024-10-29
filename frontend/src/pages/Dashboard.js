// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const [matches, setMatches] = useState([]);
  const [requests, setRequests] = useState([]);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('/user/feed?page=1&limit=20', { credentials: 'include' });
        if(response.ok){
        const data = await response.json();
        setMatches(data.data); 
        }
        else if(response.status===401){
          navigate('/')
        }// Set `data` from feed response
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    const fetchRequests = async () => {
      try {
        const response = await fetch('/user/requests', { credentials: 'include' });
        if(response.ok){
        const data = await response.json();
        setRequests(data.data);
        }
        else if(response.status===401){
          navigate('/')
        }
         // Set `data` from requests response
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    const fetchConnections = async () => {
      try {
        const response = await fetch('/user/connections', { credentials: 'include' });
        if(response.ok){
        const data = await response.json();
        setConnections(data.data); 
        }
        else if(response.status===401){
          navigate('/')
        }// Set `data` from connections response
      } catch (error) {
        console.error('Error fetching connections:', error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchMatches(), fetchRequests(), fetchConnections()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
        const response = await fetch('/signout', { method: 'POST', credentials: 'include' });
        if (response.ok) {
            // Redirect to home or login page
            navigate('/'); // Adjust as necessary
        } else {
            console.error('Logout failed');
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

  // const handleSendInterest = (userId) => {
  //   // Implement interest sending logic here
  //   console.log("Interest sent to user:", userId);
  // };

  // const handleIgnore = (userId) => {
  //   // Implement ignore logic here
  //   console.log("Ignored user:", userId);
  // };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {/* Navbar Section */}
      <nav className="navbar">
        <h1>DevConnect</h1>
        <div className="nav-buttons">
          <button >Interests</button>
          <button >Connections</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className="dashboard-container">
        {/* Main Dashboard Content */}
        <section>
          <h2>Your Matches</h2>
          <div className="cards">
            {matches.map((match) => (
              <div className="card" key={match._id}>
                <h3>{match.firstName} {match.lastName}</h3>
                <p>{match.about}</p>
                <p>Age: {match.age}, Gender: {match.gender}</p>
                <div className="card-buttons">
                  <button
                    className="send-interest"
                  
                  >
                    Send Interest
                  </button>
                  <button
                    className="ignore"
                  
                  >
                    Ignore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
