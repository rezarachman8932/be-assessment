// src/jobs/birthdayJob.ts
import cron from "node-cron";
import { DateTime } from "luxon";
import prisma from "../db/prisma";
import { sendBirthdayEmail } from "../services/emailService";

cron.schedule("*/10 * * * * *", async () => {
  const users = await prisma.user.findMany();
  const now = DateTime.utc(); 

  for (const user of users) {
    const localNow = now.setZone(user.timezone);
    const birthday = DateTime.fromJSDate(user.birthday).setZone(user.timezone);

    const isBirthday =
      localNow.month === birthday.month && localNow.day === birthday.day;

    const isNineAM = localNow.hour === 9 && localNow.minute === 0;
    
    if (isBirthday && isNineAM) {
      const todayUTC = localNow.startOf("day").toUTC();
    
      // Cek apakah sudah pernah kirim
      const alreadySent = await prisma.birthdayLog.findFirst({
        where: {
          userId: user.id,
          date: todayUTC.toJSDate(),
        },
      });
    
      if (alreadySent) {
        console.log(`✅ Already processed: ${user.email}`);
        continue;
      }
    
      try {
        await sendBirthdayEmail(user);
    
        await prisma.birthdayLog.create({
          data: {
            userId: user.id,
            date: todayUTC.toJSDate(),
            status: "SENT",
          },
        });
      } catch (err) {
        console.error("❌ Failed to send email for", user.email, err);
    
        await prisma.birthdayLog.create({
          data: {
            userId: user.id,
            date: todayUTC.toJSDate(),
            status: "FAILED",
          },
        });
      }
    }    
  }
});