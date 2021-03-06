import { lazy, Suspense } from 'react';

// React Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import ProtectedRoute from './helpers/ProtectedRoute';
import LoggedUserRedirect from './helpers/LoggedUserRedirect';

// Page Imports
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/Signup'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

// Context
import UserContext from './context/user';

// Hooks
import useAuthListener from './hooks/use-auth-listener';

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <LoggedUserRedirect
              path={ROUTES.LOGIN}
              user={user}
              redirectPath={ROUTES.DASHBOARD}
            >
              <Login />
            </LoggedUserRedirect>

            <LoggedUserRedirect
              user={user}
              path={ROUTES.SIGNUP}
              redirectPath={ROUTES.DASHBOARD}
            >
              <SignUp />
            </LoggedUserRedirect>

            <Route path={ROUTES.PROFILE} component={Profile} />

            <ProtectedRoute path={ROUTES.DASHBOARD} user={user} exact>
              <Dashboard />
            </ProtectedRoute>

            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
