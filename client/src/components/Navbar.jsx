import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [theme, setTheme] = useState("Light");

  useEffect(() => {
    if (theme === "Dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  const handleTheme = () => {
    if (theme === "Dark") {
      setTheme("Light");
    } else {
      setTheme("Dark");
    }
  };

  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="flex fixed top-0 w-full items-center py-2 px-3 bg-zinc-700 dark:bg-slate-400 dark:text-slate-800 justify-between">
      <div className="flex items-center">
        <Link to={"/"}>
          <h2 className="font-bold text-center">Task Manager</h2>
        </Link>
        <button
          className="bg-sky-900 ml-3 dark:bg-sky-700 py-1 text-white rounded px-6"
          onClick={handleTheme}
        >
          {theme} Mode
        </button>
      </div>
      <ul className="flex gap-3 items-center">
        {isAuthenticated ? (
          <>
            <li>
              <h3 className="font-bold">Welcome {user.username}!</h3>
            </li>
            <li>
              <Link className="font-bold p-3 py-1 rounded bg-indigo-800 text-white " to="/tasks/new">
                Add a new Task
              </Link>
              <Link className="font-bold ml-3 px-3 py-1 rounded bg-red-600 text-white  " to="/login" onClick={()=>logout()}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="font-bold" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="font-bold" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
