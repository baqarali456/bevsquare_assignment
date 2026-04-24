'use client'
import { useUserContext } from "./contextProvider";
import { useRouter } from "next/navigation"

function UsersList() {

  const router = useRouter()
  const { users } = useUserContext();

  return (
    <div className="container mx-auto my-4 flex flex-wrap gap-4">
         {
          users.map(user=>(
            <div key={user.id} className="bg-orange-500 flex-col items-start flex gap-4 text-white w-[300px] rounded-xl p-4 shadow-md">
              <h2 className="text-lg font-bold">{user.name}</h2>
              <p className="text-white-600">{user.email}</p>
              <button onClick={()=>router.push(`/users/${user.id}`)} className="rounded-xl cursor-pointer bg-blue-400 text-white p-2 bg-gray ">View</button>
            </div>
          ))
         }
    </div>
  )
}

export default UsersList