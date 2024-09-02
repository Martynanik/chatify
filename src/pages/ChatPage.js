import React, {useEffect, useRef, useState} from "react";
import { useParams } from "react-router-dom";
import http from "../plugins/http";
import SingleMessage from "../components/SingleMessage";
import MainStore from "../store/MainStore";
import MessageInput from "../components/MessageInput";


const ChatPage= () =>{
    const lastMessageRef = useRef()
    const { conversationId } = useParams(); // Extract the chatId from the URL
    const {setMessages, messages, trigger, selectedConversation} = MainStore()
    useEffect(() => {
        http.get(`https://chatify-back-1e7h.onrender.com/getMessages/${conversationId}`)
            .then(res => {
                setMessages(res.data)
            })
    }, [trigger])

    useEffect(() => {
        setTimeout(()=>{
            lastMessageRef.current?.scrollIntoView({behavior: "smooth"})
        }, 100)
    }, [])

    return(
        <div className=" flex flex-col items-center  mt-3 md:mt-20 ">
            <div className=" flex items-center gap-2 bg-[#4c1d95] rounded-t-lg h-15 w-full max-w-md p-2 ">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full ring ring-secondary">
                        <img src={selectedConversation.image} alt="Profile"/>
                    </div>
                </div>
                <div>
                    {selectedConversation.username}
                </div>

            </div>
            <div className=" w-full max-w-md shadow-2xl bg-base-100 p-4 rounded-b-lg">

                <div className="h-100 ">
                    <div className="h-80 overflow-y-auto ">
                    {messages && messages.map((x) =>
                        <div key={x._id} ref={lastMessageRef}>
                            <SingleMessage message={x}
                                           conversationId={selectedConversation.conversationId}>

                            </SingleMessage>
                        </div>
                    )}
                    </div>
                </div>
                <MessageInput convId={conversationId}></MessageInput>


            </div>
        </div>
    )
}

export default ChatPage
