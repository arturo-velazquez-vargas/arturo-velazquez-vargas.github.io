import React, { Component, useState, useEffect } from 'react';
import { Route, Switch, Navigate, Router, Routes, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';

// pages

import Settings from "./Settings";
import Products from "./Products";
// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import HomePage from "./HomePage";
import HomeCurrent from "./Home";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import Register from "./auth/components/register.component";
import store from "./store";
import { logout } from "./auth/actions/auth";
import { clearMessage } from "./auth/actions/message";
import EventBus from "./auth/common/EventBus";
import Login from "./sign/pages/Login";
import Signup from "./sign/pages/Signup";


// const RouteWithSidebar = ({ component: Component, ...rest }) => {
//   return (
//     <Route {...rest} render={props => (
//       <>
//         <Preloader show={loaded ? false : true} />
//         <Sidebar />
//         <main className="content">
//           <Navbar />
//           <Component {...props} />
//           <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
//         </main>
//       </>
//     )}
//     />
//   );
// };
export default () => {

  // constructor(props) {
  //   super(props);
  //   this.logOut = this.logOut.bind(this);

  //   this.state = {
  //     currentUser: undefined,
  //     auth: false,
  //   };
  // }


  // componentDidMount() {
  //   const currentUser = useSelector((store) => store.auth.user);
  //   console.log('user ', currentUser);
  //   if (currentUser) {
  //     this.setState({
  //       currentUser: currentUser
  //     });
  //   }

  //   EventBus.on("logout", () => {
  //     this.logOut();
  //   });
  // }

  // componentWillUnmount() {
  //   EventBus.remove("logout");
  // }

  // logOut() {
  //   this.props.dispatch(logout());
  //   this.setState({
  //     currentUser: undefined,
  //   });
  // }
  const currentUser = useSelector((store) => store.auth.user);
  const [user, setUser] = useState(null);


  React.useEffect(() => {
    console.log('data USER in home=================================================', localStorage.getItem('user'));
    setUser(localStorage.getItem('user'));
  }, []);

  return (
    <>
      <Provider store={store}>
        <CssBaseline />
        <>
          <div>
            <Routes>
              <Route path="/login" element={<Login setAuth={false} />} />
              <Route path="/home" element={<HomeCurrent />} />
              <Route path="/signup" element={<Signup setAuth={false} />} />
              <Route path="/volt-react-dashboard" element={<Login setAuth={false} />} />
              <Route exact path={"/myasinmanager"} element={
                localStorage.getItem('user') ? (<>
                  <Sidebar />
                  <main className="content">
                    <Navbar />
                    <Products />
                  </main>
                </>) : (
                  <Navigate to="/login" replace />
                )} />
              <Route exact path={"/import-file"} element={localStorage.getItem('user') ? (<>
                <Sidebar />
                <main className="content">
                  <Navbar />
                  <Settings />
                </main>
              </>) : (
                <Navigate to="/login" replace />
              )} />
              <Route
                path="/"
                element={
                  localStorage.getItem('user') ? (
                    <>
                      <Sidebar />
                      <main className="content">
                        <Navbar />
                        <Products />
                      </main>
                    </>
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            </Routes>
          </div>
        </>
      </Provider>
    </>
  );

}

