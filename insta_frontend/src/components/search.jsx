import React, { useEffect, useRef, useState } from 'react';

const Search = () => {
    const [users, setusers] = useState([]);
    const [db, setdb] = useState([]);
    const timer=useRef()

    useEffect(() => {
        apicall();
    }, []);

    async function apicall() {
        const res = await fetch("https://dummyjson.com/users");
        const data = await res.json();

        setusers(data.users);
        setdb(data.users);
        console.log(data.users)
    }

    function handlesearch(name) {
        clearTimeout(timer)
        timer=setTimeout(() => {
            
            const filtered = db.filter((user) =>
                user.firstName.toLowerCase().includes(name.toLowerCase())
            );
    
            setusers(filtered);
        }, 1000);
    }

    return (
        <div className="flex flex-col items-center">
            <input
                onChange={(e) => handlesearch(e.target.value)}
                className="bg-slate-600 w-1/2 h-10 rounded-3xl pl-5 mt-6 text-white"
                placeholder="Search..."
            />

            {users.map((user) => (
                <p  style={{color:"white"}} key={user.id}>{user.firstName}</p>
            ))}
        </div>
    );
};

export default Search;