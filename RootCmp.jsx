const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

import { AppHeader } from './js/cmps/app-header.jsx';
import { MailDetails } from './js/apps/mail/pages/mail-details.jsx';
import { KeepApp } from './js/apps/keep/pages/keep-app.jsx';
import { MailApp } from './js/apps/mail/pages/mail-app.jsx';
import { About } from './js/pages/app-about.jsx';
import { Home } from './js/pages/app-home.jsx';
import { UserMsg } from './js/cmps/user-msg.jsx';
import { AppFooter } from './js/cmps/app-footer.jsx';

export function App() {
  return (
    <Router>
      <header>
        <AppHeader />
      </header>
      <main>
        <Switch>
          <Route path='/mail/:mailId' component={MailDetails} />
          <Route path="/keep" component={KeepApp} />
          <Route path="/mail" component={MailApp} />
          <Route path="/about" component={About} />
          <Route path="/" component={Home} />
        </Switch>
      </main>
      <footer>
        <AppFooter />
      </footer>
      <UserMsg />
    </Router>
  );
}
