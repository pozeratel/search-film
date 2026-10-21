import { NavLink } from "react-router-dom";
function Navigation() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {" "}
      <NavLink to="/movie">Movie</NavLink>
    </nav>
  );
}

export default Navigation;
