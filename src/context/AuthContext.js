import React, { createContext, Component } from 'react'
import axios from 'axios'
import { store } from 'react-notifications-component';

export const AuthContext = createContext()

class AuthContextProvider extends Component {
    state = {
        isAuthenticated: false,
        propietario: false,
        user: null,
        token: null,
        error: null,
        paisUsuario: null,
    }

    loginUser = (credenciales) => {
        axios.post(`${process.env.REACT_APP_BACK_URL}/Usuarios/Login`, credenciales)
            .then(res => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('usuario', JSON.stringify(res.data.usuario))
                localStorage.setItem('propietario', res.data.usuario.rolId === 1)

                this.setAxiosToken(res.data.token)

                this.setState({
                    ...this.state,
                    propietario: res.data.usuario.rolId === 1,
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
                localStorage.removeItem('propietario')
                this.setState({
                    ...this.state,
                    token: null,
                    user: null,
                    isAuthenticated: false,
                    error: err
                })
                store.addNotification({
                    title: "Error",
                    message: "Ocurrió un error al intentar iniciar sesion, intenta mas tarde",
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
        localStorage.removeItem('propietario')
        this.setState({
            ...this.state,
            token: null,
            user: null,
            isAuthenticated: false,
            propietario: false,
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

    cambiarRol = (usuario) => {
        this.setState({
            ...this.state,
            propietario: true,
            error: null
        })
        store.addNotification({
            title: "Listo",
            message: "Ahora eres propietario",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeInDown"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: false
            }
        })
        usuario.rolId = 1;
        axios.put(`${process.env.REACT_APP_BACK_URL}/Usuarios/UpdateUsuario`, usuario)
        localStorage.setItem('propietario', true)
    }

    registerUser = (usuario) => {
        axios.post(`${process.env.REACT_APP_BACK_URL}/Usuarios/Register`, usuario)
            .then(res => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('usuario', JSON.stringify(res.data.usuario))
                localStorage.setItem('propietario', false)
                this.setAxiosToken(res.data.token)
                this.setState({
                    ...this.state,
                    token: res.data.token,
                    user: res.data.usuario,
                    isAuthenticated: true,
                    propietario: false,
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
                localStorage.removeItem('propietario')
                this.setState({
                    ...this.state,
                    token: null,
                    user: null,
                    isAuthenticated: false,
                    error: err
                })
                store.addNotification({
                    title: "Error",
                    message: "Ocurrió un error en el registro, intenta mas tarde",
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

    getPais = (usuario) => {
        delete axios.defaults.headers.get["Authorization"];
        axios.get(`${process.env.REACT_APP_COUNTRIES_URL}/alpha/${usuario.nacionalidad}`, {
            params: {
                fields: "name;flag",
            }
        }).then(res => {
            this.setState({
                ...this.state,
                paisUsuario: res.data,
                isAuthenticated: true
            })
        }).catch(err => {
            console.log(err)
            this.setState({
                ...this.state,
                paisUsuario: null
            })
        })
        axios.defaults.headers.get['Authorization'] = "Bearer " + localStorage.getItem("token")
    }

    setAxiosToken(token) {
        axios.defaults.headers.post['Authorization'] = "Bearer " + token
        axios.defaults.headers.get['Authorization'] = "Bearer " + token
        axios.defaults.headers.put['Authorization'] = "Bearer " + token
        axios.defaults.headers.delete['Authorization'] = "Bearer " + token
    }

    componentDidMount() {
        var token = localStorage.getItem('token')
        var usuario = localStorage.getItem('usuario')
        var propietario = localStorage.getItem('propietario')
        usuario = JSON.parse(usuario)
        if (token && usuario) {
            this.setState({
                token: token,
                user: usuario,
                isAuthenticated: true,
                propietario: propietario === "true",
                error: null
            })

            this.setAxiosToken(token)

        } else {
            localStorage.removeItem('token')
            localStorage.removeItem('usuario')
            localStorage.removeItem('propietario')
        }
    }

    render() {
        return (
            <AuthContext.Provider value={{
                ...this.state,
                registerUser: this.registerUser,
                loginUser: this.loginUser,
                logoutUser: this.logoutUser,
                cambiarRol: this.cambiarRol,
                getPais: this.getPais,
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthContextProvider;