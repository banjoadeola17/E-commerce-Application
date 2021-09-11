import http from "http";
import logger from "./api/logger";
import app from "./api/server";

const server = http.createServer(app);
const port = process.env.PORT || 80;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
