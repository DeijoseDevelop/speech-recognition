"use client";

import { useFaceRecognition } from "@/stores/use-face-recognition";
import { useVoiceRecognition } from "@/stores/use-voice-recognition";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Link,
    Image,
} from "@nextui-org/react";

export default function InformationCard() {
    const { getImage, getPerson } = useFaceRecognition();
    const { getCategoryRecognized } = useVoiceRecognition();

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
                    <p className="text-black text-center mt-2npm run dev">{ getPerson().name! }</p>
                </section>
            </CardHeader>
            <CardBody>
                <p className="text-center" style={{ color: "rgba(0,0,0,0.3)" }}>Motivo</p>
                <p className="text-black text-center">{ getCategoryRecognized() }</p>
            </CardBody>
        </Card>
    );
}
