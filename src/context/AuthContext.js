import React, { createContext, Component } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

class AuthContextProvider extends Component{
    state = {
        isAuthenticated: false,
        user: null,
        token: null,
        error: null
    }    

    loginUser = (credenciales) => {
        axios.post(process.env.REACT_APP_BACK_URL + '/Usuarios/Login', credenciales)
            .then(res => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('usuario', res.data.usuario)
                this.setState({
                    ...this.state,
                    token: res.data.token,
                    user: res.data.usuario,
                    isAuthenticated: true,
                    error: null
                })
            })
            .catch(err => {
                console.log(err)
                localStorage.removeItem('token')
                localStorage.removeItem('usuario')
                this.setState({
                    ...this.state,
                    token: null,
                    user: null,
                    isAuthenticated: false,
                    error: err
                })
        })            
    }

    logoutUser = () => {
        localStorage.removeItem('token')
        this.setState({
            ...this.state,
            token: null,
            user: null,
            isAuthenticated: false,
            error: null
        })

    }

    registerUser = (usuario) => {
        axios.post(process.env.REACT_APP_BACK_URL + '/Usuarios/Register', usuario)
            .then(res => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('usuario', res.data.usuario)
                this.setState({
                    ...this.state,
                    token: res.data.token,
                    user: res.data.usuario,
                    isAuthenticated: true,
                    error: null
                })
            })
            .catch(err => {
                console.log(err)
                localStorage.removeItem('token')
                localStorage.removeItem('usuario')
                this.setState({
                    ...this.state,
                    token: null,
                    user: null,
                    isAuthenticated: false,
                    error: err
                })
        })            
    }

    componentDidMount(){
        var token = localStorage.getItem('token')   
        var usuario = localStorage.getItem('usuario')   
        if (token && usuario){
            this.setState({
                token: token,
                user: usuario,
                isAuthenticated: true,
                error: null
            })
        }else{
            localStorage.removeItem('token')
            localStorage.removeItem('usuario')
        }
    }

    render(){
        return(
            <AuthContext.Provider value={{
                ...this.state, 
                registerUser:this.registerUser,
                loginUser:this.loginUser,
                logoutUser:this.logoutUser
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthContextProvider;