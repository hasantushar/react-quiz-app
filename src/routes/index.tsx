import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login';
import Questions from '@/pages/Questions';
import Answers from '@/pages/Answers';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/quiz"
        element={
          <PrivateRoute>
            <Answers />
          </PrivateRoute>
        }
      />
      <Route
        path="/questions"
        element={
          <PrivateRoute>
            <Questions />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
