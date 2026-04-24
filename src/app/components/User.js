'use client'
import { useParams } from "next/navigation";
import axios from "axios"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import { useUserContext } from "./contextProvider";


function User() {
    const { id } = useParams();
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [deleteError, setDeleteError] = useState('')

    const { setUsers } = useUserContext();

    const router = useRouter()

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(response => {

                setUser(response.data);

            })
            .catch(err => {

                setError(
                    err.response?.data.match(/Error:\s(.+?)<br>/)
                        ? err.response.data.match(/Error:\s(.+?)<br>/)[1]
                        : "An error occurred",
                );
            })
            .finally(() => setLoading(false));
    }, [id])


    const handleUpdate = (id) => {
        if (id) {
            router.push(`/users/edit/${id}`)

        }
    }


    const handleDelete = async (id) => {
        setDeleteError('')
        try {
            if (id) {
                await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
                setUsers(prev => prev.filter(ele => ele.id !== Number(id)))
                router.push('/users')
            }
        }
        catch (err) {
            setDeleteError(err.message)
        }


    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            {
                loading ? <h1 className=" text-2xl font-bold uppercase text-green-500">Loading ...</h1> : (error ? <h1 className=" text-2xl font-bold uppercasetext-red-500">{error}</h1> : <div className="rounded bg-orange-500 w-[350px] text-white flex flex-col gap-4 p-4 items-start">
                    <h1 className=" font-bold uppercase text-2xl">{user?.name}</h1>
                    <p className=" text-xl">{user?.email}</p>

                    <div className="flex self-stretch items-center justify-between">
                        <button onClick={() => handleUpdate(user?.id)} className=" cursor-pointer bg-green-500 p-2 rounded text-white">Update</button>
                        <button onClick={() => handleDelete(user?.id)} className=" cursor-pointer bg-red-500 p-2 rounded text-white">Delete</button>

                    </div>

                    {
                        deleteError && <p className=" text-red-500">{deleteError}</p>
                    }

                </div>
                )
            }
        </div>
    )
}

export default User;