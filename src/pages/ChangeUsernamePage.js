import React, {useState, useRef} from "react";
import http from "../plugins/http";
import MainStore from "../store/MainStore";

const ChangeUsernamePage = () =>{
    const usernameRef = useRef();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    const {user, setUser, token} = MainStore()

    async function changeUsername(){
        setSuccess("")
        setError("")
        const info= {
            username: user.username,
            newUsername: usernameRef.current.value
        }
        const res = await http.postAut("https://chatify-back-1e7h.onrender.com/changeUsername", info, token)

        if(res.message === "Username changed successfully"){
            setError("")
            setSuccess("Username changed successfully")
            setUser(res.data)

        } else {
            setError(res.message)
        }

    }

    return(
        <div>
            {user &&
                <div className="flex flex-col gap-4 items-center p-6">
                    <input
                        ref={usernameRef}
                        type="text"
                        className="input input-bordered w-full max-w-md"
                        placeholder="New username"
                        required
                    />

                    {error && (
                        <div className="alert alert-warning shadow-lg w-full max-w-md">
                            <div>
                                <span>{error}</span>
                            </div>
                        </div>
                    )}

                    {success && (
                        <div className="alert alert-success shadow-lg w-full max-w-md">
                            <div>
                                <span>{success}</span>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => changeUsername()}
                        className="btn btn-primary w-full max-w-md"
                    >
                        Change
                    </button>
                </div>

            }
        </div>

    )
}

export default ChangeUsernamePage