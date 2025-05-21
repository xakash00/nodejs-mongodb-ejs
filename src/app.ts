import express, { Request, Response, NextFunction } from 'express';
import { connectDB } from './config/db';
import blogRoutes from './routes/blogRouter'; // Your router file
import { getSystemInfo } from './controllers/systemInfoController';
const path = require("path")
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.static(path.join(__dirname, "ts")));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', blogRoutes);
app.get("/system-info", getSystemInfo)

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//     console.error(err.stack);
//     res.status(500).render('fallback', { message: 'Something went wrong!' })
// });



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
