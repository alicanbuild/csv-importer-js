import { type ChangeEvent, useState } from "react";

function CsvUpload() {
    const [fileName, setFileName] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setFileName(file.name);

        const text = await file.text();
        console.log("CSV raw:", text);

        const short = text.slice(0, 200);
        setPreview(short);
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
        </div>
    );
}

export default CsvUpload;
