import React, {useState} from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { isAuthQuery, loginQuery } from '../queries';
import {Link} from 'react-router-dom';
export default ({history:{push}}) => {
  const {loading, data} = useQuery(isAuthQuery, {
    variables:{
      jwt:localStorage.getItem("jwt")
    }
  })
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [resError, setResError] = useState({
      email:"",
      password:""
  })
  const handleTextChange = (e) => {
    e.persist();
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };
  const [login] = useMutation(loginQuery);
  if(loading) return 'Loading...'
  setTimeout(() => {
    if(data.isAuth) push('/')
  }, 0)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login({
          variables: { email: form.email, password: form.password },
        }).then(({data:{login:{error, id}}}) => {
            if(error){
                setResError(error)
            }
            else{
                localStorage.setItem("jwt", id)
                push('/')
            }
        });
      }}
    >
      <input name="email" value={form.email}onChange={handleTextChange} type="email" />
      <div>{resError.email}</div>
      <input name="password" value={form.password}onChange={handleTextChange} type="password" />
      <div>{resError.password}</div>
      <button>Submit</button>
      <Link to="/register">Don't have an account? Register.</Link>
    </form>
  );
};
