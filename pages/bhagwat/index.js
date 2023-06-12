import Navbar from "../../components/Navbar";
import Link from "next/link";

export const getStaticProps = async () => {
  // const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  // headers:{
  //   'X-RapidAPI-Key': '1bdf2179a3mshd1b2efa8a3783b2p14e990jsn56a9af198b87',
  //   'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
  // }
  // params:{
  //   {limit: '18'}
  // }
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

  return {
    props: {
      data,
    },
  };
};

const blog = ({ data }) => {
  return (
    <>
      <Navbar />
      {data.map((curElem) => {
        return (
          <div key={curElem.id} className="ssr-styles">
            <h3>{curElem.id}</h3>
            <Link href={`/bhagwat/${curElem.id}`} legacyBehavior>
              <h2>{curElem.name}</h2>

            </Link>
          </div>
        );
      })}
    </>
  );
};

export default blog;
