import moduleModel from "./model.js";

//CURD
export const findAllModules = () => moduleModel.find();
// export const findCourseById = (id) => courseModel.findOne({ id: id });
export const findModuleById = (id) => moduleModel.findById(id);
export const findModuleByCourse = (course) => moduleModel.find({ course: course });
export const createModule = (module) => {
  delete module._id;
  return moduleModel.create(module)};
export const updateModule = (id, module) =>
  moduleModel.updateOne({ _id: id }, { $set: module });
export const deleteModule = (id) => moduleModel.deleteOne({ _id: id });