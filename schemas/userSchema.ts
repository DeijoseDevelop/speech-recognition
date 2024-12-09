import { z } from 'zod';

export const UserTypeEnum = z.enum([
    'Admin',
    'Bibliotecario',
    'Secretario',
]);

export const AcademicProgramEnum = z.enum([
    '',
    'Administración de Empresas',
    'Administración Turísticas y Hoteleras',
    'Contaduría Pública',
    'Derecho',
    'especializacion',
    'Externo',
    'Ingeniería de Sistemas',
    'Ingeniería Industrial',
    'Inglés Diario',
    'Inglés Intensivo',
    'Inglés niños y adolecentes',
    'Inglés Sabados',
    'Inglés Semestral',
    'Licenciatura en Bilingüismo',
    'Licenciatura en Bilingüismo con enfasis en Inglés',
    'Programa Auxiliar Administrativo',
    'Programa de Traducción',
    'Tecnología en Desarrollo de Sistemas de Información y de Software',
    'Tecnología en Gestión de Servicios Turísticos y Hoteleros',
    'Tecnología en Sistemas de Gestión de Calidad',
]);

export const GenderEnum = z.enum(['', 'Masculino', 'Femenino', 'Otro']);

export const DependencyEnum = z.enum(['Unicolombo', 'Colombo', 'Externo']);

export const UserSchema = z.object({
    name: z.string().min(1, { message: "El nombre es requerido" }),
    last_name: z.string().min(1, { message: "El apellido es requerido" }),
    document_number: z
        .string()
        .nonempty({ message: "El número de documento es requerido" })
        .refine((val) => {
            const num = Number(val);
            return !isNaN(num);
        }, { message: "Debe ser un número válido" })
        .refine((val) => {
            const num = Number(val);
            return num > 0 && Number.isInteger(num);
        }, { message: "El número de documento debe ser un entero positivo" }),
        // .transform((val) => Number(val)),
    email: z.string().email({ message: "Debe proporcionar un email válido" }),

    // Campos opcionales
    gender: GenderEnum.optional().transform((val) => {
        return val === "" ? undefined : val;
    }),
    academic_program: AcademicProgramEnum.optional(),
    password: z.string().optional().refine(
        (val) => val === undefined || val === "" || val.length >= 6,
        { message: "La contraseña debe tener al menos 6 caracteres si se ingresa" }
    ),

    // Campos obligatorios
    user_type: UserTypeEnum,
    dependency: DependencyEnum,

    // Campo para el archivo de imagen
    picture: z
        .any() // Primero permitimos cualquier valor
        .transform((val) => {
            // Si es un FileList y contiene al menos un archivo, tomamos el primero
            if (val instanceof FileList && val.length > 0) {
                return val[0];
            }
            // Si no hay archivo seleccionado o no es FileList, devolvemos undefined
            return undefined;
        })
        .optional()
        .refine(
            (file) => {
                // Si no hay archivo (opcional), no hay error
                if (!file) return true;

                // Si hay archivo, debe ser una instancia de File
                if (!(file instanceof File)) return false;

                // Verificamos el tipo de archivo
                const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
                return allowedTypes.includes(file.type);
            },
            { message: "El archivo debe ser una imagen válida (jpeg, png, gif)" }
        ),
});

export type UserSchemaFormData = z.infer<typeof UserSchema>;