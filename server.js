const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const cors = require("cors");
const path = require("path");
const upload = require("./utils/fileUpload");

const app = express();
const PORT = 2000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Import Controllers
const authController = require("./controllers/authController");


// Import Midleware
const middleware = require("./middlewares/auth");

// Define Routes
// Auth
app.get("/v1/users", middleware.authenticate, authController.getCurrentUsers);
app.get("/v1/users/all", authController.getAllUsers);
app.get("/v1/users/:id", middleware.authenticate, authController.getUsersById);
app.post("/v1/register", upload.single("picture"), authController.register);
app.post("/v1/login", authController.login);
app.post("/v1/login-google", authController.loginGoogle);
app.put("/v1/users/:id", middleware.authenticate, authController.updateUsers);
app.delete("/v1/users/:id", middleware.authenticate, authController.deleteUsers);

// Posts


// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Public File Access
app.use("/public/files", express.static(path.join(__dirname, "/storages")));

app.listen(PORT, () => {
  console.log(`Server berhasil berjalan di port http://localhost:${PORT}`);
});
