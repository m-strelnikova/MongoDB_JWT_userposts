import express from "express";
import "dotenv/config"; 
import authRouter from "./routes/auth.js"
import postRouter from "./routes/post.js"

const app = express();
const port = process.env.PORT; 

app.use(express.json());
app.use("/auth", authRouter);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
    
})

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`); 
})