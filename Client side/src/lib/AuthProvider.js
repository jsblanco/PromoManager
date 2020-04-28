import React from "react";
import auth from "./auth-service";
const { Consumer, Provider } = React.createContext();

const withAuth = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <Consumer>
          {({ login, signup, user, logout, isLoggedin, error }) => {
            return (
              <WrappedComponent
                login={login}
                signup={signup}
                user={user}
                logout={logout}
                isLoggedin={isLoggedin}
                error={error}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

class AuthProvider extends React.Component {
  state = { isLoggedin: false, user: null, isLoading: true, error: false };

  componentDidMount() {
    auth
      .me()
      .then((user) =>
        this.setState({ isLoggedin: true, user: user, isLoading: false })
      )
      .catch((err) =>
        this.setState({
          isLoggedin: false,
          user: null,
          userData: false,
          isLoading: false,
        })
      );
  }

  signup = (user) => {
    const { name, password, email, role } = user;
    auth
      .signup({ name, password, email, role })
      .then((user) => this.setState({ isLoggedin: true, user }))
      .catch(({ response }) =>
        this.setState({ message: response.data.statusMessage })
      );
  };

  login = (user) => {
    const { email, password } = user;

    auth
      .login({ email, password })
      .then((user) => this.setState({ isLoggedin: true, user }))
      .catch((err) => this.setState({error:err.response.request.status}));
      //.catch(({ response }) => this.setState({ message: response.data.statusMessage }))
  };

  logout = () => {
    auth
      .logout()
      .then(() => this.setState({ isLoggedin: false, user: null }))
      .catch((err) => console.log(err));
  };

  render() {
    const { isLoading, isLoggedin, user, error } = this.state;
    const { login, logout, signup } = this;

    return isLoading ? (
      <div className="h-100 w-100 d-flex flex-column justify-content-around align-items-center font-italic my-5">
        <h4 className="my-5 py-5 text-info font-weight-bold">
          Your projects will be here soon...
        </h4>
        <div className="mt-5">
          <img src="loading.gif" />
        </div>
      </div>
    ) : (
      <Provider value={{ isLoggedin, user, login, logout, signup, error }}>
        {this.props.children}
      </Provider>
    );
  }
}

export { Consumer, withAuth };
export default AuthProvider;
