// Router Import
const { Router } = require('express');

// Controllers Import and Initialization
const OrdersController = require("../controllers/OrdersControllers")

const ordersController = new OrdersController();

// Middleware Import
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ensureUserIsAdmin = require("../middlewares/ensureUserInAdmin");

// Initializing Router
const ordersRoutes = Router();

// Requiring Authentication
ordersRoutes.use(ensureAuthenticated);

// Orders Routes
ordersRoutes.post("/", ordersController.create);
ordersRoutes.get("/", ordersController.index);
ordersRoutes.put("/", ensureUserIsAdmin, ordersController.update);

// Export
module.exports = ordersRoutes;