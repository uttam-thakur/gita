import Navbar from "../../components/Navbar";
import { useState } from "react";
export const getStaticPaths = async () => {
  const headers = {
    'X-RapidAPI-Key': '1bdf2179a3mshd1b2efa8a3783b2p14e990jsn56a9af198b87',
      'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
    }
    
    const params = 
      {limit: '18'};
  
    const res = await fetch("https://bhagavad-gita3.p.rapidapi.com/v2/chapters/",{
      headers: headers,
      params: params,
    });
    const data = await res.json();

  const paths = data.map((curElem) => {
    return {
      params: {
        pageNo: curElem.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.pageNo;
  // const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const headers = {
    'X-RapidAPI-Key': '1bdf2179a3mshd1b2efa8a3783b2p14e990jsn56a9af198b87',
      'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
    }
    
    const params = 
      {limit: '18'};
  
    const res = await fetch(`https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${id}/`,{
      headers: headers,
      params: params,
    });
    const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

const myData = ({ data }) => {
  const [showName, setShowName] = useState(false);

  const { id, name, name_meaning,chapter_summary,name_transliterated,chapter_summary_hindi } = data;
  const changeHandler = ()=>{
    console.log("hi",name);
    setShowName(!showName); // Toggle the value of showName


  }
  return (
    <>
      <Navbar />
      <div className="ssr-styles ssr-styles-inside">
      <button onClick={changeHandler}>
        {showName ? 'English' : 'Hindi'}
      </button>   
           <h3>{id}</h3>
           {showName ? (
        <h2>{name}</h2>
      ) : (
        <h2>{name_transliterated}</h2>
      )}      

             {showName ? (
        <p>{chapter_summary_hindi}</p>
      ) : (
        <p>{chapter_summary}</p>
      )}   
      
       
      </div>
    </>
  );
};

export default myData;