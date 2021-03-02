import Link from 'next/link'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sell Tickets', href: '/tickets/new' },
    currentUser && { label: 'My Orders', href: '/orders' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <Nav.Link href="#features">{label}</Nav.Link>
          </Link>
        </li>
      )
    })

  return (
    <nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
      <Link href="/">
        <a class="navbar-brand">Ticketing APP</a>
      </Link>
      <button
        class="navbar-toggler p-0 border-0"
        type="button"
        data-toggle="offcanvas"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="navbar-collapse offcanvas-collapse"
        id="navbarsExampleDefault"
      >
        <form class=" mr-auto ml-5 form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
        <ul class="navbar-nav">{links}</ul>
      </div>
    </nav>
  )
}

// <nav className="navbar navbar-light bg-light">
//   <Link href="/">
//     <a className="navbar-brand">GitTix</a>
//   </Link>

//   <div className="d-flex justify-content-end">
//     <ul className="nav d-flex align-items-center">{links}</ul>
//   </div>
// </nav>
