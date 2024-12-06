import Row from "@/components/common/row";
import ScannerText from '@/components/scanner/scanner-text';
import ScannerBackground from '@/components/scanner/scanner-background';
import ScannerRecognition from '@/components/scanner/scanner-recognition/scanner-recognition';
import ScannerRecognitionModalFace from '@/components/scanner/scanner-recognition/scanner-recognition-modal/scanner-recognition-modal-face';
import ScannerRecognitionModalVoice from '@/components/scanner/scanner-recognition/scanner-recognition-modal/scanner-recognition-modal-voice';


export default function ScannerPage() {

    return (
        <div className="absolute">
            <ScannerBackground />
            <ScannerRecognitionModalFace />
            <ScannerRecognitionModalVoice />
            <Row left={<ScannerText />} right={<ScannerRecognition />} />
        </div>
    );
}