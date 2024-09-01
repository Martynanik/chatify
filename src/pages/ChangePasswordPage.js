import React, {useState, useRef} from "react";
import http from "../plugins/http";
import MainStore from "../store/MainStore";

const ChangePasswordPage = () =>{
    const currentPasswordRef = useRef();
    const passwordOneRef = useRef();
    const passwordTwoRef = useRef();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    const {user, setUser, token} = MainStore()

    async function changePassword(){
        setSuccess("")
        setError("")
        const info= {
            username: user.username,
            currentPassword: currentPasswordRef.current.value,
            passwordOne: passwordOneRef.current.value,
            passwordTwo: passwordTwoRef.current.value,
        }
        const res = await http.postAut("http://localhost:2000/changePassword", info, token)

        if(res.message === "Password changed successfully"){
            setError("")
            setSuccess("Password changed successfully")
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
                        ref={currentPasswordRef}
                        type="password"
                        className="input input-bordered w-full max-w-md"
                        placeholder="Current password"
                        required
                    />

                    <input
                        ref={passwordOneRef}
                        type="password"
                        className="input input-bordered w-full max-w-md"
                        placeholder="New password"
                        required
                    />

                    <input
                        ref={passwordTwoRef}
                        type="password"
                        className="input input-bordered w-full max-w-md"
                        placeholder="Repeat new password"
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
                        onClick={() => changePassword()}
                        className="btn btn-primary w-full max-w-md"
                    >
                        Change Password
                    </button>
                </div>

            }
        </div>

    )
}

export default ChangePasswordPage