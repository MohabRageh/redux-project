import { Link } from "react-router-dom"

function Header() {
  return (
    <header>
        <h1>The Blog</h1>
        <nav>
            <li><Link to="/">Home</Link></li>
            <li><Link to="post">Post</Link></li>
            
        </nav>
    </header>
  )
}

export default Header