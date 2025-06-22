
import cron from "node-cron";
import { DateTime } from "luxon";
import prisma from "../db/prisma";
import { sendBirthdayEmail } from "../services/emailService";


cron.schedule("*/5 * * * *", async () => {
  const todayUTC = DateTime.utc().startOf("day").toJSDate();

  const failedLogs = await prisma.birthdayLog.findMany({
    where: {
      date: todayUTC,
      status: "FAILED",
    },
    include: {
      user: true,
    },
  });

  for (const log of failedLogs) {
    try {
      await sendBirthdayEmail(log.user);

      await prisma.birthdayLog.update({
        where: { id: log.id },
        data: { status: "SENT" },
      });

      console.log(`Recovery success: ${log.user.email}`);
    } catch (err) {
      console.error(`Recovery failed: ${log.user.email}`, err);
    }
  }
});
