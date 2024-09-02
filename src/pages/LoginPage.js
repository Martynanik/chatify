import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import http from "../plugins/http";
import MainStore from "../store/MainStore";

const LoginPage = () => {
    const [error, setError] = useState(null);
    const usernameRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = MainStore();
    const nav = useNavigate();

    async function login(event) {
        event.preventDefault(); // Prevents the form from submitting and causing a page refresh

        const userLogged = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };

        const res = await http.post("https://chatify-back-1e7h.onrender.com/login", userLogged);

        if (res.message === "Successful login") {
            setUser(res.data.loggedUser);
            setToken(res.data.token);
            setError("");
            nav('/profile');
        } else {
            setError(res.message);
        }
    }

    return (
        <div className="flex justify-center mt-[24px] md:mt-[100px] ">
            <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
                    <form onSubmit={login}>
                        <div className="form-control mb-4">
                            <label className="label" htmlFor="formName">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                ref={usernameRef}
                                type="text"
                                className="input input-bordered w-full"
                                id="formName"
                                name="name"
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label className="label" htmlFor="formPassword">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                ref={passwordRef}
                                type="password"
                                className="input input-bordered w-full"
                                id="formPassword"
                                name="password"
                                placeholder="Enter your password"
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
                            <button type="submit" className="btn btn-primary w-full">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;