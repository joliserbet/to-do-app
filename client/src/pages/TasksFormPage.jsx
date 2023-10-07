import { useForm } from "react-hook-form";

function TasksFormPage() {
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="flex w-full items-center justify-center bg-zinc-800 p-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-zinc-600 max-w-md p-10 rounded-md"
      >
        <input
          type="text"
          placeholder="Title"
          {...register("task")}
          autoFocus
          className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2"
        />
        <textarea
          rows="3"
          placeholder="Description"
          {...register("description")}
          className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2"
        ></textarea>
        <button className="mt-1 bg-sky-800 text-white rounded px-6 py-1 border border-slate-300">
          Save
        </button>
      </form>
    </div>
  );
}

export default TasksFormPage;
