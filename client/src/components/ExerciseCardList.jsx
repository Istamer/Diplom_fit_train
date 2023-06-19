import React from 'react';
import client from "../api";

export const ExerciseCardList = ({ exercise }) => {

    const btnDel = () => {
        client.delete(`admin/ex/${exercise._id}`).then(response => {
            alert(response.data.msg);
        }).catch(e => {
            console.log(e);
            alert("Item not removed")
        });
    }

    return (
        <div className='border-b my-1 mx-6 py-2'>
            <div>
                <h3> <b>Name:</b> {exercise.exname}</h3>
                <h3> <b>Category:</b> {exercise.category}</h3>
                <h3> <b>Description:</b> <span className='text-sm'>{exercise.description}</span></h3>
            </div>
            <button onClick={btnDel} className="bg-[#FF7F50] hover:bg-orange-400 w-[200px] rounded-md font-bold text-black ml-3 my-6 mx-auto py-3">Delete</button>
        </div>
    );
}