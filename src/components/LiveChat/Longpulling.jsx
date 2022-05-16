import axios from 'axios';
import React, { useEffect, useState } from 'react';
import cl from './Chat.module.scss';

const Longpulling = () => {
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState('')

    useEffect(() => {
        getMessage()
    }, [])

    const getMessage = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/get-messages')
            setMessageList(prev => [data, ...prev]);
            await getMessage()
        } catch (error) {
            console.log(error)
        }
    }

    const send = () => {
        if (message.length) {
            sendMessage();
        }
        setMessage('');
    }

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            message,
            id: Date.now()
        });
    };

    return (
        <div className={cl.chat}>
            <h1>
                Live chat with longpulling
            </h1>
            <div className={cl.chat_container}>
                <div className={cl.list}>
                    {messageList?.map((item) => (
                        <div key={item?.id} className={cl.message}>
                            <p>{item.message}</p>
                        </div>
                    ))}
                </div>
                <div className={cl.form}>
                    <input type="text" placeholder='Введите сообщение'
                        value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button onClick={() => send()}>Отправить</button>
                </div>
            </div>
        </div>
    );
};

export default Longpulling;