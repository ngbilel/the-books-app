import React, {Component} from 'react'
import { graphql } from 'react-apollo'
import {  getBookQuery } from '../queries/queries'


class BookDetails extends Component{

    render(){

        if (!this.props.bookId)   
            return <div id="book-details"><h2>Book details</h2> <p>No Book Selected</p></div>
            
        const {book, loading, error} = this.props.data;

        if(loading) return  <div>Loading ...</div>
        if(error) return <div> error </div>

        const {name,genre, author} = book;

        return (
            <div id="book-details">
                <h2>Book details</h2>
                <p> <b>Name</b>: {name}</p>
                <p> <b>Genre</b> : {genre}</p>
                <p> <b>Author</b>: {author.name}</p>
                    
            </div>
        )
        
        
    }

}

export default (graphql)(getBookQuery,{
    options: (props)=>{
        return{
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails)