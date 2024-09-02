import React, {useState} from "react";
import MainStore from "../store/MainStore";
import {useNavigate} from "react-router-dom";



const ProfilePage = () =>{
    const {user, setUser, setToken, setUsername, setActiveConversationsNum, setActiveConversations, setMessages, setSelectedConversation, setTrigger } = MainStore()
    const nav = useNavigate()
    function logOut(){
        setUser("")
        setToken("")
        setUsername("")
        setActiveConversationsNum(null)
        setActiveConversations(null)
        setMessages([])
        setSelectedConversation(null)
        setTrigger(false)
        nav("/login")

    }

    return(
        <div>
            {user &&
                <div className="flex justify-center mt-[24px] md:mt-[100px]  ">
                    <div className="card w-full max-w-md shadow-2xl bg-base-100">
                        <div className="card-body items-center text-center">
                            <div className="avatar mb-4">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={user.image} alt="Profile"/>
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold mb-4">{user.username}</h2>

                            <div className="grid grid-cols-1 gap-4">
                            <button
                                    onClick={()=> nav('/changeUsername')}
                                    className="btn btn-outline btn-secondary"
                                >
                                    Change Username
                                </button>

                                <button
                                    onClick={()=> nav('/changeProfilePicture')}
                                    className="btn btn-outline btn-secondary"
                                >
                                    Change Picture
                                </button>

                                <button
                                    onClick={()=> nav('/changePassword')}
                                    className="btn btn-outline btn-secondary"
                                >
                                    Change Password
                                </button>

                                <button
                                    onClick={()=>logOut()}
                                    className="btn btn-outline btn-error"
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProfilePage



