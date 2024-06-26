import { useEffect } from "react";
import { useState } from "react";
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"

function App() {
  
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleToggleModal() {
    setShowModal(!showModal)
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_APP_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_APP_KEY}`
      const cacheKey = 'NASA-' + new Date().toDateString()
      if (localStorage.getItem(cacheKey)) {
        const apiData = JSON.parse(localStorage.getItem((cacheKey)))
        setData(apiData)
        console.log('DATA fetched from Local Storage\n', apiData)
      } else {
        localStorage.clear()
        try {
          const res = await fetch(url);
          const apiData = await res.json()
          localStorage.setItem(cacheKey, JSON.stringify(apiData))
          setData(apiData)
          console.log('DATA fetched from API\n', apiData)
        } catch(err) {
          console.log(err.message)
        }
      } 
      

      
    }
    fetchAPIData()
  }, []) //this is empty so it triggers on page load
  return (
    <>
      { data ?
        <Main data={data}/>
      :
      <div className = "loadingState">
        <i className="fa-solid fa-gear"></i>
      </div>
      }

      {showModal &&
        <SideBar data={data} handleToggleModal={handleToggleModal}/>
      }

      {data &&
        <Footer data={data} handleToggleModal={handleToggleModal}/>
      }
    </>
  )
}
export default App
