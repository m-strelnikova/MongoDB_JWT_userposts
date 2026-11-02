import express from "express";
import "dotenv/config";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import { connectToDB } from "./db/connect.js";


const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/auth", authRouter);
app.use("/posts", postRouter);

connectToDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://127.0.0.1:${port}`);
    });
})
.catch((err) => {
    console.error("Failed to start the server! MongoDB connection issue: ",
        err);

})