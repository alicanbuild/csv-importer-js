import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  
  void next;

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Invalid Payload",
      details: err.errors
    });
  }

  console.error("Unexpected error:", err);

  return res.status(500).json({
    error: "Internal Server Error"
  });
}
