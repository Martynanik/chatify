import React, {useEffect, useRef, useState} from "react";
import http from "../plugins/http";
import MainStore from "../store/MainStore";




const MessageInput = ({convId}) =>{
    const [error, setError] = useState(null);
    const messageRef = useRef();
    const {setMessages, setTrigger, user, selectedConversation, token} = MainStore()

    async function sendNewMessage(){
        setError("")
        if (messageRef.current?.value.length === 0 ) {
            return setError("You can not send an empty message")
        }
        const message = {
            conversationId: convId,
            senderId: user._id,
            recipientId : selectedConversation.otherParticipantId,
            text : messageRef.current.value,
        }
        const res = await http.postAut("http://localhost:2000/sendMessageInChat", message, token)

        if(res.message === "Message send successfully"){
            setError("")
            setMessages(res.data.messages)
            setTrigger((prev) => prev + 1); // Increment the trigger counter
            messageRef.current.value = ""
        } else {
            setError(res.message)
        }

    }
    return(
        <div className="flex flex-col">
            {error && (
                <div className="alert alert-warning shadow-lg mb-4 mt-4">
                    <div>
                        <span>{error}</span>
                    </div>
                </div>
            )}
            <div className="flex items-center gap-2 mt-4 bg-base-100 ">
                <input
                    ref={messageRef}
                    type="text"
                    placeholder="Send new message"
                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    onClick={() => sendNewMessage()}
                    className="btn btn-primary"
                >
                    Send
                </button>
            </div>

        </div>
    )
}

export default MessageInput