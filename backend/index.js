const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const ingredientsRouter = require("./routes/ingredientsRoutes");
const inventoryRouter = require("./routes/inventoryRoutes");
const recipeRouter = require("./routes/recipeRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", authRouter);
app.use("/api/ingredients", ingredientsRouter);
app.use("/api/user/inventory", inventoryRouter);
app.use("/api", recipeRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Smart Pantry API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
