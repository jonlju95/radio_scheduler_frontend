import "./Table.css";

type Header<T> = {
    key: keyof T;
    label: string;
}

type TableProps<T extends object> = {
    headers: readonly Header<T>[];
    data: T[];
    onRowClick?: (row: T) => void;
}

function Table<T extends object>({headers, data, onRowClick}: TableProps<T>) {
    return (
        <table>
            <thead>
            <tr>
                {headers.map((h) => (
                    <th key={String(h.key)}>{h.label}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, i) => (
                <tr key={i} onClick={() => onRowClick?.(row)}>
                    {headers.map((h) => (
                        <td key={String(h.key)}>
                            {String((row[h.key]))}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Table;