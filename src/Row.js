import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./Row.css";
import img from "./pngegg.png"

function Row() {
    const [screen, setScreen] = useState([]);
    const [name,setName] = useState('');
    const [language,setLanguage] = useState('');
    const [type,setType] = useState('');
    const [summary,setSummary] = useState('');
    const[display, setDisplay] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get("https://api.tvmaze.com/search/shows?q=all");
            console.log(request.data);
            setScreen(request.data);
        }
        fetchData();
    }, [])
    function setdata(a,b,c,d){
        setDisplay(true)
         setName(a);
         setLanguage(b);
         setType(c);
         setSummary(d);
    }
    return (
        <div className='row'>
            <h2 className='row_title text-center'>QuadB</h2>
            <div className='row_show'>

                {
                    screen.map(r => (
                        <div key ={r.show.id} className="row_posters" onClick={()=>setdata(r.show.name, r.show.language, r.show.type, r.show.summary)}>
                        <h2>{r.show.name}</h2>
                        <h5>Language : {r.show.language}</h5>
                        <h5>Type : {r.show.type}</h5>
                        <h5>Genre : {r.show.genres[0]}</h5>
                        </div>
                    ))
                }
            </div>
            {display && <div className='banner'>
                <img src={img} alt="" className='cutlogo'onClick={()=>setDisplay(false)}/>
                <h2>Name : {name}</h2>
                <h5>Language : {language}</h5>
                <h5>Type : {type}</h5>
                <h5>{summary}</h5>
            </div>}
        </div>

    )
}

export default Row;