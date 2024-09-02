import React, {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import http from "../plugins/http";



const RegistrationPage = () =>{
    const usernameRef = useRef();
    const passwordOneRef = useRef()
    const passwordTwoRef = useRef()
    const nav = useNavigate()
    const [error, setError] = useState(null);

    async function register(event){
        event.preventDefault();
        setError("")

        if (usernameRef.current?.value.length < 5 || usernameRef.current?.value.length > 20) {
            return setError("Username length must be 4-20 symbols")
        }

        if (passwordOneRef.current?.value.length < 5 || passwordOneRef.current?.value.length > 20) {
            return setError("Password length must be 4-20 symbols")
        }

        if (passwordOneRef.current?.value !== passwordTwoRef.current?.value) {
            return setError("Passwords must match.")
        }



        const user = {
            username: usernameRef.current.value,
            passwordOne : passwordOneRef.current.value,
            passwordTwo : passwordTwoRef.current.value

        }
        const res = await http.post("http://localhost:2000/register", user)

        if(res.message === "User was registered successfully"){
            nav('/login')
            setError("")
        } else {
            setError(res.message)
        }
    }

    return(

        <div>
            <div className="flex justify-center mt-[24px] md:mt-[100px] ">
                <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold mb-4">Register</h2>
                        <form onSubmit={register}>
                            <div className="form-control mb-4">
                                <label className="label" htmlFor="username">
                                    <span className="label-text">Username</span>
                                </label>
                                <input
                                    ref={usernameRef}
                                    type="text"
                                    className="input input-bordered w-full"
                                    id="username"
                                    name="username"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>

                            <div className="form-control mb-4">
                                <label className="label" htmlFor="password">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    ref={passwordOneRef}
                                    type="password"
                                    className="input input-bordered w-full"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <div className="form-control mb-4">
                                <label className="label" htmlFor="repeatPassword">
                                    <span className="label-text">Repeat Password</span>
                                </label>
                                <input
                                    ref={passwordTwoRef}
                                    type="password"
                                    className="input input-bordered w-full"
                                    id="repeatPassword"
                                    name="repeatPassword"
                                    placeholder="Repeat your password"
                                    required
                                />
                            </div>
                            {error && (
                                <div className="alert alert-warning mt-3">
                                    <div>
                                        <span>{error}</span>
                                    </div>
                                </div>
                            )}

                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary w-full">Register</button>
                            </div>
                        </form>
                        <div className="flex gap-1">
                            <div> Already have an account?</div>
                            <div className="cursor-pointer	" onClick={()=>nav('/login')}> Login</div>
                        </div>
                    </div>
                </div>
            </div>





        </div>
    )


}

export default RegistrationPage



