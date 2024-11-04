"use client";

import { useFaceRecognition } from "@/stores/use-face-recognition";
import { useVoiceRecognition } from "@/stores/use-voice-recognition";
import { translateGender } from "@/utils/translate-gender";
import {
    Card,
    CardHeader,
    CardBody,
    Image,
} from "@nextui-org/react";

export default function InformationCard() {
    const { getImage, getPerson } = useFaceRecognition();
    const { getCategoryRecognized } = useVoiceRecognition();
    const person = getPerson();

    return (
        <Card className="max-w-[400px] py-5 px-20">
            <CardHeader className="flex py-5 justify-center">
                <section className="flex flex-col justify-center">
                    <Image
                        src={getImage()!}
                        width={150}
                        height={150}
                        alt="Person image"
                        style={{ clipPath: "circle(50%)" }}
                    />
                    <p className="text-black text-center mt-2">{person.name}</p>
                </section>
            </CardHeader>
            <CardBody>
                <div className="text-center mb-2">
                    <p className="text-gray-500">Motivo</p>
                    <p className="text-black">{getCategoryRecognized()}</p>
                </div>
                <div className="text-center mb-2">
                    <p className="text-gray-500">Número de Documento</p>
                    <p className="text-black">{person.document_number}</p>
                </div>
                <div className="text-center mb-2">
                    <p className="text-gray-500">Género</p>
                    <p className="text-black">{translateGender(person.gender)}</p>
                </div>
                <div className="text-center mb-2">
                    <p className="text-gray-500">Tipo de Usuario</p>
                    <p className="text-black">{person.user_type}</p>
                </div>
                <div className="text-center mb-2">
                    <p className="text-gray-500">Dependencia</p>
                    <p className="text-black">{person.dependency}</p>
                </div>
                <div className="text-center mb-2">
                    <p className="text-gray-500">Programa Académico</p>
                    <p className="text-black">{person.academic_program}</p>
                </div>
            </CardBody>
        </Card>
    );
}
