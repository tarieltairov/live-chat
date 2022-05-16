import React, { useEffect, useRef, useState } from 'react';
import cl from './Chat.module.scss';

const Ws = () => {
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState('');
    const socket = useRef();
    const [connected, setConnected] = useState(false);
    const [user, setUser] = useState('');

    const connect = () => {
        socket.current = new WebSocket('ws://localhost:5000');
        if (user.length) {
            socket.current.onopen = () => {
                setConnected(true);
                const message = {
                    event: 'connection',
                    user,
                    id: Date.now()
                }
                socket.current.send(JSON.stringify(message));
            }

            socket.current.onmessage = (event) => {
                const message = JSON.parse(event.data);
                setMessageList(message)
            }
        }
        socket.current.onclose = () => {
            console.log('Socket закрыт');
        }

        socket.current.onerror = () => {
            console.log('возникла ошибка');
        }

    }

    const send = () => {
        if (message.length) {
            const sms = {
                user,
                message,
                id: Date.now(),
                event: 'message'
            }
            socket.current.send(JSON.stringify(sms))
            setMessage('');
        }
    }

    const deleteMessage = (id) => {
        console.log(id)
        const forDeleting = {
            id,
            event: 'deleting'
        }
        socket.current.send(JSON.stringify(forDeleting))
    }



    if (!connected) {
        return (
            <div className={cl.chat}>
                <h1> web-socket chat </h1>
                <div className={cl.chat_container}>
                    <div className={cl.form}>
                        <input type="text" placeholder='Введите ваше имя' value={user}
                            onChange={(e) => setUser(e.target.value)} />
                        <button onClick={() => connect()}>Войти</button>
                    </div>
                </div>
            </div>
        )
    }
    console.log('messageList', messageList)
    return (
        <div className={cl.chat}>
            <h1> web-socket chat </h1>
            <h4>Ваше имя: {user}</h4>
            <div className={cl.chat_container}>
                <div className={cl.list}>
                    {messageList?.map((item) => (
                        <div
                            key={item?.id}
                            className={item.event === 'connection' ?
                                cl.connection : item.user === user ? cl.your : cl.message}
                        >
                            <div className={cl.inner}>
                                {item.event === 'connection' &&
                                    (<p>
                                        {item.user === user ? 'Вы ' : 'Ползователь '}
                                        {item.user === user ? null : item.user}
                                        {item.user === user ? 'подключились' : ' подключился'}
                                    </p>)
                                }
                                {item.event !== 'connection' &&
                                    <p className={cl.author}>{item.user !== user && item.user}</p>
                                }
                                <div className={cl.inner_mes}>
                                    <p>{item.message}</p>
                                    <p className={cl.date}>
                                        {item.event !== 'connection' ? item.date : null}
                                    </p>
                                    {item.event !== 'connection' && item.user === user &&
                                        < span onClick={() => deleteMessage(item.id)}>delete</span>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={cl.form}>
                    <input
                        type="text"
                        placeholder='Введите сообщение'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={() => send()}>Отправить</button>
                </div>
            </div>
        </div >
    );
};

export default Ws;