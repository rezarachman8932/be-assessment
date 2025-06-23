import express from "express";
import userRoutes from "./routes/user";
import logRoutes from "./routes/log";
import "./jobs/birthdayJob";
import "./jobs/recoveryJob";

const app = express();
app.use(express.json());
app.use("/user", userRoutes);
app.use("/logs", logRoutes);

if (process.env.NODE_ENV !== "test") {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });
}

export default app; // 👈 penting agar bisa di-test