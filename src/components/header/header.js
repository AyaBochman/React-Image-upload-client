import React, { Component } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import { MenuItem, Navbar, Nav, NavItem } from "react-bootstrap";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { isPromiseAlike } from "q";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  }
});

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = { }
  }

  componentWillReceiveProps(nextProps){
      // console.log(this.props.isAuth)
    // this.setState({
    //   currentUser: nextProps.currentUser,
    //   isAuth: nextProps.isAuth
    // });
    
  }

  render() {

  
 
    return (
      <div>
      <div className={"container"}>
        <Navbar>
          {/* <Navbar.Header> */}
  
            <Navbar.Brand>
            <Link to="/upload-image"> Upload Image</Link>
            </Navbar.Brand>
            <Navbar.Brand>
            <Link to="/search"> Search Image</Link>
            </Navbar.Brand>
            {/* <Navbar.Brand>
              <Link to="/users"> Users </Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link to="/bank-details"> Bank </Link>
            </Navbar.Brand> */}
         
            {/* <Navbar.Brand>
              <Link to="/operations"> Account Operations </Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link to="/order-check"> Order Check </Link>
            </Navbar.Brand> */}
          {/* </Navbar.Header> */}
          {/* {this.state.currentUser.length > 0 &&  <h3>Hello {this.state.currentUser}</h3>} */}
 
         
        </Navbar>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {

  return {
 

  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,//read from state
    //pass to state
  )(Header)
);