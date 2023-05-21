import { useState, createContext } from 'react';

export const CourseContext = createContext();

export const CourseContextProvider = (props) => {
  const [courses, setCourses] = useState([]);

  const addCourse = (course) => {
    setCourses([...courses, course]);
  };
  return (
    <CourseContext.Provider value={{ courses, setCourses, addCourse }}>
      {props.children}
    </CourseContext.Provider>
  );
};
