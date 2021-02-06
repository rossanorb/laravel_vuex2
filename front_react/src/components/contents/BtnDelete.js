import React, {Component} from 'react';
import TrashIcon from '../icons/TrashIcon'
export default class BtnDelete extends Component {

    onRemove = () => {
        this.props.confirmDelete(this.props.id)
    }    

    render(){
        return(
            <span className="btn-delete" onClick={this.onRemove} > <TrashIcon /> </span>
        )
    }

}
