import React, { useState, useEffect, useCallback } from 'react';
import Navbar from "../../components/Navbar";
import Timer from "../../components/Timer";
import { ExerciseCards } from "../../components/ExerciseCards";
import client from '../../api';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from '../../store/userSlice';
import { useNavigate } from "react-router-dom";
import appRoutes from '../../appRoutes';

const GenTraining = () => {
    const [date, setDate] = useState(new Date());
    const [workoutArray, setWorkoutArray] = useState([]);
    const [exercises, setExercises] = useState([]);
    const user = useSelector(state => state.appUser.user)
    const navigate = useNavigate();

    const { category } = useParams();
    // console.log(category)

    const dispatch = useDispatch();

    const getExercises = async () => {
        await client.get(`exercises/${category}`).then((res) => { console.log(res.data); setExercises(res.data) }).catch((error) => { alert("Err") })
    }

    const addToWorkoutArray = async (dateToMark) => {
        console.log(dateToMark)
        const token = localStorage.getItem("TOKEN");

        await client.post(`/auth/users/workout`, { workout: dateToMark }, {
            headers: {
                Authorization: `Bearer: ${token}`,
            }
        })
            .then(res => {
                console.log('User updated:', res.data);
                setWorkoutArray(res.data.dateToMark);
                dispatch(setUser(res.data));
            })
            .catch(error => {
                console.error(error);
            });
    }


    const onDoneClick = useCallback(() => {
        if(user.isPremium){
            const dateToMark = new Date(date.getFullYear(), date.getMonth()).getDate();
            addToWorkoutArray(dateToMark);
            navigate(appRoutes.profile.path);
        }
        else{
            alert("Збереження прогресу доступне тільки для Premium користувачів");
            navigate(appRoutes.profilePurchase.path);
        }
        
    }, []);

    useEffect(() => {
        getExercises()
    }, []);

    return (
        <div>
            <Navbar />
            <Timer />

            <div className="bg-exfon bg-fixed">
                <ExerciseCards exercises={exercises} />;
                <button
                    className="w-full px-4 py-3 bg-[#FF7F50] text-white text-2xl rounded-none hover:bg-green-400"
                    onClick={onDoneClick}>Готово</button>
            </div>
        </div>
    )
}

export default GenTraining