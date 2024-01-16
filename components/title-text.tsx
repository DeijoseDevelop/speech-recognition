import NextPageButton from "@/components/next-page-button";

interface TitleTextProps {
    title: string;
    text: string;
    routeToNavigate: string;
    titleClassName?: string | undefined;
}

export default function TitleText({
    title,
    text,
    routeToNavigate,
    titleClassName = "text-5xl font-bold text-black"
}: TitleTextProps) {

    return (
        <section className="flex flex-col gap-8">
            <h1 className={titleClassName }>{ title }</h1>
            <p className="text-sm font-extralight text-black w-80">
                { text }
            </p>
            <div>
                <NextPageButton route={ routeToNavigate } />
            </div>
        </section>
    );
}