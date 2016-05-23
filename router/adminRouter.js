var adminrouter = express.Router();
adminrouter.all("/index",adminIndexControl.index);
//restful接口规范
adminrouter.get("/admin",adminIndexControl.adminList);       //获取
adminrouter.post("/admin",adminIndexControl.adminAdd);       //增加
adminrouter.delete("/admin/:id",adminIndexControl.adminDel); //删除

//消息管理API
adminrouter.get("/news",newsControl.newsList);
adminrouter.get("/news/:nid",newsControl.previews);
adminrouter.delete("/news/:nid",newsControl.newsDel);

//留言管理API
adminrouter.get("/advices",adviceControl.adviceList);
adminrouter.delete("/advices/:mid",adviceControl.adviceDel);
adminrouter.get("/advices/:mid",adviceControl.previews);

module.exports = adminrouter;