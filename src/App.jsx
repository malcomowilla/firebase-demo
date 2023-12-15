import Auth from "./components/Auth"
import {db, auth, storage}from './config/firebase'
import { useState, useEffect } from "react"
import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore'
import { ref,uploadBytes } from "firebase/storage"


const App = () => {
  const [movies, setMovies] = useState([])
  const [newMovieTitle, setNewMovieTitle] = useState('')
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [receivedOsar, setReceivedOscar] = useState(false)
  const [updatedTitle, setUpdatedTitle] = useState('')
const [fileUpload, setFileUpload] = useState(null)



const movieCollection = collection(db, 'movies')

const getMovieList = async ()=> {
  const data = await getDocs(movieCollection)
  const filteredData = data.docs.map((doc)=> {
    return {
      ...doc.data(),
      id: doc.id,
    }
  } )
  
  setMovies(filteredData)
  
  
  
    }

   
  

useEffect(()=> {
 

  getMovieList()
},[])

const deleteMovie = async (id)=>{
  const movieDoc = doc(db, "movies", id)
  await deleteDoc(movieDoc)
  await getMovieList();

}


const updateMovieTitle = async (id)=> {
const movieDoc = doc(db, 'movies', id)
await updateDoc(movieDoc, {title: updatedTitle})
await getMovieList()

}





const uploadFile = async ()=> {
  


try {
  if(!fileUpload) return;
  const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`)
  
await uploadBytes(filesFolderRef, fileUpload)

} catch (error) {
  console.log('AAN error occured:', error)

   throw Error('An error ocureed!!!!')

}

}







const handleSubmitMovie = async ()=> {
await addDoc(movieCollection, {title: newMovieTitle, releasedDate: newReleaseDate,
receivedOscar: receivedOsar, userId: auth?.currentUser?.uid


}) 

await getMovieList()
}

  return (
    <div className=" text-center text-2xl">
    
    <Auth/>

    <div>
      <input type="text" placeholder="Movietitle..." onChange={(e)=> setNewMovieTitle(e.target.value)}/>
      <input type="number"  placeholder="Release Date...." onChange={(e)=> setNewReleaseDate(e.target.value)}/><br />
<input type="checkbox" className="w-[100px] border-red-800  border-2" name="" id="" checked={receivedOsar}   onChange={(e)=> setReceivedOscar(e.target.checked)} />
<label htmlFor="">Received An Oscar</label><br />

<button   onClick={handleSubmitMovie} className="border-2 border-blue-400 p-[6px] rounded-2xl">submit movie</button>
    </div>
    <div>
      {movies.map(movie=> {
        return (
          <div key={movie.id}>
          <h1 className={`${movie.receivedOscar ? 'text-green-300' : 'text-red-300'}`}>{movie.title}</h1>
          <p>{movie.releasedDate}</p>
<button onClick={()=> deleteMovie(movie.id)} className="border-2 border-blue-300 rounded-2xl p-[10px]">Delete Movie</button>
<input type="text" placeholder="new title" onChange={(e)=> setUpdatedTitle(e.target.value)} />
<button   onClick={()=> updateMovieTitle(movie.id)} className="border-2 dark:border-blue-300 rounded-xl">Update Title</button>
        </div>
        )
       
      })}
    </div>



    <div>

<input type="file" name="" id=""   onChange={(e)=> setFileUpload(e.target.files[0])}/>
<button  onClick={uploadFile} className="border-2 dark:border-black rounded-xl">Upload File</button>
    </div>
    </div>
  )
}

export default App