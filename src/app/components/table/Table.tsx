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
        <table className={"border-collapse w-full"}>
            <thead className={"bg-primary-500 text-surface-50-950"}>
            <tr>
                {headers.map((h) => (
                    <th className={"p-4 text-start"} key={String(h.key)}>{h.label}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, i) => (
                <tr className={"hover:cursor-pointer hover:bg-surface-300-700 even:bg-surface-200-800"} key={i} onClick={() => onRowClick?.(row)}>
                    {headers.map((h) => (
                        <td className={"p-4 text-start"} key={String(h.key)}>
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