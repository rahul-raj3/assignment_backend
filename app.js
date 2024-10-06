const path = require("path");
const express = require('express')
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");


const common = require("./routes/common.routes")

const app = express();

// Enable CORS
app.use(cors());

// Body parser
// for parsing application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/common", common);

app.listen(process.env.port, () => {
    console.log(`Server is running on port ${process.env.port}`);
  });
