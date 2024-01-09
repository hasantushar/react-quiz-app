import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes
} from "react-router-dom";
import Login from "@/pages/Login";
import Questions from "@/pages/Questions";
import Answers from "@/pages/Answers";
import useAuthStore from "@/store/useAuthStore";

const Router = () => {
    const { isAuthenticated, userType } = useAuthStore((state) => state);

    const hasAlreadyAuthenticated = () => {
      if(userType == 'user') return <Navigate to='/quiz' replace />
      if(userType == 'admin') return <Navigate to='/questions' replace />
      return <></>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route path="/login" element={!isAuthenticated ? <Login /> : hasAlreadyAuthenticated()} />

                <Route element={isAuthenticated ? <Outlet /> : <Navigate to="/login" />}>

                <Route path="/quiz" element={userType == 'user' ? <Answers /> : <Navigate to="*" />} />
                <Route path="/questions" element={userType == 'admin' ? <Questions /> : <Navigate to="*" />} />

                </Route>

                <Route path="*" element={<div>page not found</div>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
