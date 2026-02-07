import { APP_URL } from "@/constants/config"
import { User } from "@/types/User"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    // credential - accept cookie
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:5000/api/auth",
        baseUrl: `${APP_URL}/api/auth`,
        credentials: "include"
    }),
    tagTypes: [],
    endpoints: (builder) => {
        return {

            signup: builder.mutation<void, User>({
                query: userData => {
                    return {
                        url: "/signup",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: []
            }),

            signin: builder.mutation<void, User>({
                query: userData => {
                    return {
                        url: "/signin",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: []
            }),

        }
    }
})

export const { useSigninMutation, useSignupMutation } = authApi
