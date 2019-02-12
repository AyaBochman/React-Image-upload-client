import React, { Component } from 'react';
import './App.css';
// import logo from './logo.svg';
import Header from "./components/header/header";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'



import { allActions } from "./redux/index";
// import AddUser from './components/users/add-user';
import UploadImage from './components/images/upload-image';
import SearchImage from "./components/images/search-image";
library.add(faHashtag)

class App extends Component {
constructor(props){
super(props)
//*
}

  render() {
    return (
      <BrowserRouter>
      <div className="App">
    <Header/>
              <div>

              {/* routes */}
            <Switch>
        
                 <Route
                key="upload-image"
                path="/upload-image"
                component={UploadImage}
              />
              <Route key="search" path="/search" component={SearchImage} />
          
              <Redirect from="/" to="/" />
            </Switch>
          </div>
      </div>
      </BrowserRouter>
    );
  }
}


function mapStateToProps(state) {
  return {
    users: state.users || [],
   
    
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
     
        getUsers: allActions.getUsersReq

      },
      dispatch
    )
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
