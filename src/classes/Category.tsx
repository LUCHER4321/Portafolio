import { CustomTable } from "../components/CustomTable";

export class Category {
    id: string;
    name: Map<string, string>;
    constructor(id: string, name: string) {
        this.id = id;
        this.name = new Map(name.split(";").map(s => [s.split(":")[0], s.split(":")[1]]));;
    }

    static Table({ categories, href, className, language }: tableProps) {
        return (
            <CustomTable
                data={categories}
                row={c => [
                    <a href={href?.(c)}>
                        <button className="text-black dark:text-white my-1 hover:py-[0.75em]! hover:px-[1.5em]!">
                            {c.name.get(language) ?? [...c.name.values()][0]}
                        </button>
                    </a>] as any[]}
                className={className}
            />
        );
    }
}

interface tableProps {
    categories: Category[];
    language: string;
    className?: string;
    href?: (cat: Category) => string;
}