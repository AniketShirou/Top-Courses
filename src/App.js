import React, { useEffect, useState } from "react";
import { apiUrl , filterData } from "./data";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import Spinner from "./components/Spinner";
import { toast } from "react-toastify";

const App = () => {

  const[courses, setCourses] = useState(null);
  const[loading,setloading] = useState(true);
  const[category , setCategory] = useState(filterData[0].title);

  async function fetchData(){
    setloading(true);
    try{
        let response = await fetch(apiUrl);
        let output = await response.json();

        setCourses(output.data)
    }

    catch(error){
           toast.error("Something Went Wrong")
    }

    setloading(false);
  }

  useEffect(()=>{
     fetchData();
  },[])

  

  return (
       <div className="flex flex-col min-h-screen bg-bgDark2">
         <div>
            <Navbar/>
         </div> 
          
         <div>
            <Filter filterData = {filterData} category={category} setCategory={setCategory}/>
         </div> 
         

         <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
           {
              loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>)
           }
         </div>
       </div>
  );
};

export default App;
