import { z } from "zod";

export const CsvImportSchema = z.object({
  columns: z.array(z.string().min(1)),
  rows: z.array(z.record(z.string()))
});

export type CsvImportPayload = z.infer<typeof CsvImportSchema>;
