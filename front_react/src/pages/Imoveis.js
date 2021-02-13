// import { useEffect, useState } from "react";
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from "react-router-dom";
import ImoveisList from '../components/Table';
import api from '../api/apiImovel';
import Dialog from '../components/Dialog';

export default class Imoveis extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            data: '',
            errors: '',
            table: {
                actions: ['delete'],
                columns: [
                    {
                        name: 'E-mail',
                        mapping: 'email',
                        sort: true
                    },
                    {
                        name: 'Endereço',
                        mapping: 'rua',
                        sort: true
                    },
                    {
                        name: 'Status',
                        mapping: 'contrato',
                        sort: true
                    }
                ]
            }
        }        
    }
    
    componentDidMount() {
        this.list()
    }

    confirmDelete = (id) => {
        console.log('confirmDelete => '+ id)
        this.setState({id: id})
        this.dialog.show()
    }

    remove = async () => {
        try {
            const request = await api.delete(this.state.id);
            if(request.status) {
                alert('Excluido com sucesso!')
            }

            this.list();

        } catch (error) {
            console.log(error)
        }
    }

    list = async () => {        
        const request = await api.List('page=1&limit=5');
        this.setState({
            items: request.result
        })
    }

    render() {
        const { items, table } = this.state;
        
        return (
            <div className="container">
                <Dialog                    
                    callback={this.remove}
                    onRef={ref => (this.dialog = ref)}
                 />
                <div className="py-5 text-center">
                    <h2>Imóveis</h2>
                </div>
                <div className="row">
                    <Router>
                    <div className="col-sm-12">
                        <Link className="btn btn-success mb-3" to="/imoveis/cadastro">Cadastrar</Link>
                    </div>
                    </Router>
                    <div className="col-sm-12">
                        <div className="table-responsive">
                        { items && <ImoveisList 
                                    items={items}
                                    table={table}
                                    confirmDelete={ this.confirmDelete }
                                /> 
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
