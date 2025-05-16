import * as dotenv from "dotenv";
import { PathLike } from "fs";

dotenv.config();

interface Config {
    PORT: number | String;
    DATA_FILE: PathLike;
}

export const config: Config = {
    PORT: process.env.PORT || 4000,
    DATA_FILE: '../blog.json',
}
