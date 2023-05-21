import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <h1 className="font-weight-light display-1 text-center">
        Языковые курсы
      </h1>
      <div className="name">
        <Link to="/create" className="btn btn-warning">
          Записаться на курс
        </Link>
      </div>
    </div>
  );
};

export default Header;
