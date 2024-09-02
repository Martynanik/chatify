import React, {useEffect, useState, useRef} from "react";
import MainStore from "../store/MainStore";
import http from "../plugins/http";




const SingleUserProfilePage = () =>{
    const { setActiveConversationsNum, setActiveConversations, user, username, token} = MainStore()
    const [profile, setProfile] = useState([])
    const messageRef = useRef();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);



    useEffect(() => {
        http.get(`https://chatify-back-1e7h.onrender.com/singleUser/${username}`)
            .then(res => {
                setProfile(res.data)
            })

    }, [])


    async function sendMessage(){
        setError("")
        setSuccess("")
        if (messageRef.current?.value.length === 0 ) {
            return setError("You can not send an empty message")
        }
        const message = {
            senderId: user._id,
            recipientId : profile._id,
            text : messageRef.current.value,
        }

        const res = await http.postAut("https://chatify-back-1e7h.onrender.com/sendMessage", message, token)

        if(res.message === "Message send successfully"){
            setError("")
            setSuccess("Message send successfully")
            setActiveConversationsNum(res.data.conversationDetails.length);
            setActiveConversations(res.data.conversationDetails);
        } else {
            setError(res.message)
        }
    }

    return(
        <div >
            {profile &&
                <div className="flex justify-center items-center mx-6 my-6 ">
                    <div className="card w-full max-w-md shadow-2xl bg-base-100">
                        <div className="card-body items-center text-center">
                            <div className="avatar mb-4">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={profile.image} alt="Profile"/>
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold mb-4">{profile.username}</h2>
                            <div className="p-4">
                                <input
                                    ref={messageRef}
                                    type="text"
                                    placeholder="Send a message"
                                    className="input input-bordered w-full mb-4"
                                />

                                {error && (
                                    <div className="alert alert-warning shadow-lg mb-4">
                                        <div>
                                            <span>{error}</span>
                                        </div>
                                    </div>
                                )}

                                {success && (
                                    <div className="alert alert-success shadow-lg mb-4">
                                        <div>
                                            <span>{success}</span>
                                        </div>
                                    </div>
                                )}

                                <button
                                    onClick={() => sendMessage()}
                                    className="btn btn-primary w-full"
                                >
                                    Send
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default SingleUserProfilePage



