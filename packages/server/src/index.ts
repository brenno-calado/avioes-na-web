import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import logger from "./helpers/logger.helper";

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  logger.info(`App running on http://localhost:${PORT}/`);
});
