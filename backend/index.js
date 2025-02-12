const express =   require("express");
const dotenv = require("dotenv");
const cors =  require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api",authRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Smart Pantry API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
