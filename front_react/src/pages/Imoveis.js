// import { useEffect, useState } from "react";
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from "react-router-dom";
import ImoveisList from './../components/ImoveisList';
import api from '../api/apiImovel';

export default class Imoveis extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: '',
            errors: '',
            table: {
                show_action_column: true,
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

    async list() {
        const response = await api.List('page=1&limit=5');        
        this.setState({
            items: response.data.result.data
        })
    }

    render() {
        const { items, table } = this.state;
        
        return (
            <div className="container">
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
                                /> 
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
