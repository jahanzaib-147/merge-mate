import React from 'react'
import Login from '../components/Auth/Login'
import { useAuth } from "../context/Auth";

const Authentication = () => {
  const { user } = useAuth();
  console.log("user",user)
  return (
    <div><Login /></div>
  )
}

export default Authentication