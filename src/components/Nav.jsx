import { signOut } from "firebase/auth"
import { navSections } from "../constants"
import {auth} from '../firebase/config'

const Nav = () => {

  return (
    <nav className='flex flex-col justify-between items-end p-2 py-4'>
      <div>
        <div className="flex justify-end my-5 ">
        <img className="w-14" src="logotwitter.png" />
        </div>
      
        {navSections.map((sec, i) => (
          <div className="flex items-center gap-3 text-lg p-5 cursor-pointer transition hover:bg-gray-900">
            {sec.icon}
            <span>{sec.title}</span>
          </div>
        ))}
      </div>
       

       <div className="flex flex-col gap-5 px-5">
        <div className="flex items-center gap-1 p-2">
          <img 
          className="w-12 h-12 rounded-full" 
          src={auth.currentUser.photoURL}
          />
          
          <p>{auth.currentUser.displayName}</p>
        </div>
        <button 
        onClick={()=> signOut(auth)} 
        className="bg-gray-700 p-1 rounded-lg">
          Çıkış yap</button>
       </div>
      </nav>
  )
}

export default Nav;