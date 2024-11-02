import React, { useEffect, useRef, useState } from 'react';
import './styling.css';
import InputText from './InputText';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000");

const ChatLists = ({ chats }) => {
  const user = localStorage.getItem('user');
  const [messages, setMessages] = useState(chats);
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.on("message", (messageData) => {
      if (messageData.user !== user) {
        setMessages((prevMessages) => [...prevMessages, messageData]);
      }
    });

    return () => {
      socket.off("message");
    };
  }, [user]);

  const addMessage = (messageData) => {
    socket.emit("message", messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const SenderChat = ({ message, username, avatar }) => (
    <div className="chat_sender">
      <img src={avatar} alt="Avatar" />
      <p>
        <strong>{username}</strong> <br />
        {message}
      </p>
    </div>
  );

  const ReceiverChat = ({ message, username, avatar }) => (
    <div className="chat_receiver">
      <img src={avatar} alt="Avatar" />
      <p>
        <strong>{username}</strong> <br />
        {message}
      </p>
    </div>
  );

  return (
    <div className="chat_container">
      {messages.map((chat, index) => (
        chat.user === user ? (
          <SenderChat key={index} message={chat.message} username={chat.user} avatar={chat.avatar} />
        ) : (
          <ReceiverChat key={index} message={chat.message} username={chat.user} avatar={chat.avatar} />
        )
      ))}
      <div ref={bottomRef} />
      <InputText addMessage={addMessage} />
    </div>
  );
};

export default ChatLists;
