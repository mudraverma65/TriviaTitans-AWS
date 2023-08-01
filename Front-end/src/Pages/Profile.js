import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import '../Styles/Profile.css';

import { getCurrentUser } from "../Services/auth"

export default function UserProfile() {
  const [user, setUser] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    if (localStorage.getItem('token')) {
            setIsLoggedIn(true);
            
      }

    const fetchUser = async () => {
      try {
        const user = await getCurrentUser()
        console.log(user);
        setUser(user)
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userName', user.name);
        
      } catch (err) {
        console.error(err)
      }
    }

    fetchUser()
  }, [])

  return (
    <>
    <Header/>
    { isLoggedIn ?
    <div>
      {user && (
        <div>
          <h2>User Profile</h2>
          <p>Username: {user.name}</p>
          <p>Email: {user.email}</p>
          
        </div>
      )}
    </div> : 
    
    <div>
        <p className='error-message'>You are not Logged In!!</p>
        <a className='loginFirst' href='https://titans.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=5cm5p1n8m11vvclk312lifshs1&redirect_uri=http://localhost:3000' onClick={() => navigate('/logout')}>Login</a>
    </div>
     }
    </>
  )
}