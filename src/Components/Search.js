import React, { useState,useEffect } from 'react'
import axios from 'axios'
const Search = () => {

    const [term, setTerm] = useState("React")
    const [result, setResult] = useState([])
    
    useEffect(() => {
        axios.get("https://en.wikipedia.org/w/api.php", {
            params: {
                action: "query",
                list: "search",
                origin: "*",
                format: "json",
                srsearch: term
            },
        }).then((response) => {
            if (term && !result.length)
            {
                setResult(response.data.query.search);
            }
            else {
                return new Promise(() => {
                    const timeid=  setTimeout(() => {
                          setResult(response.data.query.search);
      
                    }, 3000)
                      return () => {
                          clearTimeout(timeid)
                      }
                  }) 
            }
           
         
        });
        

    }, [term]);
  
    const renderresult = result.map((resul) => {
        return (
            <div key={resul.pageid} className='item'>
                <div className='right floated content'>
                    <a href={`https://en.wikipedia.org?curid=${resul.pageid}`} className='ui button'>Read More</a>
                </div>
                <div className='content'>
                    <div className='header'>
                        {resul.title}
                    </div>
                    {
                        <span dangerouslySetInnerHTML={{ __html: resul.snippet }}></span>
                    }
                </div>
            </div>
        );
    });
  return (
    <div>
          <div className='ui form'>
              <div className='field'>
                  <label >Enter Search Term</label>
                  <input type="text" className='input' value={term} onChange={e=>setTerm(e.target.value) } />
              </div>
          </div>
          {renderresult}
          <div className='ui celled list'>
              {renderresult}
       </div>
    </div>
  )
}

export default Search
