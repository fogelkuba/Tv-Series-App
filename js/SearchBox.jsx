import React from 'react';
import Results from './Results.jsx'

const API = 'http://api.tvmaze.com/';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: {
                image:{
                    medium: ''
                }
            },
            val: ''
        };
    }

    searchQuery = (query) => {
        let finalURL = `${API}singlesearch/shows?q=${query}`;
        fetch(finalURL)
        .then( (res) => res.json() )
        .then( (data) => {
            this.setState({
                show: data,
            })
        })
        .catch( (err) => {
            console.log(err);
            this.setState({
                show: {
                    name: 'Sorry :('
                }
            })
        } )
    }

    submitForm = (e) => {
        e.preventDefault();
        let val = this.refs.query.value;
        this.setState({
            val: val
        });
        this.searchQuery(val);
        this.refs.query.value = '';
    }

    render(){
        console.log("Upcoming: " + this.props.userData)
        return(
            <div>
                Search:
                <form onSubmit={this.submitForm}>
                    <label><input type="search" ref="query" placeholder="type username and hit enter" /></label>
                </form>
                <Results
                    userData={this.props.userData}
                    show={this.state.show}
                />
            </div>
        );
    }
}

export default Search;
