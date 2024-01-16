import { CSSProperties } from 'react';
import '@/styles/components/typing.css';

interface TypeWriterTitleProps {
    text: string;
    className?: string | undefined;
}

export default function TypeWriterTitle({ text, className = "text-5xl font-bold text-black" }: TypeWriterTitleProps) {
    return (
        <div className="typewriter">
            <h1 className={ className }>{ text }</h1>
        </div>
    );
}
