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
      try {
        await sendBirthdayEmail(user);
      } catch (err) {
        console.error("Error sending birthday email for", user.email, err);
      }
    }
  }
});
