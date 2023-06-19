import React, { useCallback, useState } from 'react'
import { AiFillLike } from "react-icons/ai"
import { useSelector } from 'react-redux'
import client from '../api';

export const ReviewCard = ({ post }) => {
    const user = useSelector(state => state.appUser.user);
    const [currPost, setCurrPost] = useState(post);
    const [isLiked, setIsLiked] = useState(post ? post.like.some(id => id === user.id) : false);

    const onLikeClick = async () => {
        const token = localStorage.getItem("TOKEN");
        await client.put("/feedback/like/" + post._id, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(
            res => { 
                console.log(res.data); 
                setIsLiked(prev => !prev); 
                if(isLiked){
                    setCurrPost(prev=>({...prev, like: prev.like.filter(usId=>usId!==user.id)})); 
                }
                else{
                    setCurrPost(prev=>({...prev, like: [...prev.like, user.id]})); 
                }
            }
        ).catch(e => {
            console.log(e);
            alert("Щось пішло не так");
        });
    }

    return (
        <div className='bg-neutral-500 bg-opacity-50 p-4 my-1'>
            <div className='w-full flex justify-between'>
                <div>
                    <div className='text-black font-bold'>{currPost.name}</div>
                    <div>{currPost.text}</div>
                </div>
                <div className='flex gap-2'>
                    <div className='flex' onClick={onLikeClick}>
                        <AiFillLike className={`${isLiked ? " text-green-200" : "text-neutral-200"}`} />{currPost.like.length}
                    </div>
                </div>
            </div>
            <div className='text-sm'>
                {post.createdAt.slice(0, 10)}
            </div>
        </div>
    )
}
