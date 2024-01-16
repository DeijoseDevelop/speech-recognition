import Row from "@/components/row";
import AboutImage from '@/components/about/about-image';
import TitleText from "@/components/title-text";

export default function AboutPage() {
    return (
        <>
            <Row
                left={
                    <TitleText
                        title="¿Te preguntas como comenzar?"
                        text="Explora nuestras vastas colecciones digitales con la confianza de saber que esta biblioteca está diseñada pensando en ti."
                        routeToNavigate="/scanner"
                    />
                }
                right={<AboutImage />}
            />
        </>
    );
}