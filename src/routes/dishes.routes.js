const { Router } = require("express");

const DishesController = require("../controllers/DishesControllers");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const dishesRoutes = Router();

const dishesController = new DishesController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post("/", dishesController.create);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", dishesController.delete);

module.exports = dishesRoutes;