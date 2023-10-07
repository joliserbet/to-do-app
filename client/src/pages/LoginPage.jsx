import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const { login, errors: loginErrors } = useAuth();

  const onSubmit = handleSubmit((data) => {
    login(data);
  });

  return (
    <div className="flex w-full items-center justify-center bg-zinc-800 p-10">
      <div className="bg-zinc-600 max-w-md p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <h1 className="text-3xl text-white font-bold mb-1">Login</h1>
          {loginErrors.map((error, i) => (
            <div className="mb-1 bg-red-500 p-2 text-white" key={i}>
              {error}
            </div>
          ))}
          <input
            type="email"
            placeholder="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2"
          />
          {errors.email && <p className="text-red-500">email is required</p>}

          <input
            type="password"
            placeholder="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.password && (
            <p className="text-red-500">password is required</p>
          )}

          <button
            type="submit"
            className="mt-1 bg-sky-800 text-white rounded px-6 py-1 border border-slate-300"
          >
            Login
          </button>
        </form>
            <p className="flex mt-3 justify-between ">
              Don't have an account? <Link className="text-sky-500" to="/register">Register</Link>
            </p>
      </div>
    </div>
  );
}

export default LoginPage;
