import React, {useState} from 'react';
import { useMutation, gql, useQuery } from "@apollo/client";
import { isAuthQuery } from '../queries';
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
  const [register] = useMutation(gql`
    mutation Register($email: String, $password: String) {
      register(email: $email, password: $password) {
        id
        error {
          email
          password
        }
      }
    }
  `);
  if(loading) return 'Loading...'
  setTimeout(() => {
    if(data.isAuth) push('/')
  }, 0)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        register({
          variables: { email: form.email, password: form.password },
        }).then(({data:{register:{error, id}}}) => {
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
      <Link to="/login">Already have an account? Login.</Link>
    </form>
  );
};
