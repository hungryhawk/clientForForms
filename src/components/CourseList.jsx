// import RestaurantFinder from '../api/CoursesFinder';
import { useContext, useEffect } from 'react';
import { CourseContext } from '../context/CourseContext';
import { useNavigate } from 'react-router-dom';
import CoursesFinder from '../api/CoursesFinder';

const RestaurantList = () => {
  const { courses, setCourses } = useContext(CourseContext);
  const navigate = useNavigate();

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await CoursesFinder.get('/');
      setCourses(response.data);
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Имя</th>
            <th scope="col">Фамилия</th>
            <th scope="col">Email</th>
            <th scope="col">Мобильный телефон</th>
            <th scope="col">Ваш регион</th>
            <th scope="col">Выбранный курс</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {courses &&
            courses.map((course) => {
              return (
                <>
                  <tr key={course.id}>
                    <td>{course.name}</td>
                    <td>{course.surname}</td>
                    <td>{course.email}</td>
                    <td>{course.mobile}</td>
                    <td>{course.region}</td>
                    <td>{course.courses || course.oneperson}</td>
                    <td>
                      <button
                        onClick={() => handleUpdate(course.id)}
                        className="btn btn-warning"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
