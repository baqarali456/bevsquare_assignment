'use client'
import React from 'react'
import {useParams} from "next/navigation"
import { useUserContext } from './contextProvider'
import axios from "axios"
import {useState} from "react"

function EditForm() {

    const {id} = useParams()
    const {users,setUsers} = useUserContext()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');


    const user = users.find(user => user.id === Number(id));

    const [name, setName] = useState(user?.name || '')
    const [email, setEmail] = useState(user?.email || '')

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        setSuccess('');
        try{
          await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,{
            name,
            email
          })
          setUsers(prev=>prev.map(ele=>ele.id === Number(id) ? {...ele,name,email} : ele));
          setSuccess('User updated successfully!');
        }
        catch(err){
            setError(err.message)
        }
        finally{
            setIsSubmitting(false);
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen">
        <form onSubmit={handleSubmit} className="rounded-xl text-black flex flex-col gap-4 p-4 bg-white shadow  w-[500px] ">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <div className="flex flex-col">
                <label htmlFor="name">Name:</label>
                <input className="w-full rounded p-2 bg-black text-white" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

            </div>
            <div className="flex flex-col">
                <label htmlFor="email">Email:</label>
                <input className="w-full rounded p-2 bg-black text-white" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}
            {success && <div className="text-green-500 text-sm">{success}</div>}
            
            <button className=' rounded shadow bg-blue-500 text-white py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed
            ' type="submit" disabled={isSubmitting}>{isSubmitting ? 'Updating...' : 'Update User'}</button>
            
            </form>
    </div>
  )
}

export default EditForm