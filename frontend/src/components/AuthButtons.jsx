import { useSelector } from "react-redux"

export default function AuthButtons() {
  const user = useSelector((state) => state.auth.user)
  return (
    <div>
      {!user ? (
        <>
          <button className="bg-purple-400 text-black px-4 py-2 rounded mr-2">Log in</button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded">Sign up</button>
        </>
      ) : (
        <img src={user.avatar} alt="Profile" className="h-8 w-8 rounded-full" />
      )}
    </div>
  )
}
