import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import MainStore from "../store/MainStore";
import http from "../plugins/http";
import {useNavigate} from "react-router-dom";

const Toolbar = () =>{
    const {user,setActiveConversations, activeConversationsNum,setActiveConversationsNum} = MainStore()
    const nav=useNavigate()
    useEffect(() => {
        if (user) {
            http.get(`http://localhost:2000/allConversations/${user._id}`)
                .then(res => {
                    setActiveConversationsNum(res.data.conversationDetails.length);
                    setActiveConversations(res.data.conversationDetails);
                })
                .catch(err => console.error("Error fetching conversations:", err));
        }
    }, [user]);
    return (
        <div className="navbar bg-base-100 shadow-lg flex-2 mx-4">
            <div className="flex-1">
                <div onClick={()=>nav("/")} className="cursor-pointer normal-case font-bold text-xl">Chatify</div>
            </div>
            <div className="flex gap-3 p-2 mx-4">
                {!user && (
                    <Link
                        to="/login"
                        className="text-lg no-underline hover:text-xl transition-all duration-200"
                    >
                        Login
                    </Link>
                )}
                {!user && (
                    <Link
                        to="/registration"
                        className="text-lg no-underline hover:text-xl transition-all duration-200"
                    >
                        Register
                    </Link>
                )}
                {user && (
                    <Link
                        to="/profile"
                        className="text-lg no-underline hover:text-xl transition-all duration-200"
                    >
                        Profile
                    </Link>
                )}
                {user && (
                    <Link
                        to="/users"
                        className="text-lg no-underline hover:text-xl transition-all duration-200"
                    >
                        Users
                    </Link>
                )}
                {user && (
                    <Link
                        to="/conversations"
                        className="text-lg no-underline hover:text-xl transition-all duration-200"
                    >
                        Conversations({activeConversationsNum})
                    </Link>
                )}
            </div>
        </div>


    )
}

export default Toolbar



