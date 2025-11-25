type CsvTableProps = {
    headers: string[];
    rows: Array<Record<string, string>>;
    maxRows?: number;
};


function CsvTable({ headers, rows, maxRows = 50 }: CsvTableProps) {
    if (!headers.length) {
        return null;
    }

    const limitedRows = rows.slice(0, maxRows);

    return (
        <div
            style={{
                marginTop: 16,
                maxHeight: 400,
                overflow: "auto",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
            }}
        >
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 14,
                }}
            >
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                style={{
                                    textAlign: "left",
                                    padding: 8,
                                    borderBottom: "1px solid #e5e7eb",
                                    backgroundColor: "#f9fafb",
                                    position: "sticky",
                                    top: 0,
                                }}
                            >
                                {header || "(empty)"}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {limitedRows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {headers.map((header, colIndex) => (
                                <td
                                    key={colIndex}
                                    style={{
                                        padding: 8,
                                        borderBottom: "1px solid #f3f4f6",
                                    }}
                                >
                                    {row[header] ?? ""}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>

            </table>

            {rows.length > maxRows && (
                <div
                    style={{
                        padding: 8,
                        fontSize: 12,
                        color: "#6b7280",
                    }}
                >
                    Showing first {maxRows} rows out of {rows.length}
                </div>
            )}
        </div>
    );
}

export default CsvTable;
