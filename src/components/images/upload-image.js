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
class UploadImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      tags: null
 
    };

  }
  handleChange = e =>{
      this.setState({
          selectedFile: e.target.files[0]
      })
      console.log(e.target.files[0].name)
  }

  
  handleInputChange = e => {

    this.setState({
        tags:  e.target.value
    });

  };

  handleUpload = () =>{
    let tags = this.state.tags
    // let tags = theTags.split(",")
    console.log(tags)
    const data = new FormData()
    // console.log(this.state.selectedFile.name)
    console.log(data)
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)
    data.append('tags', tags)

    axios
      .post(`http://localhost:2200/pictures/uploadImage`, data)
      .then(res => {
        console.log(res.statusText)
      })
  }




  render() {
    const { classes } = this.props;
    return (
      <div>
        <h2> Add New Image </h2>
        {/* <form enctype="multipart/form-data"> */}
        <input type="file" onChange={this.handleChange}/>
        <Button variant="contained" color="primary" className={classes.button}
        onClick={this.handleUpload}>Upload</Button>
  <br/>
        <TextField
          id="tags"
          name="tags"
          label="Tags"
          className={classes.textField}
        //   value={this.state.userId}
          onChange={this.handleInputChange}
          margin="normal"
        />

      
      </div>
    );
  }
}

UploadImage.propTypes = {
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
  )(UploadImage)
);


