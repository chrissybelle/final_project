import React from "react";

export const AppContext = React.createContext('app');

export default class AppProvider extends React.Component{
  
    state = {
      user : null,
      setUser: (user) => { 
          console.log('setting user login', user);
          this.setState({ user })
        }
    }

    render(){
      return (
        <AppContext.Provider value = {this.state}>
          {this.props.children}
        </AppContext.Provider>
      )

    }
  }