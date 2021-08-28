const { NavLink, Link, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {
  state = {
    isOpen: false,
  }

  
  
  render() {

    return (
      <section className="app-header main-layout">
        <h1><Link to='/'>Appsus</Link></h1>
          <nav hidden = {!this.state.isOpen}>
          <div className="link"><NavLink to="/keep" >Keep</NavLink></div>
          <div className="link"><NavLink to="/mail" >Mail</NavLink></div>
          {/* <div className="link"><NavLink exact to="/" >Book</NavLink></div> */}
          <div className="link"><NavLink to="/about" >About</NavLink></div>
          <div className="link"><NavLink to="/" >Home</NavLink></div>
        </nav>
        {/* <ul class="main-nav flex clean-list">
                <li className="link"><NavLink to="/keep" >Keep</NavLink></li>
                <li className="link"><NavLink to="/mail" >Mail</NavLink></li>
                <li className="link"><NavLink to="/about" >About</NavLink></li>
                <li className="link"><NavLink to="/" >Home</NavLink></li>
            </ul> */}
      </section>
    )
  }

}
export const AppHeader = withRouter(_AppHeader)