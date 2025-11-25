import { type ChangeEvent, useState } from "react";
import CsvTable from "./CsvTable";

function CsvUpload() {
    const [fileName, setFileName] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [headers, setHeaders] = useState<string[]>([]);
    const [rows, setRows] = useState<Array<Record<string, string>>>([]);


    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setFileName(file.name);

        const text = await file.text();
        console.log("CSV raw:", text);

        const short = text.slice(0, 200);
        setPreview(short);

        const lines = text
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter((line) => line.length > 0);

        if (lines.length === 0) {
            setHeaders([]);
            setRows([]);
            return;
        }

        const [headerLine, ...dataLines] = lines;
        const headerParts = headerLine.split(",").map((h) => h.trim());

        const parsedRows = dataLines
            .map((line) => line.split(",").map((cell) => cell.trim()))
            .filter((cells) => cells.some((cell) => cell.length > 0));

        const rowObjects = parsedRows.map((cells) => {
            const rowObj: Record<string, string> = {};

            headerParts.forEach((header, index) => {
                rowObj[header] = cells[index] ?? "";
            });

            return rowObj;
        });

        setHeaders(headerParts);
        setRows(rowObjects);

    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
            />

            {fileName && (
                <div>
                    <strong>Selected file:</strong> {fileName}
                </div>
            )}

            {preview && (
                <div>
                    <strong>Preview (first 200 chars):</strong>
                    <pre
                        style={{
                            whiteSpace: "pre-wrap",
                            background: "#f5f5f5",
                            padding: 8,
                            borderRadius: 4
                        }}
                    >
                        {preview}
                    </pre>
                </div>
            )}

            {headers.length > 0 && (
                <CsvTable headers={headers} rows={rows} />
            )}

        </div>
    );
}

export default CsvUpload;
