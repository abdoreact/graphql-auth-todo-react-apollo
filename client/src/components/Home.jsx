import React, { useState } from 'react';
import {useQuery, useMutation} from '@apollo/client';
import { currentUserQuery, addTodoQuery } from '../queries';
import { withRouter } from 'react-router-dom';
export default withRouter(({history:{push}}) => {
    const [text, setText] = useState("")
    const [todos, setTodos] = useState([])
    const [addTodo] = useMutation(addTodoQuery)
    const {loading, data, error} = useQuery(currentUserQuery, {
        variables:{
            jwt:localStorage.getItem("jwt")
        }
    })
    const handleSubmit = e => {
        e.preventDefault();
        setText("")
        addTodo({variables:{body:text, jwt:localStorage.getItem("jwt")}})
        .then(({data:{addTodo:{_id, body}}}) => setTodos(prevTodos => [...prevTodos, {_id, body}]))
    }
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
                {todos.map(({_id, body}) => <li key={_id}>{body}</li>)}
            </ul>
            <form onSubmit={handleSubmit}>
                <input value={text} type='text' onChange={e => setText(e.target.value)} />
                <button>Add Todo</button>
            </form>
        </div>
    )
})