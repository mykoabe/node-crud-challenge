const express = require("express");
const cors = require("cors");
const personRoutes = require("./src/routes/personRoutes");
const { urlNotFound, errorHandler } = require("./src/middlewares/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

// cors
app.options("*", cors()); // enable pre-flight request for DELETE request
app.use(
  cors({
    origin: "*",
  })
);

let persons = [
  {
    id: "1",
    name: "Sam",
    age: "26",
    hobbies: [],
  },
]; //This is your in memory database

app.set("db", persons);
//TODO: Implement crud of person
app.use("/person", personRoutes);
app.use(urlNotFound);
app.use(errorHandler);

if (require.main === module) {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}
module.exports = app;
