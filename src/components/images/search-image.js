import React, { Component } from "react";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";

import axios from "axios";


import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const imgUrl = "http://localhost:2200/pictures"
const pathImg = "https://image-upload-tag-server.herokuapp.com/pictures"


const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  media: {
    height: 200,
    paddingTop: '56.25%', // 16:9
  },
  card: {
    maxWidth: 400,
    height: 300
  },
  textField: {
    position: "absolute",
    left: -90,
    width: 200,
    
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  actions: {
    display: 'flex',
  }
});

const apiPath =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://image-upload-tag-server.herokuapp.com";

    const path ="https://image-upload-tag-server.herokuapp.com"

class SearchImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: null,
      searchResult: null,
      loading: false,
      error: false

    };

  }



  handleInputChange = e => {


    this.setState({
      search: e.target.value,
      error: false,
      errorText: "",
     
    });

if(e.target.value == ""){
  this.setState({
     searchResult: null,
      loading: false
  })
}
 

  };

  handleSearch = () => {
     let search = this.state.search;
     if(search){
      this.setState({
      loading: true,
      searchResult: null
    })

      axios
      .post(`${path}/pictures/searchImage`, { search })
      .then(res => {
        console.log("result from server")
        let searchResult = res.data
        if(searchResult.length > 0){
        setTimeout(() => {
          this.setState({
          searchResult: searchResult
        })
        }, 1500);
        }else{
          setTimeout(() => {
             this.setState({
            loading: false,
            error: true,
            errorText:"sorry, tags not found"
          })
          }, 1000);
         
        }
        
      })

     }else{
       this.setState({
         error: true,
         errorText:"*must enter search value"
       })
     }
 
   
    console.log("your search", search)
   

  }



  render() {
    const { classes } = this.props;
    return (
      <div>
        <br/>
        <h2 className={"title"}>Search for Image</h2>
        <br />
        <div className={"container"}>
          <div className={"row"}>
            <div className={"col-md-6"}>
              <FontAwesomeIcon icon="hashtag" size="2x" className={"hashtag"}/>
            </div>
            <div className={"col-md-6"}>
              <TextField
                id="search"
                name="search"
                label="Search tags"
                className={classes.textField}
           
                onChange={this.handleInputChange}
                margin="normal"
              />
            </div>

          </div>
        </div>


        <br/>
        <br/>
        <br/>
      {this.state.error && <small className={"error"}>{this.state.errorText}</small>}
      
         
         <br/>
        <Button variant="contained" color="secondary" className={classes.button}
          onClick={this.handleSearch}>Search &nbsp;<FontAwesomeIcon icon="search" size="2x" className={"search"}/></Button>
         
           <br/>
             <br/>
    {!this.state.searchResult && this.state.loading && <div className={"lds-roller"}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
        <div className={"container"}>

          <div className={"row"}>
        
            {this.state.searchResult && this.state.searchResult.map((searchedItem, index) => {
            
              let tags = searchedItem.tags
  
              return <div key={index} className={"col-sm-3"}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={`${pathImg}/${searchedItem.path}`}

                  />
                  <CardContent>
                  {tags.map((tag,index)=>{
                    return <div className={"card-tags"} key={index}>#{tag}</div>
                    console.log(tag)})}
                 
                   
                  </CardContent>

                </Card>
              </div>


            })}
          </div>
        </div>

      </div>
    );
  }
}

SearchImage.propTypes = {
  classes: PropTypes.object.isRequired
};



export default withStyles(styles)(SearchImage);


