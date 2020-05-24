import React, { createContext, Component } from 'react';

export const testContext = createContext()

class testContextProvider extends Component {

    state = { 
        isOwner : false
     }

    render() { 
        return (
            <testContext.Provider value = {{
                ...this.state
            }}>
                {this.props.children}
            </testContext.Provider>
        );
    }
}
 
export default testContextProvider;