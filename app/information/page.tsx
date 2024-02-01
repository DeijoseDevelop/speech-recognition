import InformationCard from "@/components/information/information-card";
import ScannerBackground from "@/components/scanner/scanner-background";

export default function InformationPage() {
    return (
        <div className="absolute w-full h-screen grid place-items-center">
            <ScannerBackground />
            <InformationCard/>
        </div>
    );
}