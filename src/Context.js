import React , {useContext, useEffect , useState} from "react"
import Axios from "axios"
import "./Context.css"

const AppContext = React.createContext(  )
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const getFavoritesFromLocalStorage=()=>{
    
    let favorites = localStorage.getItem('favorites')
    if(favorites){
        favorites = JSON.parse(localStorage.getItem('favorites'))
    }
    else{favorites = []}
    return favorites
}

const AppProvider = ({children})=>{
   
    const [loading, setLoading] = useState(true)
    const [meals , setMeals] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
 
    const [showModal,setShowModal] = useState(false)
    const [selectedMeal,setSelectedMeal] = useState(null)
    const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage())

    console.log(favorites)
    const fetchMeals = async (allMealsUrl)=>{
        
        Axios.get(allMealsUrl).
  then(response => ((response.data.meals)? setMeals(response.data.meals):setMeals([]) , console.log(response))).catch(err => console.log("error yew") )
   setLoading(false)} 

        const fetchRandomMeal=()=>{

            fetchMeals(randomMealUrl)
        }

        const selectMeal = (idMeal,favoriteMeal)=>{
         
            let meal;
            if(favoriteMeal){
                meal = favorites.find((meal)=>meal.idMeal === idMeal)
            }else{
                 meal = meals.find((meal)=>meal.idMeal === idMeal)}
           
            setSelectedMeal(meal)
            setShowModal(true)
        }
        

        const closeModal =()=>{
            setShowModal(false)
        }

        const addToFavorites = (idMeal)=>{
          
            
           
            const alreadyFavorite = favorites.find((meal)=>meal.idMeal === idMeal)
            if(alreadyFavorite)return
            const meal = meals.find((meal)=>meal.idMeal === idMeal)
            const updatedFavorites = [...favorites , meal]
            setFavorites(updatedFavorites)
            localStorage.setItem('favoriyes', JSON.stringify(updatedFavorites))
            
        }
        const removeFromFavorites = (idMeal)=>{
            const updatedFavorites = favorites.filter((meal)=> meal.idMeal !== idMeal)
            setFavorites(updatedFavorites)
            localStorage.setItem('favoriyes', JSON.stringify(updatedFavorites))

        }

    useEffect(()=>{
       fetchMeals(`${allMealsUrl}${searchTerm}`)
    },[searchTerm])

    useEffect(()=>{
        if(searchTerm)return
       fetchMeals(allMealsUrl)
    },[searchTerm])

    return <AppContext.Provider value={{meals , loading ,
     setSearchTerm , fetchRandomMeal , showModal ,
     selectedMeal,selectMeal,closeModal,addToFavorites,
     removeFromFavorites , favorites}}>
        {children}
      
       
        
        </AppContext.Provider>
}


export const useGlobalContext=()=>{
    return useContext(AppContext)
}


export  { AppContext, AppProvider}