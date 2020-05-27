import React, { Component} from 'react'
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'
import {flowRight as compose} from 'lodash';
import {getAuthorQuery, addBookMutaion, getBooksQuery} from '../queries/queries'

class AddBook extends Component{

    constructor(props){
        super(props);
        this.state={
            name: "",
            genre: "",
            authorId: ""
        }
    }

    displayAuthors = () => {
        console.log('this.props', this.props)
        const {authors, loading, error} = this.props.getAuthorQuery;
        if (loading) return <div className="loading"> loading ...</div>
        if (error) return <div className="error"> error {error} </div>
        return authors.map((author) => <option key={author.id} value={author.id}> {author.name} </option>)
    }

    handelChange = (e) =>{
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
        console.log('this.state', this.state)
    }

    handelSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.addBookMutaion({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId,
            },
            refetchQueries:[{query: getBooksQuery}]
        });
    }

    render(){
               
        return (
            <div className='add-book'>
            <form onSubmit={this.handelSubmit}>
                <div className='field'>
                        <label>Name: </label>
                        <input type="text" name="name" onChange={(e)=>this.handelChange(e)}/>
                    </div>
                    <div className='field'>
                        <label>Genre: </label>
                        <input type="text" name="genre" onChange={(e)=>this.handelChange(e)}/>
                    </div>
                    <div className='field'>
                        <label>Author: </label>
                        <select name="authorId" onChange={(e)=>this.handelChange(e)}>
                            <option value="0">Select an Author</option>
                            {
                            this.displayAuthors()
                            }
                        </select>
                    </div>
                    <div className='field'>
                        <button>+</button>
                    </div>
                </form>
            </div>    
        )
    }

}

export default compose(
    graphql(getAuthorQuery, {name:"getAuthorQuery"}),
    graphql(addBookMutaion, {name:"addBookMutaion"}),
)
(AddBook)
