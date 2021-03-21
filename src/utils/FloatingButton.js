import { Link } from 'react-router-dom';
const FloatingButton = ({ children, to }) => (
  <Link to={to}>
    <div className="floating-button">{children}</div>
  </Link>
);
export default FloatingButton;
