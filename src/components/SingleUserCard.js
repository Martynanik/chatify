import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import MainStore from "../store/MainStore";


const SingleUserCard = ({user}) =>{
    const nav = useNavigate()
    const {setUsername}=MainStore()

    function userProfile(name){
        setUsername(name)
        nav(`/user/${name}`)
    }

    return (
        <div onClick={()=>userProfile(user.username)} className="flex justify-center items-center mx-6 my-6 ">
            <div className="card w-full max-w-md shadow-2xl bg-base-100">
                <div className="card-body items-center text-center">
                    <div className="avatar mb-4">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user.image} alt="Profile"/>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">{user.username}</h2>
                </div>
            </div>
        </div>
    )
}

export default SingleUserCard



