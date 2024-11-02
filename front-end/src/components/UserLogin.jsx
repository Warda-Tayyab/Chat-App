import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import _ from 'lodash';
import '../style.css';

const UserLogin = ({ setUser }) => {
  const [Username, setUserName] = useState("");

  const handleUser = () => {
    if (!Username.trim()) return; // Prevent empty usernames
    localStorage.setItem('user', Username);
    setUser(Username);

    // Generate a random avatar once on login
    const avatarUrl = `https://picsum.photos/id/${_.random(1, 1000)}/200/300`;
    localStorage.setItem('avatar', avatarUrl);
  };

  return (
    <div className="login_wrapper">
      <div className="login_container">
        <div className="login_title">
          <FaUser className="login_icon" />
          <h1>Chat App</h1>
        </div>
        <div className="login_form">
          <input
            type="text"
            placeholder="Enter a Unique Name"
            value={Username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={handleUser}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
