"use client";

// import HomeImage from '@/components/home/home-image';
// import Row from "@/components/common/row";
// import TitleText from '@/components/common/title-text';

import ScannerBackground from '@/components/scanner/scanner-background';
import { Select, SelectItem, SharedSelection } from "@nextui-org/react";
import { SiteEnum } from "@/entities/IngressRecords";
import { useScannerRecognition } from '@/stores/use-scanner-recognition';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/config/routes';
import { Storage } from '@/constants/Storage';

export default function HomePage() {
  const router = useRouter();
  const { setSite } = useScannerRecognition();

  // return (
  //   <>
  //     {/* <LibraryBackground /> */}
  //     {/* <SpeechComponent /> */}
  //     {/* <WebcamComponent /> */}
  //     <Row
  //       left={
  //         <TitleText
  //           title="Bienvenido a tu biblioteca"
  //           text="Explora nuestras vastas colecciones digitales con la confianza de saber que esta biblioteca está diseñada pensando en ti."
  //           routeToNavigate="/about"
  //         />
  //       }
  //       right={<HomeImage />}
  //     />
  //   </>
  // );

  return (
    <div className="absolute w-full h-screen">
      <ScannerBackground />
      <div className="flex flex-col justify-center items-center w-full h-screen gap-5">
        <h1 className="text-3xl font-bold text-black">Seleccione la sede</h1>
        <div className="w-40">
          <Select
            label="Sitio"
            onSelectionChange={(keys: SharedSelection) => {
              console.log(keys.currentKey);
              setSite(keys.currentKey ?? "");
              localStorage.setItem(Storage.site, keys.currentKey ?? "")

              setTimeout(() => {
                router.push(ROUTES.scanner);
              }, 500);
            }}
          >
            {Object.values(SiteEnum).map((site) => (
              <SelectItem key={site.toString()} value={site} textValue={site}>
                {site}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}