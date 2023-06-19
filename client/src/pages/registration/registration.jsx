import React, { useState } from "react";
import "./registration.css"
import client from "../../api"
import { Link, useNavigate } from "react-router-dom";
import appRoutes from "../../appRoutes";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadOff, loadOn } from "../../store/loaderSlice";

const Registration = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        rePassword: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    };


    function validateRegistration(name, email, password, rePassword) {
        // Проверка на пустые значения
        if (!name || !email || !password || !rePassword) {
          alert("Введите все необходимые поля");
          return false;
        }
      
        // Проверка формата email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert("Некорректный формат email");
          return false;
        }
      
        // Проверка на минимальную длину пароля
        const minPasswordLength = 5;
        if (password.length < minPasswordLength) {
          alert(`Минимальная длина пароля ${minPasswordLength} символов`);
          return false;
        }
      
        // Проверка совпадения пароля и его повторного ввода
        if (password !== rePassword) {
          alert("Пароль и его повторный ввод не совпадают");
          return false;
        }
      
        // Если все проверки прошли успешно
        return true;
      }


    const registration = async (e) => {
        e.preventDefault();
        const { name, email, password, rePassword } = user
        if (validateRegistration(name, email, password, rePassword)) {
            dispatch(loadOn());
            await client.post("auth/registration", user)
                .then(res => {
                    //alert(res.data.msg);
                    navigate(appRoutes.login.path);
                }).catch(e => {
                    console.log(e);
                    alert("Registration error");
                });
            dispatch(loadOff());
        } 
    }

    useEffect(() => { window.scrollTo(0, 0) }, []);

    return (
        <div>
            <Navbar />
            <div className="h-screen flex bg-fon">
                <form onSubmit={registration} className="m-auto w-auto border-1 border-black rounded-md bg-white bg-opacity-30 shadow-md shadow-gray-700 flex flex-col">
                    <div className="text-3xl text-white bg-black py-2 px-4 font-bold bg-opacity-90">Registration</div>
                    <div className="mt-5 mx-3">
                        <input type="text"
                            name="name"
                            className="outline-none text-xl placeholder-slate-600 rounded-sm mx-2 px-3 py-2 border-2 border-gray-400"
                            value={user.name}
                            placeholder="Enter your name"
                            onChange={handleChange} />
                        <div className="flex mt-5">
                            <input type="text"
                                name="email"
                                className="outline-none text-xl placeholder-slate-600 rounded-sm mx-2 px-3 py-2 border-2 border-gray-400"
                                value={user.email}
                                placeholder="Enter your email"
                                onChange={handleChange} />
                        </div>
                        <div className="flex mt-5">
                            <input type="password"
                                name="password"
                                className="outline-none text-xl placeholder-slate-600 rounded-sm mx-2 px-3 py-2 border-2 border-gray-400"
                                value={user.password}
                                placeholder="Enter password"
                                onChange={handleChange} />
                        </div>
                        <div className="flex mt-5">
                            <input type="password"
                                name="rePassword"
                                className="outline-none text-xl placeholder-slate-600 rounded-sm mx-2 px-3 py-2 border-2 border-gray-400"
                                value={user.rePassword}
                                placeholder="Re Enter password"
                                onChange={handleChange} />
                        </div>
                        <button type="submit" className=" cursor-pointer w-full py-2 mt-5 shadow-sm shadow-black bg-[#FF7F50] focus:bg-[#FF7F50] hover:bg-[#FFA07A]">Register</button>

                        <div>or</div>
                    </div>
                    <Link to={appRoutes.login.path} replace className=" m-2 text-md text-white ">Login</Link>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Registration
