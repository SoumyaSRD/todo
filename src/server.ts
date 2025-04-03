import app from "./app";
import { PORT } from "./config/keys";

const port: number = +PORT || 5000; // ✅ Ensure PORT is a number

app.listen(port, () => {
    console.log(`🚀 Server is listening on port ${port}`);
});
