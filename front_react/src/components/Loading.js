import React, { Component } from 'react';
import axios from 'axios';

export default class Loading extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingClass: 'overlay'
        }
    }

    componentDidMount() {
        this.enableInterceptor();
        this.loading(true);
        setTimeout(() => {
            this.loading(false);
        }, 1000)
    }

    loading = (status) => {
        if(status) {
            this.setState({
                loadingClass: 'overlay active'
            })
        }

        if(!status) {
            this.setState({
                loadingClass: 'overlay'
            })
        }
    }   

    enableInterceptor = () => {
        
            axios.interceptors.request.use((config) => {
                this.loading(true);
                return config;
            }, (error) => {
                return Promise.reject(error);
            })

            axios.interceptors.response.use((response) => {                
                this.loading(false);
                return response;
            }, function(error) {                
                return Promise.reject(error)
            })
    }

    render(){
        return (
            <div id="loader-component" className={this.state.loadingClass}>
                <div class="spinner">
                    <div class="cube1"></div>
                    <div class="cube2"></div>
                </div>
            </div>
        )
    }
}

