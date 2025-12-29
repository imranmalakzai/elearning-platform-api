import app from "./app.js";
import { PORT } from "./config/env.config.js";

app.listen(PORT, () => {
  console.log(`server is listening on port : ${PORT}`);
});

export default app;
