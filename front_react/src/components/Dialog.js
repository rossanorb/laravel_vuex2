import React, {Component} from 'react';


export default class Dialog extends Component {    

    constructor(props){
        super(props);
        this.state = {
            show: 'none',
            callback: Function
        }
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    show = () => {
        this.setState({
            show: 'block'
        })
    }    

    cancel = () => {
        this.setState({
            show: 'none'
        })
    }    

    callback = () => {
        this.props.callback()
    }    

    render() {        
        return (
            <div id="dialog" style={{
                display: this.state.show
            }} className="component-dialog modal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" aria-label="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h2 className="title">Deseja excluir?</h2>
                            <p className="text">Após exclusão os dados não poderão mais ser recuperados</p>
                        </div>
                        <div className="modal-footer">
                            <div className="col-xs-12 col-sm-4">
                                <button type="button" onClick={this.callback} className="btn btn-danger btn-md btn-block">Confirmar</button>
                            </div>
                            <div className="col-xs-12 col-sm-4">
                                <button type="button" onClick={this.cancel} className="btn btn-secondary btn-md btn-block">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



