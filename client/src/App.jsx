import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import appRoutes from './appRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import client from "./api";
import { setUser } from './store/userSlice';
import { useState } from "react";
import { Loader } from "./components/Loader";
import { loadOff, loadOn } from "./store/loaderSlice";

/*

const login = async (user: LoginUser) => {
  const response = await client.post<any>("/auth/login", user);
  const { data } = response;

  Token.Set(data.token);
  console.log(response.data);

  return response.data;
};

const auth = async () => {
  const token = Token.Get();
  const response = await client.get<any>("auth/auth", {
    headers: { Authorization: token },
  });

  const { data } = response;
  Token.Set(data.token);

  return response.data;
};
*/

function App() {

    const user = useSelector(state => state.appUser.user);
    const isLoad = useSelector(state => state.loader.isLoad);
    const dispatch = useDispatch();

    //    const [isLoading, setIsLoading] = useState(false);


    const authUser = () => {
        const token = localStorage.getItem("TOKEN");
        if (token) {
            dispatch(loadOn());
            client.get("auth/auth", {
                headers: { Authorization: `Bearer ${token}` },
            }).then(res => {
                //console.log(res.data);
                localStorage.setItem("TOKEN", res.data.token);
                dispatch(setUser(res.data.user))
                //console.log(res.data.user)
            }).catch(e => {
                localStorage.clear("TOKEN");
                console.log(e);
            });

            setTimeout(() => {   //штучна затримка для тестування анімації загрузки
                dispatch(loadOff());
            }, 1000)
        }
    }

    useEffect(() => {
        authUser();
    }, []);

    if (isLoad) {
        return <Loader />
    }

    else
        return (
            <div className="App">
                {<>{console.log(user)}</>}
                <BrowserRouter>
                    <Routes>
                        <Route path={appRoutes.home.path} element={appRoutes.home.element} />
                        <Route path={appRoutes.login.path} index element={appRoutes.login.element} />
                        <Route path={appRoutes.registration.path} element={appRoutes.registration.element} />
                        <Route path={appRoutes.about.path} element={appRoutes.about.element} />
                        <Route path={appRoutes.profile.path} element={appRoutes.profile.element} />
                        <Route path={appRoutes.gym.path} element={appRoutes.gym.element} />
                        <Route path={appRoutes.noPage.path} element={appRoutes.noPage.element} />
                        <Route path={appRoutes.delete.path} element={appRoutes.delete.element} />
                        <Route path={appRoutes.admin.addEx.path} element={appRoutes.admin.addEx.element} />
                        <Route path={appRoutes.profilePurchase.path} element={appRoutes.profilePurchase.element} />
                        <Route path={"/genTraining/:category"} element={appRoutes.genTraining.element} />
                        <Route path={appRoutes.feedback.path} element={appRoutes.feedback.element} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
}

export default App;
