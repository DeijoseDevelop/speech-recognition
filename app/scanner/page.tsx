import ScannerText from '@/components/scanner/scanner-text';
import HomeImage from '@/components/home/home-image';
import Row from "@/components/row";
import ScannerBackground from '@/components/scanner/scanner-background';


export default function ScannerPage() {

    return (
        <>
            <ScannerBackground />
            <Row left={<ScannerText />} right={<HomeImage />} />
        </>
    );
}