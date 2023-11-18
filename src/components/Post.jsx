import { BsThreeDots } from "react-icons/bs"
import {BiMessageRounded} from "react-icons/bi"
import {FaRetweet} from "react-icons/fa"
import {FcLike} from "react-icons/fc"
import {AiOutlineHeart} from "react-icons/ai"
import {FiShare2} from "react-icons/fi"
import { auth, db} from "./../firebase/config";
import moment from "moment/moment";
import "moment/locale/tr";
import { toast } from "react-toastify"
import { arrayRemove, arrayUnion, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"

const Post = ({tweet}) => {
  const [isLiked, setİsLiked]= useState(false);

    // firebase timestamp değerini
 const date= tweet.createdAt?.toDate();
//  tweet atılma tariihinden itibarenden geçen zaman
 const time_ago= moment(date).fromNow()
 
 useEffect(() => {
 const found= tweet.likes.find(
  (userId)=>  userId === auth.currentUser.uid)

  setİsLiked(found)

 }, [tweet])
 
//  üçnokta silme
 const handleDelete = () => {
  const answer= confirm("Tweeti silmek istiyor musunuz?")

   if(answer){
    // silmek istediğimiz doc referansını alma.
    const ref= doc(db, "tweets", tweet.id);
    // doc silme
    deleteDoc(ref)
    .then(() => toast.error("Tweet silindi.."))
    .catch((err) => toast.error('Tweet silinirken bir hata oluştu'))
  
   }
 }

  //  tweet like 
  const handleLike = () => {
      const ref= doc(db, "tweets", tweet.id);

      updateDoc(ref, 
        // like / unlike
        {likes: isLiked 
          ? arrayRemove(auth.currentUser.uid)
          : arrayUnion(auth.currentUser.uid)});
  }


  return (
    <div className="flex gap-3 p-3 border-b-[0.5px] border-gray-800">
      <img
      className="w-14 h-14 rounded-full"
      src={tweet.user.photo} />

      <div className="w-full">
        {/* kullnaıcı bilgiler */}
        <div className="flex justify-between">
            <div className="flex items-center gap-3">
                <p className="font-bold">{tweet.user.name}</p>
                <p className=" text-gray-400">@{tweet.user.name.toLowerCase}</p>
                <p className=" text-gray-400">{time_ago}</p>
            </div>
            {/* hesabı açık olan kullanıcı da üçnoktayı gösterir. */}
           {tweet.user.id === auth.currentUser.uid &&  <BsThreeDots  onClick={handleDelete} /> }
        </div>

        {/* tweet içeriği */}
        <div className="m-3">
            <p>{tweet.textContent}</p>
            {/* resim gönderirise eğer */}
            {tweet.imageContent && <img className="rounded-lg mt-3" src={tweet.imageContent}/>}
        </div>
        {/* butonlar */}
        <div className="flex items-center justify-between">
            <div className="p-2 rounded-full cursor-pointer transition hover:bg-gray-700">
            <BiMessageRounded className="text-lg"/>
            </div>
            <div className="p-2 rounded-full cursor-pointer transition hover:bg-gray-700">
            <FaRetweet className="text-lg"/>
            </div>
            <div
             onClick={handleLike}
             className=" flex items-center gap-2 p-2 rounded-full cursor-pointer transition hover:bg-gray-700">
          { isLiked? (
            <FcLike className="text-lg"/>
          ) : (
            <AiOutlineHeart  className="text-lg"/>
          )}
            <span>{tweet.likes.length}</span>
            </div>
            <div className="p-2 rounded-full cursor-pointer transition hover:bg-gray-700">
            <FiShare2 className="text-lg"/>
            </div>
          

        </div>
      </div>
    </div>
  )
}

export default Post