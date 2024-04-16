import React, { useEffect, useMemo, useState } from 'react';
import io from "socket.io-client";
import './Chat.css';
import Message from './Message';
import ReactScrollToBottom from "react-scroll-to-bottom";
import { toast } from "react-hot-toast";

export default function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const socket = useMemo(()=> io("https://chatapp-backend-04xm.onrender.com"), []);

    const submitHandler = (e) => {
        e.preventDefault();

        socket.emit("message", message);
        setMessage("");
    }

    useEffect(()=> {
        socket.on("connect", ()=> {});

        socket.emit('joined', {user: "User"});

        socket.on('joined', (data)=> { 
            toast.success(data);
        })

        socket.on("welcome", (data)=> { 
            toast.success(data); 
        })

        socket.on("leave", (data)=> { 
            toast.error(data);
        })

        socket.on("message", (data)=> { 
            setMessages(prevMessages => [...prevMessages, data])
        })

        return ()=> {
            socket.disconnect();
            socket.off();
        }
    }, []);

    return (
        <div className='chatPage'>
            <div className='chatContainer'>
                <div className='header'>
                    <span>Anonymous Chat Room</span>
                </div>
                <ReactScrollToBottom className='chatBox'>
                    {
                        messages.map((item, index)=> <Message key={index} message={item}/>)
                    }
                </ReactScrollToBottom>
                <div className='inputBox'>
                    <input type="text" value={message} id='chatInput' onChange={(e)=> setMessage(e.target.value)} placeholder='message'/>
                    <button className='sendBtn' onClick={submitHandler}>Send</button>
                </div>
            </div>
        </div>
    )
}
