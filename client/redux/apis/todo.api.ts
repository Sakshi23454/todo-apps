import { APP_URL } from "@/constants/config"
import { Todo } from "@/types/Todo"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const todoApi = createApi({
    reducerPath: "todoApi",
    // all api pe credential
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:5000/api/todo", 
        baseUrl: `${APP_URL}/api/auth`,
        credentials: "include"
    }),
    tagTypes: ["todo"],
    endpoints: (builder) => {
        return {
            getTodos: builder.query<Todo[], void>({
                query: () => {
                    return {
                        url: "/",
                        method: "GET"
                    }
                },
                providesTags: ["todo"]
            }),

            addTodo: builder.mutation<void, Todo>({
                query: todoData => {
                    return {
                        url: "/create",
                        method: "POST",
                        body: todoData
                    }
                },
                invalidatesTags: ["todo"]
            }),

            updateTodo: builder.mutation<void, Todo>({
                query: todoData => {
                    return {
                        url: "/modify/" + todoData._id as string,
                        method: "PATCH",
                        body: todoData
                    }
                },
                invalidatesTags: ["todo"]
            }),

            deleteTodo: builder.mutation<void, string>({
                query: _id => {
                    return {
                        url: "/remove/" + _id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["todo"]
            }),

        }
    }
})

export const { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } = todoApi


