import React, {Component,useState}  from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


class Footer extends Component {

    state = {
        description : ""
    }
               
             const [open, setOpen] = useState(false);
           

             handleClickOpen = () => {
                this.setOpen(true);
            };
      
             handleClose = () => {
                this.setOpen(false);
            };
      
             handleChange = (event) => {
              this.setState({description : event.currentTarget.value});
            };

             handleAdd = () =>{
                const task = { description: this.state.description }
                if(task.description && task.description.length>0){
                    axios.post('/ajouter', task)
                    .then(res=>{
                        if(res.data){
                            this.props.getTodos();
                            this.setState({description:""})
                        }
                    })
                    .catch(err=>console.log(err))
                }else {
                    console.log('Faiss une saisie')
                }
            }

            handleAll = () =>{
                this.handleAdd();
                this.handleClose()
            }
            render(){
        return(
            <div>
                <Button variant="contained" onClick={this.handleClickOpen}>Ajouter une carte</Button>
                <Dialog open={this.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Ajouter une nouvelle tache</DialogTitle>
                        <DialogContent>
                        <TextField
                            autoFocus
                            value ={this.state.description}
                            margin="dense"
                            id="name"
                            label="Saisir la description"
                            type="text"
                            fullWidth
                            onChange = {this.handleChange}
                        />
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={this.handleAll} color="primary">
                            Valider
                        </Button>
                        </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default Footer;