import { CSSProperties } from 'react';
import '@/styles/components/typing.css';

interface TypeWriterTextProps {
    text: string;
    parentStyle?: CSSProperties | undefined | null;
    textStyle?: CSSProperties | undefined | null;
}

function TypeWriterText({ text, parentStyle = null, textStyle = null }: TypeWriterTextProps) {
    return (
        <div style={parentStyle ?? { width: "230px" }}>
            <div className="typewriter">
                <span style={ textStyle ?? {} }>{text}</span>
            </div>
        </div>
    );
}

export default TypeWriterText;