import React, { Component } from "react";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";

import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


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
      tags: "",
      displayFile: null,
      error: false,
      errorText:"",
      success: false,
      successText:""
 
    };

  }



 
  componentDidUpdate(){
    console.log("component did update")
  }

  handleChange = e =>{
    if(e.target.files[0]){
      this.setState({
          selectedFile: e.target.files[0],
          displayFile: URL.createObjectURL(e.target.files[0]),
          error: false,
          errorText: ""
          //creates blob
      })
    }
      
    
  }

  
  handleInputChange = e => {

    this.setState({
        tags:  e.target.value,
        error: false
    });

  };

  handleUpload = () =>{
    let tags = this.state.tags

   
    if(tags && this.state.selectedFile){
  const data = new FormData()

    data.append('file', this.state.selectedFile, this.state.selectedFile.name)
    data.append('tags', tags)

    axios
      .post(`http://localhost:2200/pictures/uploadImage`, data)
      .then(res => {
        this.setState({
          selectedFile: null,
          tags: "",
          displayFile:null,
          success: true,
          successText: `Image ${this.state.selectedFile.name} successfully uploaded!`
        })

        setTimeout(() => {
          this.setState({
            success: false
          })
        }, 2000);
        console.log(res.statusText)
      })

    }else{
      this.setState({
        error: true,
        errorText: "*You didn't choose image/tags"
      })
    }
  
  }




  render() {
    const { classes } = this.props;
    return (
      <div>
      <br/>
        <h2 className={"title"}>Upload New Image </h2>
        <br/>
        {/* <form encType="multipart/form-data"> */}
        
            <label className={"fileContainer"}>
              <FontAwesomeIcon icon="upload" size="2x" className={"upload"}/>
              <input type="file" onChange={this.handleChange}/>
             </label>
                
            
   
        <br/>
         {this.state.selectedFile && <small>{this.state.selectedFile.name}</small>}
         <br/>
        <img className={"image-display"} src={this.state.displayFile}/>
      {this.state.success && <small className={"success"}>{this.state.successText}</small>}
        <br/>
    
        {/* </form> */}

        <TextField
          id="tags"
          name="tags"
          label="Add some tags"
          className={classes.textField}
          value={this.state.tags}
          onChange={this.handleInputChange}
          margin="normal"
        />
          <br/>
          {this.state.error && <small className={"error"}>{this.state.errorText}</small>}
          <br/>
          <Button variant="contained" color="primary" className={classes.button}
        onClick={this.handleUpload}>Upload</Button>
        <br/>
   
      </div>
    );
  }
}

UploadImage.propTypes = {
  classes: PropTypes.object.isRequired
};



export default withStyles(styles)(UploadImage)



