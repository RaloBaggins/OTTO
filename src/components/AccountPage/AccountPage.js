import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class AccountPage extends Component {
    state = {
        status: true
    }
    
    editListing(data) {
        console.log('Edit doesnt do anything yet');
        this.props.dispatch({
            type: 'EDIT_LISTING',
            payload: data
        });
        this.props.dispatch({
            type: 'EDIT_MODE'
        });
        this.props.history.push("/PropertyInputPage");
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_ACCOUNT'
        });
    }

    handleClick = () => {
        this.setState({
            status: true
        })
    }

    handleClick2 = () => {
        this.setState({
            status: false
        })
    }

    removeFavorite = (data) => {
        this.props.dispatch({
            type: 'DELETE_FAVORITE',
            payload: data
        })
    }

    removeListing = (data) => {
        this.props.dispatch({
            type: 'UPDATE_PROPERTY',
            payload: data
        })
    }

    render() {
        return (
            <div className='container'>
                <h1>AccountPage</h1>
                <h4>
                        Hello "<b>{this.props.user.first_name}</b> <b>{this.props.user.last_name}</b>",
                </h4>
                <button onClick={this.handleClick}>My Listings</button>
                <button onClick={this.handleClick2}>My Favorites</button>
                <div className='account'>
                    
                    <table id="table">
                        <thead>
                            <tr>
                                <th>Address</th>
                                <th>Remove</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                  
                    {this.state.status ? (
                        <>
                            {this.props.reduxState.accountListing.map(property => (
                            
                                    <tr key={property.id} className="property" >
                                    <td>{property.address}</td>
                                    <td><button onClick={() => this.removeListing(property)}>Remove Listing</button></td>
                                    <td><button onClick={() => this.editListing(property)}>Edit Listing</button></td>
                                    </tr>
                                   
                               
                            ))}
                        </>
                    ) : (
                            <>
                                {this.props.reduxState.accountFavorite.map(favorite => (
                                        <tr key={favorite.id} className="favorite" >
                                        <td>{favorite.address}</td>
                                        <td><button onClick={() => this.removeFavorite(favorite)}>Remove Favorite</button></td>
                                        </tr>
                                ))}
                            </>)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (reduxState) => ({
    errors: reduxState.errors,
    reduxState,
    user: reduxState.user
});
export default connect(mapStateToProps)(AccountPage);
