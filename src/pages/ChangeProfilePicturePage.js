import React, {useState, useRef} from "react";
import http from "../plugins/http";
import MainStore from "../store/MainStore";

const ChangeProfilePicturePage = () =>{
    const imageRef = useRef();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const {user, setUser, token} = MainStore()

    async function changePicture(){
        setSuccess("")
        setError("")
        const info= {
            username: user.username,
            image: imageRef.current.value
        }
        const res = await http.postAut("https://chatify-back-1e7h.onrender.com/changeProfilePicture", info, token)

        if(res.message === "Profile picture changed successfully"){
            setError("")
            setUser(res.data)
            setSuccess("Profile picture changed successfully")

        } else {
            setError(res.message)
        }

    }

    return(
        <div>
            {user &&

                <div className="flex flex-col gap-4 items-center p-6">
                    <input
                        ref={imageRef}
                        type="text"
                        className="input input-bordered w-full max-w-xs"
                        placeholder="Insert URL"
                        required
                    />

                    {error && (
                        <div className="alert alert-warning shadow-lg w-full max-w-xs">
                            <div>
                                <span>{error}</span>
                            </div>
                        </div>
                    )}

                    {success && (
                        <div className="alert alert-success shadow-lg w-full max-w-xs">
                            <div>

                                <span>{success}</span>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => changePicture()}
                        className="btn btn-primary w-full max-w-xs"
                    >
                        Change
                    </button>
                </div>

            }
        </div>

    )
}

export default ChangeProfilePicturePage



