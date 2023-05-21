import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CreatePage from './pages/CreatePage';
import UpdatePage from './pages/UpdatePage';
import { CourseContextProvider } from './context/CourseContext';

function App() {
  return (
    <CourseContextProvider>
      <>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/update/:id" element={<UpdatePage />} />
          </Routes>
        </div>
      </>
    </CourseContextProvider>
  );
}

export default App;
