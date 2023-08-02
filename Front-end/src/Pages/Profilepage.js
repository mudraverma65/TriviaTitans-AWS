import React, { useState } from 'react';
import { Avatar, Typography, Divider, Button, Select, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import CircleUpload from '../Components/CircleUpload';
import ProfilePicture from '../Components/ProfilePicture';
import Card from 'antd/es/card/Card';

const { Title, Text } = Typography;
const { Option } = Select;

const ProfilePage = () => {
  // User profile state
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [contact, setContact] = useState('Allen John');
  const [editable, setEditable] = useState(false);
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');


  const [profilePic, setProfilePic] = useState('/Users/naveen/DAL/MAY_2023/5401/csci5410_g8/Front-end/src/Assets/Google.png');

  // Handle profile picture change
  const handleProfilePicChange = (info) => {
    if (info.file.status === 'done') {
      // Set the new profile picture
      setProfilePic(info.file.response.url);
    }
  };
  const handleBase64 = (base64) => {
    setProfilePic(base64);
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setEditable(!editable);
  };

  // Save changes
  const saveChanges = () => {
    // Perform API call or update state as needed
    setEditable(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: "#eeeeee"}}>

      <Card style={{ width: '800px', textAlign: 'center', padding: '10px', margin: '10px' }}>
      <h3>User Information</h3>
        <div style={{ marginBottom: '24px' }}>
          {editable ? (
            <CircleUpload handleBase64={handleBase64} />
          ) : (
            <Avatar size={100} src={profilePic} />
          )}
        </div>
      <Divider />

      <div style={{ marginLeft: 16, textAlign: 'left' }}>

        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '8px' }}>Name:</div>
            {editable ? (
                <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            ) : (
                <div>{name}</div>
            )}
        </div>

        <hr />
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '8px' }}>Email:</div>
            {editable ? (
                <Input
                type="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            ) : (
                <div>{email}</div>
            )}
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
            <div style={{ marginRight: '8px' }}>ContactInfo:</div>
            {editable ? (
                <Input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                />
            ) : (
                <div>{contact}</div>
            )}
        </div>
        <hr />
        <div style={{ textAlign: 'center' }}>
        {editable ? (
          <Button type="primary" onClick={saveChanges}>
            Save
          </Button>
        ) : (
          <Button onClick={toggleEdit}>Edit</Button>
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
      </Card>
    </div>
  );
};

export default ProfilePage;
