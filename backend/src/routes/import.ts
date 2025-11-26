import { Router, Request, Response, NextFunction } from "express";
import { CsvImportSchema } from "../schema/csvImport";

const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = CsvImportSchema.parse(req.body);

    console.log("CSV import request:", {
      columns: payload.columns.length,
      rows: payload.rows.length
    });

    return res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
