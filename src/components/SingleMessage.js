import React, {useEffect, useState} from "react";
import MainStore from "../store/MainStore";
import { extractTime } from "../helpers/extractTime";
import http from "../plugins/http";

const SingleMessage = ({ message, conversationId }) => {
    const { user, selectedConversation, setMessages, setTrigger } = MainStore();
    const fromMe = message.senderId === user._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const profilePic = fromMe ? user.image : selectedConversation.image;
    const bubbleBgColor = fromMe ? 'bg-[#4c1d95]' : 'bg-gray-500';
    const likedMessage = message.like === true

    async function sendLike(){

        const info = {
            messageId: message._id,
            conversationId:  conversationId
        }
        const res = await http.post(`http://localhost:2000/sendLike`, info)
        if(res.message === "Message liked or unliked"){
            setMessages(res.data.messages)
            setTrigger((prev) => prev + 1);
        } else {
            console.log(res.message)
        }

    }

    return (
        <div className={`chat ${chatClassName}`}>
            {!fromMe && (
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src={profilePic} alt="Profile"/>
                    </div>
                </div>
            )}

            <div className="chat-header flex items-center gap-1">
                <div>{fromMe ? user.username : selectedConversation.username}</div>

                <time className="text-xs opacity-50 ">{formattedTime}</time>
            </div>

            {fromMe ? <div className={`chat-bubble ${bubbleBgColor}`}>
                    {message.text}
                </div> :

                <div className="flex justify-start items-end relative ">

                    <div onDoubleClick={()=>sendLike()} className={`chat-bubble ${bubbleBgColor}`}>
                        {message.text}

                    </div>
                    {likedMessage &&
                        <div className="flex justify-end">
                            <span className="heart-emoji  ">
                                <div className="emoji">❤️</div>
                            </span>
                        </div>
                    }

                </div>


            }

            {fromMe && (
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src={profilePic} alt="Profile"/>
                    </div>
                </div>
            )}
        </div>

    );
}

export default SingleMessage;
