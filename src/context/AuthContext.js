import React, { createContext, Component } from 'react'
import axios from 'axios'
import { store } from 'react-notifications-component';

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
                store.addNotification({
                    title: "Listo",
                    message: "Iniciaste sesion de forma existosa",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeInDown"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: false
                    }
                });
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
                store.addNotification({
                    title: "Error",
                    message: err.response ? err.response.data : "Ocurrio un error al intentar iniciar sesion, intenta mas tarde",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeInDown"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: false
                    }
                });
    
        })            
    }

    logoutUser = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('usuario')
        this.setState({
            ...this.state,
            token: null,
            user: null,
            isAuthenticated: false,
            error: null
        })
        store.addNotification({
            title: "Listo",
            message: "Cerrraste sesion de forma existosa",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeInDown"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: false
            }
        });
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
                store.addNotification({
                    title: "Listo",
                    message: "Te has registrado de forma existosa",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeInDown"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: false
                    }
                });
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
                store.addNotification({
                    title: "Error",
                    message: err.response ? err.response.data : "Ocurrio un error en el registro, intenta mas tarde",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeInDown"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: false
                    }
                });
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