import React, { useEffect } from 'react';
import client from "../api";

export const UserCardList = ({ user }) => {

    const btnDel = () => {
        client.delete(`admin/user/${user._id}`).then(response => {
            alert(response.data.msg);
        }).catch(e => {
            console.log(e);
            alert("Item not removed")
        });
    }

    useEffect(() => {
        console.log(user);
    }, [])

    return (
        <div className='border-b my-1 mx-6 py-2'>
            <div>
                <h3><b>ID:</b> {user._id}</h3>
                <h3><b>Name:</b> {user.name}</h3>
                <h3><b>Email:</b> <a href={`mailto:${user.email}`} className='underline text-indigo-500 hover:text-indigo-700'>{user.email}</a></h3>
                <h3><b>Registred at:</b> {user.createdAt}</h3>
                <h3><b>Is premium:</b> {user.isPremium ? "yes" : "no"}</h3>

            </div>
            <button onClick={btnDel} className="bg-[#FF7F50] hover:bg-orange-400 w-[200px] rounded-md font-bold text-black ml-3 my-6 mx-auto py-3">Delete</button>
        </div>
    );
}