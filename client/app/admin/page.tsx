"use client"
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from "@/redux/apis/todo.api"
import { Todo } from "@/types/Todo"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"

const Dashboard = () => {
  const { data } = useGetTodosQuery()
  const [addTodo] = useAddTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()

  const todoSchema = z.object({
    task: z.string().min(1),
    desc: z.string().min(1),
    priority: z.string().min(1),
  })

  type todoType = z.infer<typeof todoSchema>

  const { reset, register, formState: { errors }, handleSubmit } = useForm<todoType>({
    defaultValues: {
      task: "",
      desc: "",
      priority: "",
    },
    resolver: zodResolver(todoSchema)
  })

  const handleCreate = (values: todoType) => {
    // console.log(values)
    handleAdd(values)
    reset()
  }

  const handleAdd = async (data: todoType) => {
    try {
      await addTodo(data).unwrap()
      console.log("todo create success");
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemove = async (_id: string) => {
    try {
      await deleteTodo(_id).unwrap()
      console.log("todo delete success")
    } catch (error) {
      console.log("unable to delete todo")
    }
  }


  const handleUpdate = async (data: todoType, isComplete: boolean) => {
    try {
      await updateTodo({ ...data, complete: isComplete }).unwrap()
      console.log("todo update success")
    } catch (error) {
      console.log("unable to update todo")
    }
  }


  return <>
    <form onSubmit={handleSubmit(handleCreate)}>
      <input {...register("task")} type="text" placeholder="enter task" />
      <input {...register("desc")} type="text" placeholder="enter desc" />
      <select {...register("priority")}>
        <option value="">Choose priority</option>
        <option value="high">high</option>
        <option value="medium">medium</option>
        <option value="low">low</option>
      </select>
      <button type="submit">add todo</button>
    </form>


    {
      data && <table className="border">
        <thead>
          <tr>
            <th>id</th>
            <th>task</th>
            <th>desc</th>
            <th>priority</th>
            <th>complete</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(item => <tr key={item._id} className={item.complete ? "bg-green-400" : "bg-red-400"}>
              <td>{item._id}</td>
              <td>{item.task}</td>
              <td>{item.desc}</td>
              <td>{item.priority}</td>
              <td>{item.complete ? "Complete" : "Pending"}</td>
              <td>
                {
                  item.complete
                    ? <button onClick={e => handleUpdate(item, false)}>Mark in-complete</button>
                    : <button onClick={e => handleUpdate(item, true)}>Mark Complete</button>
                }

                <button onClick={e => handleRemove(item._id as string)}>Remove</button>
              </td>
            </tr>)
          }
        </tbody>
      </table>
    }
  </>
}

export default Dashboard