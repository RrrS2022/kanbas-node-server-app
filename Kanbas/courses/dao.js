import courseModel from "./model.js";
//CURD
export const findAllCourses = () => courseModel.find();
// export const findCourseById = (id) => courseModel.findOne({ id: id });
export const findCourseById = (courseId) => courseModel.find({id: courseId});
export const createCourse = (course) => {
  delete course._id
  return model.create(course);
};
export const updateCourse = (id, course) =>
  courseModel.updateOne({ _id: id }, { $set: course });
export const deleteCourse = (id) => courseModel.deleteOne({ _id: id });