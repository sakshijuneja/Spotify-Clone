import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

    const logout = () =>{
        alert("Bye! Come Back Soon ;)");
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        navigate('/'); // Navigate to the login page after logout

        window.location.reload();
    }
  return (
    <div>
      <button className="Log-out" onClick={logout}>
            Log Out
          </button> 
    </div>
  )
}
