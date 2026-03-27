import express from 'express'
import usersRoutes from "./routes/users.js"
import carsRoutes from "./routes/cars.js"
import albumRoutes from "./routes/album.js"

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/names", usersRoutes)
app.use("/api/cars", carsRoutes)
app.use("/api/albums", albumRoutes)

app.listen(PORT,() =>
{
    console.log(`csaba${PORT}`)
});
    
