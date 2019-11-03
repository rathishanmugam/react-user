import React from 'react';
// import { FormControl,InputLabel,Input,FormHelperText } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';

class UsersForm extends React.Component {
    state = {
        id: 0,
        first: '',
        last: '',
        email: '',
        phone: '',
        location: '',
        hobby: '',
        added:''

    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitFormAdd = e => {
        e.preventDefault()
        // const id= Math.max(...this.props.items.map(i => i.id))+1;
        const id = parseInt(this.props.total,10)+1
        this.setState({id});
        console.log('the id is',id);
        fetch('http://localhost:8081/api/user', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // id: Math.max(...this.props.items.map(i => i.id))+1,
                id:this.state.id,
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                phone: this.state.phone,
                location: this.state.location,
                hobby: this.state.hobby,
                added: new Date().toLocaleDateString(),
            })
        })
            .then(response => response.json())
            .then(data => {this.setState({ data })
                console.log('the saved item',{ data });
                        this.props.addItemToState(this.state)
                 console.log('the saved item',this.state);
                this.props.toggle()

            })
            .catch(err => console.log(err))
    }

    submitFormEdit = e => {
        e.preventDefault()
        fetch('http://localhost:8081/api/user/' + this.state.id, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                phone: this.state.phone,
                location: this.state.location,
                hobby: this.state.hobby,
                added: new Date().toLocaleDateString(),
            })
        })
            .then(response => response.json())
            .then(data => {this.setState({ data })
                    this.props.updateState(this.state)
                console.log('the updated item',{ data });
                this.props.toggle()

            })
            .catch(err => console.log(err))
    }

    componentDidMount(){
        // if item exists, populate the state with proper data
        if(this.props.item){
            const { id, first, last, email, phone, location, hobby } = this.props.item
            this.setState({ id, first, last, email, phone, location, hobby })
        }
    }

    render() {
        return (
            <ValidatorForm
                onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
                // onError={errors => console.log(errors)}
            >
                <TextValidator
                    label="first"
                    onChange={this.onChange}
                    name="first"
                    value={this.state.first === null ? '' : this.state.first}
                    validators={['required']}
                    errorMessages={['first name field is required']}
                />
                <br />
                <TextValidator
                label="last"
                onChange={this.onChange}
                name="last"
                value={this.state.last === null ? '' : this.state.last}
                validators={['required']}
                errorMessages={['last name field is required']}
            />
            <br />
                <TextValidator
                    label="Email"
                    onChange={this.onChange}
                    name="email"
                    value={this.state.email === null ? '' : this.state.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                />
                <br />
                <TextValidator
                    label="phone"
                    onChange={this.onChange}
                    name="phone"
                    value={this.state.phone === null ? '' : this.state.phone}
                    validators={['required','minNumber:0' ]}
                    errorMessages={['this field is required','min 8 digit']}
                />
                <br />
                <TextValidator
                    label="location"
                    onChange={this.onChange}
                    name="location"
                    value={this.state.location === null ? '' : this.state.location}
                    validators={['required']}
                    errorMessages={['location field is required']}
                />
                <br />
                <TextValidator
                    label="hobby"
                    onChange={this.onChange}
                    name="hobby"
                    value={this.state.hobby === null ? '' : this.state.hobby}
                    validators={['required']}
                    errorMessages={['hobby field is required']}
                />
                <br />
                <br />
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </ValidatorForm>

        );
    }
}

export default UsersForm
// {/*<Form noValidate onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>*/}
// {/*    <FormGroup>*/}
// {/*        <Label for="first">First Name</Label>*/}
// {/*        <Input type="text" name="first" id="first" onChange={this.onChange} required value={this.state.first === null ? '' : this.state.first} />*/}
// {/*    </FormGroup>*/}
// {/*    <FormGroup>*/}
// {/*        <Label for="last">Last Name</Label>*/}
// {/*        <Input type="text" name="last" id="last" onChange={this.onChange} required value={this.state.last === null ? '' : this.state.last}  />*/}
// {/*    </FormGroup>*/}
// {/*    <FormGroup>*/}
// {/*        <Label for="email">Email</Label>*/}
// {/*        <Input type="email" name="email" id="email" onChange={this.onChange} required value={this.state.email === null ? '' : this.state.email}  />*/}
// {/*    </FormGroup>*/}
// {/*    <FormGroup>*/}
// {/*        <Label for="phone">Phone</Label>*/}
// {/*        <Input type="text" name="phone" id="phone" onChange={this.onChange} required value={this.state.phone === null ? '' : this.state.phone}  placeholder="ex. 555-555-5555" />*/}
// {/*    </FormGroup>*/}
// {/*    <FormGroup>*/}
// {/*        <Label for="location">Location</Label>*/}
// {/*        <Input type="text" name="location" id="location" onChange={this.onChange}required  value={this.state.location === null ? '' : this.state.location}  placeholder="City, State" />*/}
// {/*    </FormGroup>*/}
// {/*    <FormGroup>*/}
// {/*        <Label for="hobby">Hobby</Label>*/}
// {/*        <Input type="text" name="hobby" id="hobby" onChange={this.onChange} required value={this.state.hobby}  />*/}
// {/*    </FormGroup>*/}
// {/*    <Button>Submit</Button>*/}
// {/*    /!*<button   style={{float: "left", marginRight:"10px"}} onClick={this.props.toggle}>Back</button>*!/*/}
//
// /* {</Form>}*/
