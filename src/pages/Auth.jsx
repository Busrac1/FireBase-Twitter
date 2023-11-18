import { useEffect, useLayoutEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail, 
  signInWithRedirect,
  signInWithPopup
 } from 'firebase/auth'
import {auth, googleProvider} from '../firebase/config'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Auth = () => {
    // kaydol true , giriş yap false verince. değişsin
    const [signUp, setSignUp]= useState(false)
    const [email,setEmail]= useState('');
    const [isError,setIsError]= useState(false);
    const navigate= useNavigate() 
    
    useEffect(()=> {
    
      // kullanıcı varsa onu feed sayfasına yönlendir
        if(auth.currentUser){
          navigate('/feed')
        }
    }, [])

    // form gönderildiğinde
    const handleSubmit = (e) => {
        e.preventDefault();
// form da değerlere erişme
        const mail= e.target[0].value;
        setEmail(mail);
        const pass= e.target[1].value

       if(signUp){
        // hesap oluştur
        createUserWithEmailAndPassword(auth, mail, pass)
        .then(() => {
          navigate('/feed')
          toast.success('Hesabınız oluşturuldu.')
        })
        .catch((err)=>{
          toast.error(`Üzgünüz bir hata oluştu: ${err.code}`)
        })
       }else{
        // giriş yap
        signInWithEmailAndPassword(auth, mail, pass)
        .then(() => {
          navigate('/feed')
          toast.success('Hesabınıza giriş yapıldı.')
        })
        .catch((err)=>{
          // giriş bilgileri yanlışsa state aktar. 
          if(err.code === 'auth/invalid-login-credentials'){
             setIsError(true)
          }
          toast.error(`Üzgünüz bir hata oluştu: ${err.code}`)
        })
       }
    }

     // şifre sıfırlandıpında
    const handlePassReset = () => {
        sendPasswordResetEmail(auth,email)
        .then(() => toast.info("Mailinize sıfırlama e-postası gönderildi."))
    };

    // google giriş yapma
    const handleGoogle= () => {  
    signInWithPopup(auth, googleProvider)
    .then(() => {
      navigate('/feed');
      toast.success('Google hesabınız ile giriş yapıldı.')
    })
    }

  return (
    <section className="h-screen bg-zinc-800 grid place-items-center">
      <div className="bg-black text-white flex flex-col gap-10 py-16 px-32 rounded-lg">

        <div className="flex justify-center">
            <img className="h-[60px]" src="/logotwitter.png"/>
        </div>
        <h1 className="text-center font-bold text-lg">Twitter'a  giriş yap</h1>

        <div onClick={handleGoogle} className="flex bg-white items-center py-2 px-10 rounded-full cursor-pointer gap-3 hover:bg-gray-300">
            <img className="h-[20px]" src="/google.png" alt="" />
            <span className="text-black">Google ile {signUp ? 'Kayıt ol' : ' Giriş Yap'}</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col ">
            <label>Email</label>
            <input 
             autoComplete="email"
            type="email"  
            className=" mt-1 p-2 rounded bg-white text-black focus:shadow-[gray]" />

            <label className="mt-5">Şifre</label>
            <input 
            
            type="password"  
            className=" mt-1 p-2 rounded bg-white text-black focus:shadow-[gray]" />

            <button
             className="rounded-full hover:bg-gray-300 transition bg-white text-black mt-10 p-1 font-bold"
             >
            {signUp ? 'Kaydol' : 'Giriş yap' }
              </button>

            <p className="mt-5">
                <span className="text-gray-500 me-2"
                >
                    {signUp ? 'Hesabınız varsa' : 'Hesabınız yoksa'}
                </span>
                <span 
                onClick={() => setSignUp(!signUp)}
                className= "cursor-pointer text-blue-500 "
                >
                      {/* eğer signup değeri true ise kaydol */}
              {signUp ? 'Giriş Yap' : 'Kaydol' }
              
                </span>
            </p>
             {/* hata varsa */} 
             {isError && !signUp &&
              <p 
              onClick={handlePassReset}
              className="text-red-400 mt-4 cursor-pointer">
                Şifrenizi mi unuttunuz?
              </p>}
        </form>
      </div>
    </section>
  );
};

export default Auth;
