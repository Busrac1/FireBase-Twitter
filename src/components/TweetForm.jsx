import { toast } from "react-toastify";
import { auth,db ,storage} from "./../firebase/config";
import { BsCardImage } from "react-icons/bs";
import { collection , addDoc, serverTimestamp} from "firebase/firestore";
import { uploadBytes, getDownloadURL , ref} from "firebase/storage";

const TweetForm = () => {

  // collection referans alma
  const tweetsCol= collection(db, 'tweets')


  // !! HER PROJEDE AYNIDIR. RESİM YÜKELEME STORAGE
  //  !! pdf video gift aynı şey yapılabilir.
  // resim storage yükleme
  const uploadImage=async(image) => {
    if(!image){
      return null;
    }
    // remsin storagede ki yerini ayarlama
   const storageRef=  ref(
    storage, 
    `${new Date().getTime()} ${image.name}`
    );

    // remi ayarladığımız yere gönderme
    const url= await uploadBytes(storageRef, image)

     .then((res) => getDownloadURL(res.ref))
      .catch(() => toast.error('resmi yüklerken hata oluştu'))
     
      return url;
  };

  // formun gönderilmesi
  const handleSubmit= async (e) => {
    e.preventDefault();
   const textContent= e.target[0].value;
   const imageContent= e.target[1].files[0];
   
   const url= await uploadImage(imageContent)

   if(!textContent){
    toast.info("Tweet içeriği ekleyiniz.");
    return;
   }

  // tweet kolessiyona ekleme
  await addDoc(tweetsCol, {
    textContent,
    imageContent: url , 
    createdAt: serverTimestamp(),
    user:{
      id:auth.currentUser.uid,
      name:auth.currentUser.displayName,
      photo:auth.currentUser.photoURL
    },
    likes:[],
  });

  //  tweet lerin sıfırlanması
  e.target[0].value= '';
  e.target[1].value= null;
  }
  return (
    <form
    onSubmit={handleSubmit}
     className="flex gap-3 p-4 border-b-2 border-b-gray-800">
      <img className="rounded-full h-[50px]" src={auth.currentUser?.photoURL} />

      <div className="w-full">
        <input
          placeholder="Neler oluyor?!"
          className="placeholder:text-lg w-ful bg-transparent my-2 outline-none"
          type="text"
        />

        <div className="flex h-[45px ] items-center justify-between">
          <div className="hover:bg-gray-800 transition p-4 cursor-pointer rounded-full">
            <label htmlFor="picture">
              <BsCardImage />
            </label>

            <input className="hidden" id="picture" type="file" />
          </div>

          <button className="bg-blue-600 px-4 py-2 rounded-full transition hover:bg-blue-600">
            Tweetle
          </button>
        </div>
      </div>
    </form>
  );
};

export default TweetForm;
