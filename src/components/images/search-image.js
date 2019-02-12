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

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const imgUrl = "http://localhost:2200/pictures"


const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  card: {
    maxWidth: 400,
    height: 250
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
class SearchImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: null,
      searchResult: null,
      loading: false

    };

  }

  // componentDidMount(){

  // }

  handleInputChange = e => {

    this.setState({
      search: e.target.value
    });

  };

  handleSearch = () => {
    this.setState({
      loading: true,
      searchResult: null
    })
    let search = this.state.search;
    console.log("your search", search)
    axios
      .post(`http://localhost:2200/pictures/searchImage`, { search })
      .then(res => {
        console.log("result from server")
        let searchResult = res.data
        console.log(searchResult)
        setTimeout(() => {
          this.setState({
          searchResult: searchResult
        })
        }, 1500);
        
      })

  }



  render() {
    const { classes } = this.props;
    return (
      <div>
        <h2>Search for Image</h2>
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
                label="Search"
                className={classes.textField}
           
                onChange={this.handleInputChange}
                margin="normal"
              />
            </div>

          </div>
        </div>


        <br />
        <br/>
        <br/>
        <Button variant="contained" color="secondary" className={classes.button}
          onClick={this.handleSearch}>Search</Button>

        <div className={"container"}>
{!this.state.searchResult && this.state.loading && <div className={"lds-roller"}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
          <div className={"row"}>
          
            {this.state.searchResult && this.state.searchResult.map((searchedItem, index) => {
            
              let tags = searchedItem.tags
  
              return <div key={index} className={"col-sm-3"}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={`${imgUrl}/${searchedItem.path}`}

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


