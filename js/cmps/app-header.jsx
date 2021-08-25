const { NavLink, Link, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {

  render() {

    return (
      <section className="app-header main-layout">
        <h1><Link to='/'>Appsus</Link></h1>
        <nav>
          <div className="link"><NavLink to="/keep" >Keep</NavLink></div>
          <div className="link"><NavLink to="/mail" >Mail</NavLink></div>
          <div className="link"><NavLink exact to="/" >Book</NavLink></div>
          <div className="link"><NavLink to="/about" >About</NavLink></div>
        </nav>
      </section>
    )
  }

}
export const AppHeader = withRouter(_AppHeader)