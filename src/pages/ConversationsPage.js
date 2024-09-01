import React, {useEffect, useState} from "react";
import MainStore from "../store/MainStore";
import http from "../plugins/http";
import {useNavigate} from "react-router-dom";

const ConversationsPage = () =>{
    const { setSelectedConversation, activeConversations, setActiveConversationsNum, setActiveConversations, user} = MainStore()
    const nav = useNavigate()
    async function deleteConversation(convId){
        const info = {
            convId: convId,
            participantId: user._id
        }
//// WTF KODEL AS NETURIU NK PO DELETE CONVERSATIONS
        const res = await http.post(`http://localhost:2000/deleteConversation/`, info)
        setActiveConversationsNum(res.data.conversationDetails.length);
        setActiveConversations(res.data.conversationDetails);

    }


    function openChat(id, conv){
        setSelectedConversation(conv)
        setTimeout(() => {
            nav(`chat/${id}`);
        }, 600);
    }
    return(
        <div>
            {activeConversations.length === 0 &&
                <div className="flex flex-col  items-center lg:justify-center h-screen p-4 justify-start mt-10 md:mt-1">
                    <h1 className="text-2xl sm:text-4xl font-medium">
                        No active conversations at the moment
                    </h1>
                </div>
            }

            {activeConversations && activeConversations.map((x) =>
                <div key={x.conversationId} className="flex justify-center items-center mx-6 my-6">
                    <div className="card w-full shadow-2xl bg-base-100">
                        <div className="card-body flex flex-row justify-between items-center gap-4">
                            {/* Profile Image */}
                            <div className="flex flex-col items-center justify-center ">
                                <div className="avatar mb-2">
                                    <div
                                        className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={x.image} alt="Conversation"/>
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold mb-2">{x.username}</h2>
                            </div>
                            {/* Conversation Details and Buttons */}
                            <div className="flex flex-col items-center justify-center gap-5 ">

                                    <button
                                        onClick={() => openChat(x.conversationId, x)}
                                        className="btn btn-primary btn-md w-40"
                                    >
                                        Open Chat
                                    </button>
                                    <button
                                        onClick={() => deleteConversation(x.conversationId)}
                                        className="btn btn-error btn-md w-40"
                                    >
                                        Delete
                                    </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ConversationsPage