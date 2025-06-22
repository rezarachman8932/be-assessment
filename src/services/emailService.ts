import axios from "axios";

export async function sendBirthdayEmail(user: any) {
  const url = "https://email-service.digitalenvision.com.au/send-email";

  const payload = {
    email: user.email,
    message: `Hey, ${user.firstName} ${user.lastName}, it’s your birthday.`,
  };

  try {
    await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log(`Email sent to ${user.email}`);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Axios error:", err.message);
    } else if (err instanceof Error) {
      console.error("General error:", err.message);
    } else {
      console.error("Unknown error:", err);
    }
    throw err;
  }
}
