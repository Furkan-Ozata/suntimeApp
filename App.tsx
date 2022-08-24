import React, {Component} from "react";
import { MainNav } from "./src/navigation";
import { Provider } from "mobx-react";


export default class App extends Component{
  render(){
      return(
    <Provider>
       <MainNav />
       </Provider>
  
      )
  }
}