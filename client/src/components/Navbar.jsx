import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import appRoutes from "../appRoutes";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../store/userSlice";
import { FaUser } from "react-icons/fa"

const Navbar = () => {
    const [nav, setNav] = useState(false)
    const user = useSelector(state => state.appUser.user);
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onLogoutClick = () => {
        dispatch(deleteUser());
        localStorage.removeItem("TOKEN");
        navigator(appRoutes.login.path);
        console.log("Logout")
    }

    const handleNav = () => {
        setNav(!nav)
    }

    const onBuyClick = () => {
        navigator(appRoutes.buy.path);
        setIsModalOpen(false);
    }

    const onCancelClick = () => {
        setIsModalOpen(false);
    }



    return (
        <div className="flex justify-between items-center h-15 max-w-[1480px] mx-auto px-4 text-white">
            <h1 className="w-full text-3xl font-bold text-[#FF7F50]"><Link to={appRoutes.home.path} replace>FitnessTrainer</Link></h1>
            <ul className="hidden md:flex">
                {
                    user ? <li className="p-4 cursor-pointer"><Link to={appRoutes.feedback.path} replace>Відгуки</Link></li> : null
                }
                <li className="p-4 cursor-pointer"><Link to={appRoutes.about.path} replace>ПроНас</Link></li>
                {
                    user ? <li className="p-4 cursor-pointer"><Link to={appRoutes.gym.path} replace>Тренування</Link></li> : null
                }

                {
                    user ? <li className="p-3 m-1 cursor-pointer rounded-md bg-[#FF7F50] focus:bg-[#FF7F50] hover:bg-[#FFA07A]" onClick={onLogoutClick}>Logout</li> :
                        <li className="p-3 m-1 cursor-pointer rounded-md bg-[#FF7F50] focus:bg-[#FF7F50] hover:bg-[#FFA07A]"><Link to={appRoutes.login.path} replace>Login</Link></li>
                }

                {/*{*/}
                {/*   user && user.role === "USER"  ? <li className="p-4 cursor-pointer flex gap-2 text-[#FF7F50]" onClick={() => setIsModalOpen(true)}>*/}
                {/*        <div className="flex"><FaUser className="m-1"/>*/}
                {/*            <div>Profile</div>*/}
                {/*        </div>*/}
                {/*    </li> : null*/}
                {/*}*/}

                {
                    user  ? <Link to={user.isPremium ? appRoutes.profile.path : appRoutes.profilePurchase.path} className="p-4 cursor-pointer flex gap-2 text-[#FF7F50]"> Профіль </Link> : null
                }
                {
                    user && user.role === "ADMIN" ? <Link to={appRoutes.admin.addEx.path} className="p-3 m-1 cursor-pointer w-[95px] rounded-md bg-[#f02742] focus:bg-[#e91e6c] hover:bg-[#ab1010]">Admin</Link> : null
                }

            </ul>

        </div>
    )
}

export default Navbar