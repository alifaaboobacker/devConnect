import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginModal.css';

function SignUpModal({ isOpen, onClose}){

    const [firstName, setFirstName]=useState('');
    const [lastName, setLastName]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await fetch('/signup',{
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({firstName, lastName, email, password }),
            })
            if(response.ok){
                console.log("signup successfull");
                onClose();
                navigate('/user/feed');
            }
        }
        catch (error) {
            console.error('Signup error:', error);
            setErrorMessage('An error occurred. Please try again.');
        }
 
        }
        return(
            isOpen && (
                <div className="modal-overlay">
        <div className="modal-content">
          <button type="button" onClick={onClose} className="close-button">
            <i className="fas fa-times"></i>
          </button>

          <h2>Welcome</h2>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <div className="form-content">
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
             
              <div className="buttonGroup">
                <button type="submit" className="login">Log In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
            )
        )
    }
export default SignUpModal;