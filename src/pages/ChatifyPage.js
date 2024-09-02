import React, {useState} from "react";
import MainStore from "../store/MainStore";
import {useNavigate} from "react-router-dom";



const ChatifyPage = () =>{
    const { user } = MainStore();
    const nav = useNavigate()


    return (
        <div className="  p-5 flex flex-col  items-center  text-center  ">
            <h1 className="text-3xl md:text-5xl font-bold mt-10 md:mt-[200px] mb-4">Make it easy to start a conversation</h1>
            <div className="text-lg mx-[50px] sm:mx-[150px] mt-5">Connect with your customers on their terms. With our chat-first
                platform, you're
                always just a message away, making it easier than ever to engage and build lasting relationships. Be
                there when it counts, every time.
            </div>
            {!user && (
                <button
                    onClick={() => nav('/registration')}
                    className="btn mt-10 btn-primary text-white px-6 text-lg font-semibold rounded-md shadow-lg text-shadow"
                >
                    Sign Up Free
                </button>
            )}




        </div>

    )
}

export default ChatifyPage