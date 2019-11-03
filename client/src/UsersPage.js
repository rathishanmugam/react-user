import React, { Component } from 'react'
import UsersModel from './UsersModel'
import UsersTable from './UsersTable'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Snackbar from "@material-ui/core/Snackbar";
import {IconButton} from "@material-ui/core";

class UsersPage extends Component {
    constructor(){
        super();
        this.getItems = this.getItems.bind(this);
    }
  state = {
    items: [],
      total: null,
      snackbaropen: false,
      snackbarmsg: '',
  }
    SnackbarClose = (event) => {
        this.setState({
            snackbaropen: false,
            snackbarmsg: '',
        });
    };

    openSnackbar = ({ message }) => {
        this.setState({ open: true, message });
    };
  getItems(page,limit, sort , order,filter){
      let params = {
          "page": page ? page : "0",
          "limit": limit ? limit : "5",
          "sort": sort ? sort : 'first',
          "order": order ==='desc' ? -1 : 1,
          "filter": filter ? filter : ''
      }

      let query = Object.keys(params)
          .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
          .join('&');

      let url = 'http://localhost:8081/api/user?' + query
      console.log('query', url);
      fetch(url)
      // fetch('http://localhost:8081/api/user')
        .then(response => response.json())
        .then(res => {
            this.setState({items: res.docs,
                total: res.count,
            });
            console.log('responce', res.docs);
            console.log('state', this.state.items);

        })
        .catch(err => console.log(err))
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
    console.log('the item after loaded',this.state.items);
      this.setState({snackbaropen:true, snackbarmsg:'User Added Sucessfully'});
      this.getItems()
  }

  updateState = (item) => {
    this.setState(...this.state.items.splice(this.state.items.indexOf(item.id), 1, item))
this.setState({snackbaropen:true, snackbarmsg:'User updated Sucessfully'});
      this.getItems()
    // const itemIndex = this.state.items.findIndex(data => data.id === item.id)
    // const newArray = [
    //     // destructure all items from beginning to the indexed item
    //     ...this.state.items.slice(0, itemIndex),
    //     // add the updated item to the array
    //     item,
    //     // add the rest of the items to the array from the index after the replaced item
    //     ...this.state.items.slice(itemIndex + 1)
    // ]
    // this.setState({ items: newArray })
  }

  deleteItemFromState = (id) => {
    this.setState({items:(this.state.items.filter(item => item.id !== id))})
      this.setState({snackbaropen:true, snackbarmsg:'User Deleted Sucessfully'});
      this.getItems()
    // const updatedItems = this.state.items.filter(item => item.id !== id)
    // this.setState({ items: updatedItems })
  }

  componentDidMount(){
    this.getItems()
  }

  render() {
    return (
        <Card style={{maxWidth: 1000 , marginLeft:20}}>
          <CardActionArea>
            <CardContent>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    message={<span id='message-id'>{this.state.snackbarmsg}</span>}
                    autoHideDuration={3000}
                    onClose={this.SnackbarClose}
                    open={this.state.snackbaropen}
                    ContentProps={{
                        'aria-describedby': 'snackbar-message-id',
                    }}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="close"
                        color='inherit'
                        onClick={this.SnackbarClose}
                        > x </IconButton>
                    ]}
                />
              <Typography gutterBottom variant="h5" component="h2">
                CRUD Database
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <UsersTable items={this.state.items} total={this.state.total} getItems={this.getItems} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />

              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <UsersModel items={this.state.items} total={this.state.total} buttonLabel="Add Item" addItemToState={this.addItemToState}/>
          </CardActions>
        </Card>
    )
  }
}
export default UsersPage
