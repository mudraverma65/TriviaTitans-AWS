import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import '../Styles/Profile.css';
import { Avatar, Typography, Divider, Button, Select, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import CircleUpload from '../Components/CircleUpload';
import ProfilePicture from '../Components/ProfilePicture';
import axios from 'axios';
import Card from 'antd/es/card/Card';
import ChatBot from '../Components/Chatbot';
import { getCurrentUser, updateUserAttributes } from "../Services/auth"


export default function UserProfile() {
  const [user, setUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(user ? user.phone_number : '');
  const [gender, setGender] = useState(user ? user.gender : '');
  const [address, setAddress] = useState(user ? user.address : '');
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const [editable, setEditable] = useState(false);
  const [editProfilePicButton, setEditProfilePicButton] = useState(false);
  const [profilePic, setProfilePic] = useState('');


  useEffect(() => {
    // Fetch data from DynamoDB using the email
    const fetchProfilePicData = async () => {

  axios.get("https://xqip2gdlbl6gadeqekbubaqhjm0mvvwh.lambda-url.us-east-1.on.aws/?email="+user.email)
  .then(response => {
    // Handle the response data
    console.log('sdfsdfsdf', response.data);
    if (response.status === 200) {
    setProfilePic(response.data.profile_pic_base64);
    }
    else{
      setProfilePic(null);
    }

  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
    setProfilePic(null);
  });
};

    if(user){
 fetchProfilePicData();
    }
   
  }, [user.email]);

  // Handle profile picture change
  const handleProfilePicChange = (info) => {
    if (info.file.status === 'done') {
      // Get the image file from the response
      const imageFile = info.file.originFileObj;

      // Create a FileReader to read the image file and convert it to base64
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);

      reader.onloadend = () => {
        // Get the base64 string from the FileReader result
        const base64String = reader.result.split(',')[1];
        // Update the state with the new base64 string
        setProfilePic(base64String);

      };
    }
  };
  const handleBase64 = (base64) => {
    setProfilePic(base64);
    console.log(base64);
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setEditable(true);
  };
  const profilePicEditButton = () => {
    setEditProfilePicButton(true);
  }
  const profilePicSaveButton = async () => {
    console.log("Sending data to dynamo DB");
    console.log(profilePic);
    try {
      const response = await fetch('https://xqip2gdlbl6gadeqekbubaqhjm0mvvwh.lambda-url.us-east-1.on.aws/', {
        method: 'POST',
        body: JSON.stringify({ email: user.email, profile_pic_base64: profilePic }), // Convert the user email to JSON string and include it in the request body
      });

      if (response.status === 200) {
        console.log('User data saved successfully.');
        setEditProfilePicButton(false);
        console.log("Send data to dynamo DB");
        console.log(profilePic);
      } else {
        console.error('Failed to save user data.');
      }
    } catch (error) {
      console.error('Error sending user data:', error);
    }
  }
  const profilePicCancelButton = () => {
    setEditProfilePicButton(false);
  }

  // Save changes
  const saveChanges = () => {
    // Perform API call or update state as needed
    setEditable(false);
  };

  const handleCancleForm = () => {
    setEditable(false);
  }

  const handleUserForm = async (e) => {
    e.preventDefault();
    if (saving) return; // Prevent multiple saves while one is already in progress
    setSaving(true);
    if (gender !== '' && phoneNumber !== '' && address !== '') {
      console.log(gender);
      console.log(phoneNumber);
      console.log(address);
      const userAttributes = [
        { Name: 'name', Value: user.name },
        { Name: 'email', Value: user.email },
        { Name: 'gender', Value: gender },
        { Name: 'phone_number', Value: phoneNumber },
        { Name: 'address', Value: address },
      ]
      console.log(userAttributes)
      try {
        await updateUserAttributes(userAttributes);
        setEditable(false);
      } catch (error) {
        console.error('Error updating user data:', error);
      } finally {
        setSaving(false);
      }
    }
  };

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
        

        setGender(user ? user.gender : '');
        setPhoneNumber(user ? user.phone_number : '');
        setAddress(user ? user.address : '');
        //if user data as only email and nothing else
        // if (user && user.email && Object.keys(user).length === 6) {
        //   // Check if the user data contains 'gender', 'address', and 'phone_number'
        //   if (user.gender && user.address && user.phone_number) {
        //     // showButton(false)
        //     console.log((user.gender && user.address && user.phone_number));
        //   }
        // }
      } catch (err) {
        console.error(err)
      }
    }

    fetchUser()
  }, [])

  return (
    <>
      <Header />
      <ChatBot/>
      {isLoggedIn ? (
        <div>
          {user ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: "#eeeeee" }}>

                <Card style={{ width: '800px', textAlign: 'center', padding: '10px', margin: '10px' }}>
                  <h3>User Information</h3>
                  <div style={{ marginBottom: '24px' }}>
                    {editProfilePicButton ? (
                      <CircleUpload handleBase64={handleBase64} />
                    ) : (
                      <Avatar size={100} src={profilePic} />
                    )}
                  </div>
                  {editProfilePicButton ? (
                    <div>
                      <Button type="primary" onClick={profilePicSaveButton}>
                        Save
                      </Button>
                      <Button type="primary" onClick={profilePicCancelButton}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={profilePicEditButton} >Edit</Button>
                  )}
                  <Divider />

                  <div style={{ marginLeft: 16, textAlign: 'left' }}>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ marginRight: '8px' }}>Name:</div>
                      {/* {editable ? (
                        <Input
                          type="text"
                          value={user.name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      ) : ( */}
                      <div>{user.name}</div>
                      {/* )} */}
                    </div>

                    <hr />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ marginRight: '8px' }}>Email:</div>
                      {/* {editable ? (
                        <Input
                          type="Email"
                          value={user.emai}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      ) : ( */}
                      <div>{user.email}</div>
                      {/* )} */}
                    </div>
                    <hr />

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ marginRight: '8px' }}>Gender:</div>
                      {editable ? (
                        <Input
                          type="text"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        />
                      ) : (
                        <div>{gender}</div>
                      )}
                    </div>
                    <hr />

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ marginRight: '8px' }}>Address:</div>
                      {editable ? (
                        <Input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      ) : (
                        <div>{address}</div>
                      )}
                    </div>
                    <hr />

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ marginRight: '8px' }}>PhoneNo:</div>
                      {editable ? (
                        <Input
                          type="text"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      ) : (
                        <div>{phoneNumber}</div>
                      )}
                    </div>
                    <hr />
                    <div style={{ textAlign: 'center' }}>
                      {editable ? (
                        <div>
                          <Button type="primary" onClick={handleUserForm}>
                            Save
                          </Button>
                          <Button type="primary" onClick={handleCancleForm}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button onClick={toggleEdit} >Edit</Button>
                      )}
                    </div>
                  </div>
                  <Divider />
                  <div style={{}}></div>
                  <div style={{ marginTop: '24px' }}>
                    <h3>User Statistics</h3>
                    <p>Games Played: 12 </p>
                    <p>Win/Loss Ratio: 11/12</p>
                    <p>Total Points Earned: 220</p>
                  </div>
                  <Divider />

                  <div>
                    <div style={{ marginTop: '24px' }}>
                      <h3>Teams</h3>
                      <ol>
                        <li>
                          HIMANSHU
                        </li>
                        <li>
                          ATHENA
                        </li>
                      </ol>
                    </div>
                  </div>
                  <Divider />

                  <div style={{ marginTop: '24px' }}>
                    <h3>Achievements</h3>
                    <p>Highest Score: 90</p>
                    <p>Most Wins: 11</p>
                    <p>Total Points: 220</p>
                  </div>
                  <Divider />


                  <div style={{ marginTop: '24px' }}>
                    <h3>Team Members</h3>
                    <p>Team Name: HeartPirates</p>
                    <p>Members: 4</p>
                    <p>1. John Law</p>
                    <p>2. Ethan Law</p>
                    <p>3. Mike Law</p>
                    <p>4. Rob Law</p>
                  </div>
                  <Divider />
                </Card>
              </div>
              {/* ) : (
              <ProfilePage />
              )} */}
            </div>
          ) : (
            <p>Loding User Data</p>
          )}
        </div>
      ) : (
        <div>
          <p className='error-message'>You are not Logged In!!</p>
          <a
            className='loginFirst'
            href='https://titans.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=5cm5p1n8m11vvclk312lifshs1&redirect_uri=http://localhost:3000'
            onClick={() => navigate('/logout')}
          >
            Login
          </a>
        </div>
      )}
    </>

  )
}