import React from 'react';
import {useQuery} from '@apollo/client';
import { currentUserQuery } from '../queries';
import { withRouter } from 'react-router-dom';
export default withRouter(({history:{push}}) => {
    const {loading, data, error} = useQuery(currentUserQuery, {
        variables:{
            jwt:localStorage.getItem("jwt")
        }
    })
    if(loading) return 'Loading...';
    if(error) return JSON.stringify(error)
    return(
        <div>
            <h1>{data.currentUser.email}</h1>
            <button onClick={() => {
                localStorage.removeItem("jwt")
                push('/login')
            }}>Log Out</button>
            <ul>
                {data.currentUser.todos.map(({_id, body}) => <li key={_id}>{body}</li>)}
            </ul>
        </div>
    )
})