import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const userProfileSchema = z.object({
    age: z.string().min(1, {
        message: "La edad es requerida",
    }),
    gender: z.string().min(1, { message: "Se debe seleccionar un Género" }),
    weight: z.string().min(1, {
        message: "El peso es requerido",
    }),
    height: z.string().min(1, {
        message: "La altura es requerida",
    }),
    fitness_goals: z.string(),
    activity_levels: z.string(),
    description: z.string()
});
type FormData = z.infer<typeof userProfileSchema>;

export default function ProfilePage() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(userProfileSchema),
    });

    function onSubmit(data: FormData) {
        setIsLoading(true);
        alert(data.age);
        setIsLoading(false);
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4 mt-12">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Perfil</h1>
                <p className="text-lg font-light text-gray-500 mt-1">Completa el siguiente formulario con tus datos de Fitness</p>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-6 gap-6" noValidate>
                    <div className="col-span-6 sm:col-span-3 space-y-2">
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                            Edad
                        </label>
                        <input
                            id="age"
                            type="number"
                            disabled={isLoading}
                            {...register("age")}
                            placeholder="Edad"
                            className="flex h-9 w-52 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        {errors?.age && (
                            <p className="px-1 text-xs text-red-500">
                                {errors.age.message}
                            </p>
                        )}
                    </div>
                    <div className="col-span-6 sm:col-span-3 space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Género</label>
                        <div className="flex flex-col space-y-2">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id="male"
                                    value="male"
                                    {...register("gender")}
                                    disabled={isLoading}
                                    className="h-4 w-4"
                                />
                                <span>Masculino</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id="female"
                                    value="female"
                                    {...register("gender")}
                                    disabled={isLoading}
                                    className="h-4 w-4"
                                />
                                <span>Femenino</span>
                            </label>
                        </div>
                        {errors?.gender && (
                            <p className="px-1 text-xs text-red-500">
                                {errors.gender.message}
                            </p>
                        )}
                    </div>

                    <div className="col-span-6 sm:col-span-3 space-y-2">
                        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Peso</label>
                        <input
                            id="weight"
                            type="number"
                            disabled={isLoading}
                            {...register("weight")}
                            placeholder="Escriba el Peso aquí."
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        {errors?.weight && (
                            <p className="px-1 text-xs text-red-500">
                                {errors.weight.message}
                            </p>
                        )}
                    </div>
                    <div className="col-span-6 sm:col-span-3 space-y-2">
                        <label htmlFor="height" className="block text-sm font-medium text-gray-700">Altura</label>
                        <input
                            id="height"
                            type="number"
                            disabled={isLoading}
                            {...register("height")}
                            placeholder="Escriba la Altura aquí."
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        {errors?.height && (
                            <p className="px-1 text-xs text-red-500">
                                {errors.height.message}
                            </p>
                        )}
                    </div>
                    <div className="col-span-6 space-y-2">
                        <label htmlFor="fitness_goals" className="block text-sm font-medium text-gray-700">Objetivos de fitness</label>
                        <select
                            id="fitness_goals"
                            disabled={isLoading}
                            {...register("fitness_goals")}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >

                        </select>
                    </div>
                    <div className="col-span-6 space-y-2">
                        <label htmlFor="activity_levels" className="block text-sm font-medium text-gray-700">Nivel de Actividad</label>
                        <select
                            id="activity_levels"
                            disabled={isLoading}
                            {...register("activity_levels")}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >

                        </select>
                    </div>

                    <div className="col-span-6">
                        <button
                            type="submit"
                            className='bg-primary text-white w-full p-2 rounded-lg mt-4 bg-gradient-to-r from-[#628EFF] via-[#8740CD] to-[#580475]'
                            disabled={isLoading}
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
