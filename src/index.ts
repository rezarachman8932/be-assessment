import express from "express";
import userRoutes from "./routes/user";
import logRoutes from "./routes/log";
import "./jobs/birthdayJob";
import "./jobs/recoveryJob";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/user", userRoutes);
app.use("/logs", logRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
