import React from 'react'
import axios from "axios";
import { useHistory } from 'react-router-dom';

export default function SignOut() {

    const history = useHistory();

    const signOut = () => {
        axios.get('/auth/signOut').then( () => {
            history.push('/auth/login');

        }
        )
    }

  return (
    <button className='z-20 absolute right-[50px] bottom-[20px] px-4 py-2 bg-white rounded-xl' onClick={signOut}>Salir</button>
  )
}
