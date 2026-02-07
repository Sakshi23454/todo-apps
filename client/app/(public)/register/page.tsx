"use client"
import { useSignupMutation } from '@/redux/apis/auth.api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

const Register = () => {
    // usenavigate - userouter,    router is obj
    const router = useRouter()
    const [signup] = useSignupMutation()

    const registerSchema = z.object({
        name: z.string().min(1),
        email: z.string().min(1),
        password: z.string().min(1),
    })

    type registerType = z.infer<typeof registerSchema>

    const { reset, register, formState: { errors }, handleSubmit } = useForm<registerType>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        resolver: zodResolver(registerSchema)
    })

    const handleRegister = async (data: registerType) => {
        try {
            await signup(data).unwrap()
            // console.log(data)
            toast.success("register success")
            router.push("/")
            reset()
        } catch (error) {
            console.log(error)
            toast.error("unable to register")
        }
    }

    return <>
        <form onSubmit={handleSubmit(handleRegister)}>
            <input type="text" {...register("name")} />
            <input type="email" {...register("email")} />
            <input type="password" {...register("password")} />
            <button type='submit'>register</button>

        </form>
    </>
}

export default Register