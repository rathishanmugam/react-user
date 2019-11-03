import React, { Component } from 'react'
import UsersForm from './UsersForm';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
class UsersModel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    render() {
        // const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>

        const label = this.props.buttonLabel

        let button = ''
        let title = ''

        if(label === 'Edit'){
            button = <EditIcon
                variant="contained"
                color="secondary"
                onClick={this.toggle}
                style={{float: "left", marginRight:"10px"}}>{label}
            </EditIcon>
            title = 'Edit Item'
        } else {
            button = <Button
                variant="contained" color="primary"
                onClick={this.toggle}
                style={{float: "left", marginRight:"10px"}}>{label}
            </Button>
            title = 'Add New Item'
        }


        return (
            <>
            {button}
        <Dialog open={this.state.modal} onClose={this.toggle} >
            <DialogTitle >{title}</DialogTitle>
            <DialogContent>
                <UsersForm
                    items={this.props.items}
                    addItemToState={this.props.addItemToState}
                    updateState={this.props.updateState}
                    total={this.props.total}
                    toggle={this.toggle}
                    item={this.props.item} />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.toggle} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
        </>


        )
    }
}

export default UsersModel

//
// <div>
//     {button}
//     <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
//         <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
//         <ModalBody>
//             <UsersForm
//                 items={this.props.items}
//                 addItemToState={this.props.addItemToState}
//                 updateState={this.props.updateState}
//                 toggle={this.toggle}
//                 item={this.props.item} />
//         </ModalBody>
//     </Modal>
// </div>
