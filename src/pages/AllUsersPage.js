import React, {useState, useEffect} from "react";
import http  from "../plugins/http";
import SingleUserCard from "../components/SingleUserCard";
import MainStore from "../store/MainStore";

const AllUsersPage = () =>{
    const [allUsers, setAllUsers] = useState([])
    const {user}=MainStore()

    useEffect(() => {
        http.get("http://localhost:2000/allUsers")
            .then(res => {
                const fetchedUsers = res.data
                const filteredUsers = fetchedUsers.filter(x => x.username !== user.username);
                setAllUsers(filteredUsers)
            })

    }, [])
    return (
        <div className="flex flex-col lg:flex-row lg:flex-wrap justify-center">
            {allUsers.length === 0 &&
                <div className="flex flex-col  items-center lg:justify-center h-screen p-4 justify-start">
                    <h1 className="text-2xl sm:text-4xl font-medium">
                        No other users at the moment
                    </h1>
                </div>
            }
            {allUsers && allUsers.map((x) => <SingleUserCard user={x} key={x._id}></SingleUserCard>)}
        </div>
    )
}

export default AllUsersPage


