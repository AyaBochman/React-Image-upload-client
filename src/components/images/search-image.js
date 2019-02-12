import React, { Component } from "react";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import { allActions } from "../../redux/index";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import { accountAdded } from "../../redux/actions";

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
class SearchImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
        search: null,
        searchResult: null
 
    };

  }
  
  handleInputChange = e => {

    this.setState({
        search:  e.target.value
    });

  };

  handleSearch = () =>{
    let search = this.state.search;
    console.log("your search", search)
    axios
      .post(`http://localhost:2200/pictures/searchImage`, {search})
      .then(res => {
          console.log("result from server")
          let searchResult = res.data
          this.setState({
              searchResult: searchResult
          })
        console.log(searchResult)
      })
  }



  render() {
    const { classes } = this.props;
    return (
      <div>
        <h2>Search for Image</h2>
        <br/>
        <TextField
          id="search"
          name="search"
          label="Search"
          className={classes.textField}
        //   value={this.state.userId}
          onChange={this.handleInputChange}
          margin="normal"
        />
        <Button variant="contained" color="secondary" className={classes.button}
        onClick={this.handleSearch}>Search</Button>
  {this.state.searchResult && this.state.searchResult.map((searchedItem,index)=>{
    //   return <img src={`searchedItem.path`}></img>
      let tags = searchedItem.tags
      let displayTags = tags.join(",")
      console.log(searchedItem.path)
      return <div key={index}>tags:{displayTags}</div> &&
      <img src={searchedItem.path}></img>
   
  })}
      
      
      </div>
    );
  }
}

SearchImage.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
//   users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        // addingUser: allActions.addNewUser
      },
      dispatch
    )
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchImage)
);


