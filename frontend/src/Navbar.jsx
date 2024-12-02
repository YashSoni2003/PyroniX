import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
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
        <CustomLink to="/register">Register</CustomLink>
        <CustomLink to="/login">Login</CustomLink>
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