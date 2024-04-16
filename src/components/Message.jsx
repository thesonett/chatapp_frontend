import React from "react";
import './Message.css';

export default function Message({ message }) {
  return (
    <div className="messageBox">
        {message}
    </div>
  )
}
