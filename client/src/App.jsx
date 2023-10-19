import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/TasksPage";
import TasksFormPage from "./pages/TasksFormPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoutes from "./ProtectedRoutes";
import { TaskProvider } from "./context/TasksContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className="flex flex-col place-content-center place-items-center min-h-screen px-5 bg-zinc-800 dark:bg-slate-200">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectedRoutes />}>
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/tasks/new" element={<TasksFormPage />} />
                <Route path="/tasks/:id" element={<TasksFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
