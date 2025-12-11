import dotenv from "dotenv";
import express from "express"
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./router/authRoutes.js";
import customerRoutes from "./router/customerRoutes.js";
import providerRoutes from "./router/providerRoutes.js";
import { authenticateJwt } from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();


const corsOptions = {
    origin: [
        "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/*route*/
app.get('/', (req, res) => {
    res.send("this is home route");
});

app.use("/customer", authenticateJwt(['customer']), customerRoutes);
app.use("/provider", authenticateJwt(['provider']), providerRoutes);

app.use("/api/auth", authRoutes);

/*Server*/
const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
})