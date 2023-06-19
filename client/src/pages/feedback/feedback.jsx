import React, { useState } from 'react'
import Navbar from '../../components/Navbar';
import client from '../../api';
import { ReviewsList } from '../../components/ReviewsList';
import { useNavigate } from 'react-router-dom';

const mainPath = "/feedback";

const Feedback = () => {
    const [text, setText] = useState("");

    const onTextChange = (e) => {
        setText(e.target.value);
    };

    const navigate = useNavigate();

    const onSendClick = async () => {
        const token = localStorage.getItem("TOKEN");
        await client.post(mainPath, { text }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(() => {
            navigate(0)
        }).catch((e) => {
            if (e.response.data.msg) {
                alert(e.response.data.msg)
            }
            else {
                console.log(e);
            };
        })
    }

    return (
        <>
            <Navbar />
            <div className='text-white flex flex-col' >
                {/* Input text form */}
                <div className='bg-exfon w-[1800px] bg-fixed min-h-screen max-h-auto mx-auto p-5'>
                    <div className='flex justify-center'>
                        <textarea className='text-black w-[1000px]' value={text} onChange={onTextChange} />
                        <button type='button' className='p-4 bg-[#FF7F50] hover:bg-orange-300' onClick={onSendClick}>Надіслати</button>
                    </div>
                    {/* List review */}
                    <ReviewsList />
                    <div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Feedback;