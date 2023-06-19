import React from "react";
import {Link} from "react-router-dom";
import {
    FaGithubSquare,
}
from 'react-icons/fa'
import {
    BsTelegram,
}
from 'react-icons/bs'

const Footer = () => {
    return(
        <div className="max-w-[1240px] mx-auto py-10 px-4 grid lg:grid-cols-3 gap-8 text-gray-400">
            <div>
            <h1 className="w-full text-3xl font-bold text-[#FF7F50]">FitnessTrainer</h1>
            <p className="py-4">Віртуальний фітнес-тренер. Контакти:</p>
            <div className="flex justify-between md:w-[25%] my-6">
                <Link to="https://github.com/IlonaIst"><FaGithubSquare size={25}/></Link>
                <Link to="https://t.me/Ist_amer"><BsTelegram size={25}/></Link>
            </div>
        </div>
        </div>
    )
}

export default Footer

