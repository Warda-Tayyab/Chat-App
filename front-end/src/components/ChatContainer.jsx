import React, { useState, useEffect } from "react";
import { FaUser } from 'react-icons/fa';
import './styling.css';
import ChatLists from './ChatLists';
import UserLogin from './UserLogin';
import socketIOClient from 'socket.io-client';

const socketio = socketIOClient('http://localhost:3000');

const ChatContainer = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [chats, setChats] = useState([]);

  useEffect(() => {
    socketio.on('chat', (chats) => {
      setChats(chats);  // Load initial chat messages from MongoDB
    });
  }, []);

  const sendToSocket = (chat) => {
    socketio.emit('message', chat);
  };

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");
    setUser('');
  };

  return (
    <div className="home">
      {user ? (
        <div className="chat_app">
          <div className="chats_header">
            <h4>Username: {user}</h4>
            <p>
              <FaUser className="chats_icon" /> Chat App
            </p>
            <p className="chats_logout" onClick={Logout}>
              <strong>Logout</strong>
            </p>
          </div>
          <ChatLists chats={chats} />
        </div>
      ) : (
        <UserLogin setUser={setUser} />
      )}
    </div>
  );
};

export default ChatContainer;
