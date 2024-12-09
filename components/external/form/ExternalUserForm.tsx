"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Card,
    CardBody,
    Input,
    Select,
    SelectItem,
    Button,
    Breadcrumbs,
    BreadcrumbItem,
} from "@nextui-org/react";

import {
    UserSchema,
    UserSchemaFormData,
    UserTypeEnum,
    AcademicProgramEnum,
    GenderEnum,
    DependencyEnum,
} from "@/schemas/userSchema";

import { User } from "@/entities/user";
import { safeEnumValue } from "@/utils/safeEnumValue";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { useUsers } from "@/stores/users/useUsers";
import { useMutation, useQueryClient } from "react-query";
import { SwalAlert } from "@/utils/alert";

interface ExternalUserFormProps {
    user?: User;
}

const ExternalUserForm: React.FC<ExternalUserFormProps> = ({ user }) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { createUser, updateUser } = useUsers();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, dirtyFields },
    } = useForm<UserSchemaFormData>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            name: "",
            last_name: "",
            document_number: undefined,
            email: "",
            user_type: "Admin",
            dependency: "Unicolombo",
            gender: undefined,
            academic_program: undefined,
            picture: undefined,
        },
    });

    useEffect(() => {
        if (user) {
            const matchedUserType = safeEnumValue(UserTypeEnum.options, user.user_type) ?? "Admin";
            const matchedDependency = safeEnumValue(DependencyEnum.options, user.dependency) ?? "Unicolombo";
            const matchedProgram = safeEnumValue(AcademicProgramEnum.options, user.academic_program);
            const finalprogram = matchedProgram === "" ? undefined : matchedProgram;

            const matchedGender = safeEnumValue(GenderEnum.options, user.gender);
            const finalGender = matchedGender === "" ? undefined : matchedGender;

            reset({
                name: user.name ?? "",
                last_name: user.last_name ?? "",
                document_number: user.document_number ? String(user.document_number) : "0",
                email: user.email ?? "",
                user_type: matchedUserType,
                dependency: matchedDependency,
                gender: finalGender,
                academic_program: finalprogram,
                picture: undefined
            });
        }
    }, [user, reset]);

    const mutation = useMutation(async (formData: FormData) => {
        if (user) {
            await updateUser(user.id!, formData);
        } else {
            await createUser(formData, false);
        }
    }, {
        onSuccess: () => {
            SwalAlert.showAlert({ icon: "success", title: user ? "Usuario actualizado correctamente" : "Usuario creado correctamente" });
            queryClient.invalidateQueries("external_users");
            router.replace(ROUTES.external);
        },
        onError: (error: unknown) => {
            if (error instanceof Error) {
                console.error(error);
                SwalAlert.showAlert({ icon: "error", title: error.message });
            }
        },
    });

    const onSubmit = (data: UserSchemaFormData) => {
        console.log("Datos del formulario:", data);
        console.log(dirtyFields);

        const formData = new FormData();

        if (user) {
            // UPDATE: Solo tomar campos modificados
            for (const key in dirtyFields) {
                if (dirtyFields[key as keyof UserSchemaFormData]) {
                    const value = data[key as keyof UserSchemaFormData];
                    if (key === "picture" && value && value instanceof File) {
                        formData.append(key, value);
                    } else {
                        formData.append(key, String(value));
                    }
                }
            }

        } else {
            // CREATE: Enviar todos los campos
            Object.entries(data).forEach(([key, value]) => {
                if (key === "picture" && value && value instanceof File) {
                    formData.append(key, value);
                } else {
                    formData.append(key, String(value ?? ""));
                }
            });
            formData.append("is_internal", String(false));
        }

        mutation.mutate(formData);
    };

    return (
        <div className="container mx-auto p-4 h-[calc(100vh-4rem)] md:h-5/6 lg:h-screen overflow-y-auto">
            <h1 className="text-2xl font-bold mb-4">
                {user ? "Editar Usuario Externo" : "Nuevo Usuario Externo"}
            </h1>

            <Breadcrumbs className="mb-4">
                <BreadcrumbItem onClick={() => router.replace(ROUTES.external)}>
                    Usuarios
                </BreadcrumbItem>
                <BreadcrumbItem>{user ? "Editar Usuario Externo" : "Nuevo Usuario Externo"}</BreadcrumbItem>
            </Breadcrumbs>

            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Primera Sección: Datos Personales y de Identificación */}
                    <Card>
                        <CardBody>
                            <h2 className="text-xl font-semibold mb-4 bg-blue-500 text-white p-2">Datos Personales</h2>
                            <div className="space-y-4">
                                {/* Nombre y Apellido */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Input
                                            label="Nombre"
                                            {...register("name")}
                                            isInvalid={!!errors.name}
                                        />
                                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                                    </div>

                                    <div>
                                        <Input
                                            label="Apellido"
                                            {...register("last_name")}
                                            isInvalid={!!errors.last_name}
                                        />
                                        {errors.last_name && <span className="text-red-500 text-sm">{errors.last_name.message}</span>}
                                    </div>
                                </div>

                                {/* Documento y Email */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Input
                                            label="N° de Documento"
                                            type="number"
                                            {...register("document_number")}
                                            isInvalid={!!errors.document_number}
                                        />
                                        {errors.document_number && <span className="text-red-500 text-sm">{errors.document_number.message}</span>}
                                    </div>

                                    <div>
                                        <Input
                                            label="Email"
                                            type="email"
                                            {...register("email")}
                                            isInvalid={!!errors.email}
                                        />
                                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                                    </div>
                                </div>

                                {/* Género (opcional) */}
                                <Select label="Género (opcional)" {...register("gender")}>
                                    {GenderEnum.options.map((g: string) => (
                                        <SelectItem key={g} value={g} textValue={g}>
                                            {g}
                                        </SelectItem>
                                    ))}
                                </Select>
                                {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}

                                {/* Dependencia */}
                                <Select label="Dependencia" {...register("dependency")}>
                                    {DependencyEnum.options.map((g: string) => (
                                        <SelectItem key={g} value={g} textValue={g}>
                                            {g}
                                        </SelectItem>
                                    ))}
                                </Select>
                                {errors.dependency && <span className="text-red-500 text-sm">{errors.dependency.message}</span>}

                                {/* Imagen (opcional) */}
                                <div>
                                    <div className="h-px"></div>
                                    <Input
                                        label="Imagen (opcional)"
                                        type="file"
                                        accept="image/*"
                                        {...register("picture")}
                                        isInvalid={!!errors.picture}
                                    />
                                    {errors.picture && <span className="text-red-500 text-sm">{errors.picture.message}</span>}
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Segunda Sección: Tipo de Usuario, Programa y Contraseña */}
                    <Card>
                        <CardBody>
                            <h2 className="text-xl font-semibold mb-4 bg-blue-500 text-white p-2">Información de Acceso</h2>
                            <div className="space-y-4">
                                {/* Tipo de Usuario (select) */}
                                <Select label="Tipo de Usuario" {...register("user_type")}>
                                    {UserTypeEnum.options.map((type: string) => (
                                        <SelectItem key={type} value={type} textValue={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </Select>
                                {errors.user_type && <span className="text-red-500 text-sm">{errors.user_type.message}</span>}

                                {/* Programa Académico (opcional) */}
                                <Select label="Programa Académico (opcional)" {...register("academic_program")}>
                                    {AcademicProgramEnum.options.map((program: string) => (
                                        <SelectItem key={program} value={program} textValue={program}>
                                            {program}
                                        </SelectItem>
                                    ))}
                                </Select>
                                {errors.academic_program && <span className="text-red-500 text-sm">{errors.academic_program.message}</span>}

                            </div>
                        </CardBody>
                    </Card>
                </div>

                <Button type="submit" className="mt-4">
                    {user ? "Guardar Cambios" : "Enviar"}
                </Button>
            </form>
        </div>
    );
};

export default ExternalUserForm;
