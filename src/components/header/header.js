import React, { Component } from "react";

import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import { MenuItem, Navbar, Nav, NavItem } from "react-bootstrap";
import { withStyles } from "@material-ui/core/styles";

import { isPromiseAlike } from "q";
import Button from "@material-ui/core/Button";

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



  render() {

  
 
    return (
      <div>
      <div className={"container head"}>
      <div className={"row"}>
       <Navbar className={"nav"}>

  
            <Navbar.Brand>
            
            <Button variant={"outlined"}color={"primary"}><Link className={"navlink"} to="/upload-image"> Upload Image</Link></Button>
            
            </Navbar.Brand>
            <Navbar.Brand>
            <Button variant={"outlined"}color={"secondary"}> <Link className={"navlink"} to="/search"> Search Image</Link></Button>
            </Navbar.Brand>

         
        </Navbar>
      </div>
       
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(Header);