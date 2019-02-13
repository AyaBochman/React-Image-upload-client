import React, { Component } from 'react';
import './App.css';
// import logo from './logo.svg';
import Header from "./components/header/header";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import {faUpload} from '@fortawesome/free-solid-svg-icons'
import {faSearch} from '@fortawesome/free-solid-svg-icons'


// import AddUser from './components/users/add-user';
import UploadImage from './components/images/upload-image';
import SearchImage from "./components/images/search-image";
library.add(faHashtag,faUpload,faSearch)


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





export default App;
