import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

export class Provider extends Component {
         state = {
           pokemon_list: [],
         };
         componentDidMount() {
           axios
             .get(
               `https://cors-anywhere.herokuapp.com/http://pokeapi.co/api/v1/pokemon/?limit=12&offset60`,
             )
             .then(res => {
               console.log(res.data.results);
               this.setState({ pokemon_list: res.data.results });
             })
             .catch(err => console.log(err));
         }

         render() {
           return (
             <Context.Provider value={this.state}>
               {this.props.children}
             </Context.Provider>
           );
         }
       }

export const Consumer = Context.Consumer;