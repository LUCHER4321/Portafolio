interface customTableProps<T> {
    headers?: string[];
    data: T[];
    row: (t: T) => any[];
    style?: string;
    thStyle?: string;
    tdStyle?: string;
}

export const CustomTable = <T,>({
    headers,
    data,
    row,
    style,
    thStyle,
    tdStyle
}: customTableProps<T>) => {
    return(
        <table className={style}>
            {headers && <thead>
                {headers.map((item, index) => (
                    <th key={index} className={thStyle}>{item}</th>
                ))}
            </thead>}
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {row(item).map((cell, cellIndex) => (
                            <td key={cellIndex} className={tdStyle}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};