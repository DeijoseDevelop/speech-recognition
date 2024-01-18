interface RowProps {
    left: React.ReactNode;
    right: React.ReactNode;
}

export default function Row({ left, right }: RowProps) {
    return (
        <main className="flex justify-center items-center w-full h-screen px-20 pt-5 gap-20">
            <section className="w-3/6">
                { left }
            </section>
            <section className="w-3/6">
                { right }
            </section>
        </main>
    );
}