import { CustomTable } from "./CustomTable";

export class Category {
    id: string;
    name: Map<string, string>;
    constructor(id: string, name: string) {
        this.id = id;
        this.name = new Map(name.split(";").map(s => [s.split(":")[0], s.split(":")[1]]));;
    }

    static Table({ categories, href, className }: tableProps) {
        return (
            <CustomTable
                data={categories}
                row={c => [
                    <a href={href?.(c)}>
                        <button className="text-black dark:text-white my-1">
                            {c.name.get("spanish") ?? [...c.name.values()][0]}
                        </button>
                    </a>] as any[]}
                className={className}
            />
        );
    }
}

interface tableProps {
    categories: Category[];
    className?: string;
    href?: (cat: Category) => string;
}