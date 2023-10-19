import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    login(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex items-center bg-zinc-800 dark:bg-slate-200 p-10">
      <div className="bg-zinc-600 dark:bg-slate-400 max-w-md p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <h1 className="text-3xl text-white dark:text-slate-800 font-bold mb-1">Login</h1>
          {loginErrors.map((error, i) => (
            <div className="mb-1 bg-red-500 p-2 text-white" key={i}>
              {error}
            </div>
          ))}
          <input
            type="email"
            placeholder="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 dark:bg-slate-600 px-4 py-2 rounded-md my-2"
          />
          {errors.email && <p className="text-red-600">email is required</p>}

          <input
            type="password"
            placeholder="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 dark:bg-slate-600 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.password && (
            <p className="text-red-500">password is required</p>
          )}

          <button
            type="submit"
            className="mt-1 mb-3 w-full bg-green-900 text-white rounded px-6 py-1 border border-slate-300"
          >
            Login
          </button>
        </form>
        <p className="flex mt-3 justify-between items-center dark:text-slate-800">
          Don't have an account?
          <Link className="bg-sky-800 py-1 text-white rounded px-6" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
