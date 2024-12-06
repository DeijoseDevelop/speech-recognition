import HomeImage from '@/components/home/home-image';
import Row from "@/components/common/row";
import TitleText from '@/components/common/title-text';


export default function HomePage() {

  return (
    <>
      {/* <LibraryBackground /> */}
      {/* <SpeechComponent /> */}
      {/* <WebcamComponent /> */}
      <Row
        left={
          <TitleText
            title="Bienvenido a tu biblioteca"
            text="Explora nuestras vastas colecciones digitales con la confianza de saber que esta biblioteca está diseñada pensando en ti."
            routeToNavigate="/about"
          />
        }
        right={<HomeImage />}
      />
    </>
  );
}