'use client'
import { useUserContext } from "./components/contextProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import {useRouter} from "next/navigation"

export default function Home() {

  const router = useRouter()
  const [error, setError] = useState('')
  const [loading,setLoading] = useState(true)
  const {setUsers} = useUserContext();

  useEffect(()=>{
       axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            setUsers(response.data);
            router.push('/users')
            
        })
        .catch(err => {
            setError(
            err.response.data.match(/Error:\s(.+?)<br>/)
              ? err.response.data.match(/Error:\s(.+?)<br>/)[1]
              : "An error occurred",
          );
        })
        .finally(() => setLoading(false));

    },[]);

  return (
    <div>
      {loading ? <p className=" text-green-400">Loading...</p> : null}
      {error && <p className=" text-red-400 ">{error}</p>}
    </div>
  );
}
