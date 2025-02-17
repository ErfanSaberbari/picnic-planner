const express = require("express"); //import express
const routes = require("./routes"); //import routes
require("dotenv").config(); //load environment variables from .env file

const app = express();
const PORT = process.env.PORT;

app.use("/", routes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
