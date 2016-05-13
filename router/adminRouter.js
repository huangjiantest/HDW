var adminRouter = express.Router();

adminRouter.all("/index",adminIndexControl.index);//调用控制器的index函数
adminRouter.get("/admin",adminIndexControl.adminList);//调用控制器的admin函数
adminRouter.post("/admin",adminIndexControl.adminAdd);
adminRouter.delete("/admin/:id",adminIndexControl.adminDel);

//商品分类API
adminRouter.get("/producttype",typeControl.typeList);
adminRouter.get("/producttype/:pid",typeControl.typeList);
adminRouter.post("/producttype",typeControl.typeAdd);
adminRouter.delete("/producttype/:id",typeControl.typeDel);

//商品API
adminRouter.get("/product",proControl.proList);
adminRouter.post("/product",upload.single('upfile'),proControl.proAdd);
adminRouter.delete("/product/:pid",proControl.proDel);

module.exports = adminRouter;//输出路由