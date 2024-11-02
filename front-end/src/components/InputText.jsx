import React, { useState } from "react";
import './styling.css';

const InputText = ({ addMessage }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim()) {
      addMessage({
        message,
        user: localStorage.getItem('user'),
        avatar: localStorage.getItem('avatar')
      });
      setMessage("");
    }
  };

  return (
    <div className="inputtext_container">
      <textarea
        name="message"
        id="message"
        rows="3"
        placeholder="Input Message ..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default InputText;
