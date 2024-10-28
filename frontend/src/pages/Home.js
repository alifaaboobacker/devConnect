import React, { useState } from 'react';
import '../styles/Home.css';
import LoginModal from '../components/LoginModal'; 

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleLoginClick = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    return (
      <div className="home-container">
        <header className="header">
          <h1>DevConnect</h1>
          <nav>
            <button className="login-button" onClick={handleLoginClick}>Log In</button>
          </nav>
        </header>
        <main className="main-content">
          <div className="content">
            <h2>Connect with Developers Worldwide</h2>
            <p>
              Join the community of developers, collaborate on projects, and enhance your skills.
            </p>
            <button className="signup-button">Create Account</button>
          </div>
        </main>
        <footer className="footer">
          <p>© 2024 DevConnect. All Rights Reserved.</p>
        </footer>
  
        {/* Render the login modal */}
        <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    );
  }
  

export default Home;