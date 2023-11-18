
import { useEffect, useState } from "react"
import TweetForm from "./TweetForm"
import { onSnapshot, collection, query ,orderBy} from "firebase/firestore"
import { db } from "../firebase/config"
import Post from "./Post"

const Main = () => {
  const [tweets,setTweets]= useState([])
  const tweetsCol= collection(db, 'tweets')

  useEffect(() => {
    // obone old tweetleri sıralama
   const queryOpt=  query(tweetsCol, orderBy('createdAt', 'desc'))

    // gecici tweet tuttuğumuz yer
    onSnapshot(queryOpt, (snapshot) => {
      const tempTweets = []
// ihtiyacımız olna tweetleri diziye akraer
      snapshot.forEach((doc) =>
      tempTweets.push({...doc.data(), id:doc.id})
      );
         setTweets(tempTweets);
    });
  }, []);


  return (
    <main className="main border border-x-gray-800 col-span-3 md:col-span-2 xl:col-span-1 overflow-y-auto">
        <header className='font-bold p-4 border b-2 border-gray-800'>Anasayfa</header>
        <TweetForm/>

{/* LOADİNG */}
{/* eğer tweetler yoksa */}
{!tweets && (
<p className="text-center mt-[200px]">Yükleniyor...</p>)}

{/* atılan tweetleri listeleme */}
{tweets?.map((tweet) => (
  <Post key={tweet.id} tweet={tweet}/>
))}
    </main>
  )
}

export default Main