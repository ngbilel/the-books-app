import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import { graphql } from 'react-apollo'
import {getBooksQuery} from '../queries/queries'
import BookDetails from './BookDetails';

class BookList extends Component {
    constructor(props){
        super(props);
        this.state={
            selectedBookId: null
        }
    }

    handelClick = (bookId) => {

        const booksId = bookId.toString();

        console.log('typeof ', typeof booksId )

        this.setState({
            selectedBookId: booksId
        });

        console.log('this.state.selectedBookId', this.state.selectedBookId)
    }

    render(){
        const  {books, loading, error} = this.props.data;

        if (loading) return <div className="loading"> loading ...</div>
        if (error) return <div className="error"> error {error} </div>

        return(
            <>
                <div id="book-list">
                    <ul>
                        {    
                            books.map((book)=><li key={book.id} onClick={()=>this.handelClick(book.id)}> {book.name }</li>)
                        }
                    </ul>
                </div>
                <BookDetails bookId={this.state.selectedBookId}></BookDetails>
            </>

        )
    }
}

export default graphql(getBooksQuery)(BookList)