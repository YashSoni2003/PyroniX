import { Link, useMatch, useResolvedPath } from "react-router-dom"

import { useAuth } from "./store/auth";
export default function Navbar() {
  const { isLoggedIn } = useAuth();
  return (



    <nav className="nav">
      <Link to="/" className="site-title">
        Pyronix
      </Link>
      <ul>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/abtus">About</CustomLink>
        <CustomLink to="/Compiler">Compiler</CustomLink>
        <CustomLink to="/contact">Contact</CustomLink>
        {isLoggedIn ? (
          <li>
            <CustomLink to="/logout">Logout</CustomLink>
          </li>
        ) : (
          <>
            <CustomLink to="/register">Register</CustomLink>

            <CustomLink to="/login">Login</CustomLink>
          </>
        )}

      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}