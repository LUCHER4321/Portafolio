import React from "react";

interface customTableProps<T> {
    headers?: string[];
    data: T[];
    row: (t: T) => any[];
    style?: React.CSSProperties;
    thStyle?: React.CSSProperties;
    tdStyle?: React.CSSProperties;
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
        <table style={style}>
            {headers && <thead>
                {headers.map((item, index) => (
                    <th key={index} style={thStyle}>{item}</th>
                ))}
            </thead>}
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {row(item).map((cell, cellIndex) => (
                            <td key={cellIndex} style={tdStyle}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};