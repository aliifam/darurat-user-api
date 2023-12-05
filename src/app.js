import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/v1", router);

//if no route match send 404
app.use((req, res) => {
  res.status(404).json({
    message: "404 Not Found",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
