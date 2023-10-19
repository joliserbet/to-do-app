import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUp, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signUp(values);
  });

  return (
    <div className="flex items-center  bg-zinc-800 dark:bg-slate-200 p-10">
      <div className="bg-zinc-600 dark:bg-slate-400 max-w-md p-10 rounded-md">
        {RegisterErrors.map((error, i) => (
          <div className="mb-1 bg-red-500 p-2 text-white" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit} className="flex-col">
          <h1 className="text-3xl dark:text-slate-800 font-bold my-1">Sign Up</h1>
          <input
            type="text"
            placeholder="username"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 dark:bg-slate-600 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.username && (
            <p className="text-red-500">username is required</p>
          )}
          <input
            type="email"
            placeholder="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 dark:bg-slate-600 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.email && <p className="text-red-500">email is required</p>}

          <input
            type="password"
            placeholder="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 dark:bg-slate-600 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}

          <button
            type="submit"
            className="mt-1 mb-3 w-full bg-green-900 text-white rounded px-6 py-1 border border-slate-300"
          >
            Register
          </button>
        </form>
        <p className="flex mt-3 justify-between dark:text-slate-800">
          Already have an account?
          <Link className="bg-sky-800 py-1 text-white rounded px-6  " to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
