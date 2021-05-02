import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// import Users from "./user/pages/Users";
// import NewPost from "./posts/pages/NewPost";
// import UserPosts from "./posts/pages/UserPosts";
// import UpdatePost from "./posts/pages/UpdatePost";
// import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "../src/shared/hooks/auth-hook";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const Users = React.lazy(() => import("./user/pages/Users")); // import only when page is visited
const NewPost = React.lazy(() => import("./posts/pages/NewPost")); // import only when page is visited
const UserPosts = React.lazy(() => import("./posts/pages/UserPosts")); // import only when page is visited
const UpdatePost = React.lazy(() => import("./posts/pages/UpdatePost")); // import only when page is visited
const Auth = React.lazy(() => import("./user/pages/Auth")); // import only when page is visited

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  //set the routes for logged in users
  if (token) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:userId/posts' exact>
          <UserPosts />
        </Route>
        <Route path='/posts/new' exact>
          <NewPost />
        </Route>
        <Route path='/posts/:postId' exact>
          <UpdatePost />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  } else {
    //set the routes for logged out users
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:userId/posts' exact>
          <UserPosts />
        </Route>
        <Route path='/auth' exact>
          <Auth />
        </Route>
        <Redirect to='/auth' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className='center'>
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
