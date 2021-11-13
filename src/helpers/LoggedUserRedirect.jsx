import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

function LoggedUserRedirect({ user, redirectPath, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) {
          return children;
        }

        if (user) {
          return (
            <Redirect
              to={{ pathname: redirectPath, state: { from: location } }}
            />
          );
        }

        return null;
      }}
    />
  );
}

export default LoggedUserRedirect;

LoggedUserRedirect.propTypes = {
  user: PropTypes.object,
  redirectPath: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};
