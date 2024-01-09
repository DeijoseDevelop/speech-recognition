// import SpeechComponent from "@/components/speech-component";
// import WebcamComponent from "@/components/webcam-component";

import LibraryBackground from "@/components/library-background";
import TypeWriterText from "@/components/type-writer-text.tsx";

export default function Home() {

  return (
    <>
      <LibraryBackground />
      {/* <SpeechComponent /> */}
      {/* <WebcamComponent /> */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TypeWriterText
          text="Welcome to the Library"
          textStyle={{
            fontSize: 30,
            fontWeight: "bold",
          }}
          parentStyle={{
            width: "400px",
            marginTop: 50,
          }}
        />
      </div>
    </>
  );
}