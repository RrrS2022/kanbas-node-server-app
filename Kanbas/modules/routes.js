// import db from "../Database/index.js";
// function ModuleRoutes(app) {
//     app.put("/api/modules/:mid", (req, res) => {
//         const { mid } = req.params;
//         const moduleIndex = db.modules.findIndex(
//           (m) => m._id === mid);
//         db.modules[moduleIndex] = {
//           ...db.modules[moduleIndex],
//           ...req.body
//         };
//         res.sendStatus(204);
//     });
    
//     app.delete("/api/modules/:mid", (req, res) => {
//         const { mid } = req.params;
//         db.modules = db.modules.filter((m) => m._id !== mid);
//         res.sendStatus(200);
//     });
    
//     app.post("/api/courses/:cid/modules", (req, res) => {
//         const { cid } = req.params;
//         const newModule = {
//           ...req.body,
//           course: cid,
//           _id: new Date().getTime().toString(),
//         };
//         db.modules.push(newModule);
//         res.send(newModule);
//     });
    
//     app.get("/api/courses/:cid/modules", (req, res) => {
//         const { cid } = req.params;
//         const modules = db.modules
//         .filter((m) => m.course === cid);
//         res.send(modules);
//     });
// }
// export default ModuleRoutes;


import * as dao from "./dao.js";

function ModuleRoutes(app) {
  const createModule = async (req, res) => {
    const {cid} = req.params;
    const newModule = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    const module = await dao.createModule(newModule);
    res,json(module);
    };

    const deleteModule = async (req, res) => {
      const status = await dao.deleteModule(req.params.mid);
      res.json(status);
    };
  
    const updateModule = async (req, res) => {
      const { mid } = req.params;
      const status = await dao.updateModule(mid, req.body);
      res.json(status);
    };
  
    const findAllModules = async (req, res) => {
      const modules = await dao.findAllModules();
      res.json(modules);
    }
    
    const findModuleByCourse = async (req, res) => {
      const { cid } = req.params;
      const module = await dao.findModuleByCourse(cid);
      res.json(module);
    }
  
    app.post("/api/courses/:cid/modules", createModule);
    app.delete("/api/modules/:mid", deleteModule);
    app.put("/api/modules/:mid", updateModule);
    app.get("/api/modules", findAllModules);
    app.get("/api/courses/:cid/modules", findModuleByCourse);


}


export default ModuleRoutes;