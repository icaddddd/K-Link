import express = require("express");
import AuthController from "../controllers/AuthController";
import authenticate from "../middlewares/auth";
import CustCont from "../controllers/CustCont";
import ProdCont from "../controllers/ProdCont";
import TransCont from "../controllers/TransCont";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
    res.send("Hello World!");
})


// router.get("/auth/register", (req: express.Request, res: express.Response) => {
//     res.send(AuthController.register(req, res));
// })
router.post("/auth/register", AuthController.register)
router.post("/auth/login", AuthController.login)
router.get("/auth/check", authenticate ,AuthController.check)

router.post("/customer", CustCont.create)
router.get("/customer", CustCont.find)
router.patch("/customer/:id", CustCont.update)
router.delete("/customer/:id", CustCont.delete)

router.post("/product", ProdCont.create)
router.get("/product", ProdCont.find)
router.patch("/product/:id", ProdCont.update)
router.delete("/product/:id", ProdCont.delete)

router.post("/transaction", TransCont.create)
router.get("/transaction", TransCont.find)
router.patch("/transaction/:id", TransCont.update)
router.delete("/transaction/:id", TransCont.delete)

export default router