interface customTableProps<T> {
    headers?: string[];
    data: T[];
    row: (t: T) => any[];
    className?: string;
    thClassName?: string;
    tdClassName?: string;
}

export const CustomTable = <T,>({
    headers,
    data,
    row,
    className,
    thClassName,
    tdClassName
}: customTableProps<T>) => {
    return(
        <table className={className}>
            {headers && <thead>
                <tr>
                    {headers.map((item, index) => (
                        <th key={index} className={thClassName}>{item}</th>
                    ))}
                </tr>
            </thead>}
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {row(item).map((cell, cellIndex) => (
                            <td key={cellIndex} className={tdClassName}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};