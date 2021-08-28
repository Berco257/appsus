const { NavLink, Link, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {

  state = {
    menuMode: false,
  }

  toggle = false
  toggleMenu = () => {
    this.toggle = !this.toggle
    this.setState({ menuMode: this.toggle })
  }

  render() {

    return (
      <section className="app-header main-layout">
        <h1><Link to='/'>Appsus</Link></h1>
        <div className={`toggle-menu ${this.toggle ? "active" : ""}`} onClick={this.toggleMenu}>≡</div>
        <nav className="header-nav">
          <div className="link"><NavLink exact to="/" >Home</NavLink></div>
          <div className="link"><NavLink to="/about" >About</NavLink></div>
          <div className="link"><NavLink to="/keep" >Keep</NavLink></div>
          <div className="link"><NavLink to="/mail" >Mail</NavLink></div>
          {/* <div className="link"><NavLink exact to="/" >Book</NavLink></div> */}
        </nav>
      </section>
    )
  }

}
export const AppHeader = withRouter(_AppHeader)