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
const productController = require("./controllers/productController");
const transactionController = require("./controllers/transactionController");

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
app.put("/v1/users/:id", middleware.authenticate, upload.single("picture"), authController.updateUsers);
app.delete("/v1/users/:id", middleware.authenticate, authController.deleteUsers);

// Products
app.get("/v1/product/all", productController.getAllProduct);
app.get("/v1/product/users/:id", middleware.authenticate, productController.getProductByUserId);
app.get("/v1/product/:id", middleware.authenticate, productController.getProductById);
app.post("/v1/product", middleware.authenticate, upload.fields([{ name: "picture" }]), productController.create);
app.put("/v1/product/:id", middleware.authenticate, upload.fields([{ name: "picture" }]), productController.updateProductById);
app.delete("/v1/product/:id", middleware.authenticate, productController.deleteProductById);

// Transaction
app.get("/v1/transaction/:id", middleware.authenticate, transactionController.getTransactionById);
app.get("/v1/transaction/users/:id", middleware.authenticate, transactionController.getTransactionByUserId);
app.get("/v1/transaction/owners/:id", middleware.authenticate, transactionController.getTransactionByOwnerId);
app.get("/v1/transaction/notif/:id", middleware.authenticate, transactionController.getTransactionNotif);
app.post("/v1/transaction", middleware.authenticate, transactionController.createTransaction);
app.put("/v1/transaction/:id", middleware.authenticate, transactionController.updateTransactionById);

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(process.env.PORT || 2000, () => {
  console.log(
    `Server berhasil berjalan di port http://localhost:${
      process.env.PORT || 2000
    }`
  );
});