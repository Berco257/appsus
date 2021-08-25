const { NavLink, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {

  render() {

    return (
      <section className="app-header">
        <h1>HEADER</h1>
        <nav>
          <div className="link"><NavLink exact to="/" >Home</NavLink></div>
          <div className="link"><NavLink to="/about" >About</NavLink></div>
          <div className="link"><NavLink to="/keep" >Keep</NavLink></div>
          <div className="link"><NavLink to="/mail" >Mail</NavLink></div>
        </nav>
      </section>
    )
  }

}
export const AppHeader = withRouter(_AppHeader)