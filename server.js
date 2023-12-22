const mongoose = require("mongoose");
const dotenv = require("dotenv");

//! Global Uncaught Exception Error handler
process.on("uncaughtException", err => {
    console.log(err.message);
    process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

//! Local Database:
// mongoose.connect(process.env.DATABASE_LOCAL, {
//! Host Database:
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    // console.log(con.connections);
    console.log("DB connection successful!");
});

// console.log(process.env);
const server = app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}...`);
});

//! Global Unhandled Rejection Error handler
process.on("unhandledRejection", err => {
    console.log(err.name);
    server.close(() => {
        process.exit(1);
    });
});
