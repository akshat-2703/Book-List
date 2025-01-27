const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes/api/books");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(express.static(path.resolve(__dirname, "../frontend/dist")));


// use the cors middleware with the
// origin and credentials options
app.use(cors({ origin: true, credentials: true }));

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use the routes module as a middleware
// for the /api/books path
app.use("/api/books", routes);

// Connect Database
connectDB();

app.get("/", (req, res) => res.send("Hello world!"));
const port = process.env.PORT || 8082;

app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
})
app.listen(port, () => console.log(`Server running on port ${port}`));