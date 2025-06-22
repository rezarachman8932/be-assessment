// src/routes/log.ts
import { Router } from "express";
import prisma from "../db/prisma";

const router = Router();

router.get("/", async (req, res) => {
  const { date, status } = req.query;

  const where: any = {};
  if (date) {
    const parsedDate = new Date(date as string);
    where.date = parsedDate;
  }
  if (status) {
    where.status = status;
  }

  try {
    const logs = await prisma.birthdayLog.findMany({
      where,
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(logs);
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

export default router;
