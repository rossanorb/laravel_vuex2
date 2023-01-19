import React, {Component} from 'react';

export default class Toastr extends Component {

    constructor(props){
        super(props);
        this.state = {
            toastrClass: ''
        }        
    }    

    componentDidMount() {
        this.props.onRef(this)
    }

    timeout = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    show = async (message, bgcolor) => {
        const { callback } = this.props;
        this.setState({
            toastrClass: `show ${bgcolor}`,
            message: message
        })

		await this.timeout(3000).then(() => {
            this.setState({
                toastrClass: ''
            })
		}).then(() => {            
            if( typeof callback === 'function') {                
                callback();
            }
		});
    }

    render() {        
        return(
            <div id="toastr" className={this.state.toastrClass}>{this.state.message}</div>
        )
    }
}
