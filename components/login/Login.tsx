"use client"

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { signIn, useSession } from 'next-auth/react';
import { Button, Input } from '@nextui-org/react';
import { LoginSchema, LoginSchemaType } from '@/schemas/loginSchema';
import { useRouter } from 'next/navigation';
import { SwalAlert } from '@/utils/alert';
import { useAuth } from '@/stores/useAuth';
import { setTimeout } from 'timers';
import { ROUTES } from "@/config/routes";
import Image from 'next/image';
import { UnicolomboLogo } from '@/utils/images';
import Logo from '../common/Logo';

const Login = () => {
    const { login } = useAuth();
    const { status } = useSession();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const loginUser = async (data: LoginSchemaType) => {
        try {
            await login({
                email: data.email.trim(),
                password: data.password.trim(),
            });

            await signIn("credentials", {
                ...data,
                redirect: false,
            });

            SwalAlert.showAlert({
                icon: "success",
                title: "Inicio de sesión exitoso.",
            });
        } catch (error) {
            SwalAlert.showAlert({
                icon: 'error',
                title: "Credenciales inválidas.",
            });
        }
    };

    const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
        loginUser(data);
    };

    useEffect(() => {
        if (status === "authenticated") {
            setTimeout(() => {
                router.replace(ROUTES.admin);
            }, 2000);
        }
    }, [status, router]);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-blue-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: 'url("https://lib.cmb.ac.lk/wp-content/uploads/2023/07/DSC_6658-1024x579.jpg")' }}></div>
            <div className="relative bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 z-10">
                <div className="p-2 rounded mb-4">
                    <div className="h-28 flex justify-center">
                        <Logo
                            src={UnicolomboLogo.src}
                            alt="Unicolombo Logo"
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <Input
                            id="email"
                            fullWidth
                            variant="bordered"
                            label="CORREO ELECTRÓNICO"
                            aria-label="CORREO ELECTRÓNICO"
                            className="bg-slate-100 text-gray-400"
                            {...register('email')}
                            color={errors.email ? "danger" : "default"}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                    </div>
                    <div className="mb-6">
                        <Input
                            id="password"
                            fullWidth
                            variant="bordered"
                            label="CONTRASEÑA"
                            aria-label="CONTRASEÑA"
                            className="bg-slate-100 text-gray-400"
                            type={showPassword ? "text" : "password"}
                            endContent={
                                <button
                                    type="button"
                                    aria-label="Ver contraseña"
                                    className="absolute inset-y-0 right-0 px-3 flex items-center text-sm leading-5"
                                    onClick={togglePasswordVisibility}>
                                    {showPassword ? (
                                        <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <FaEye className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            {...register('password')}
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                    </div>
                    <div className="mt-4">
                        <Button
                            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            aria-label='Ingresar'
                            type="submit"
                        >
                            Ingresar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
