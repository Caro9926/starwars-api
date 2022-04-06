import axios from "axios";
import React, { useEffect } from "react";

const Results = (props) =>{
    const {data,setData} = props;
    let keys = data? Object.keys(data): [];
    let {homeworld} = data? data:{homeworld:""};


    useEffect(()=>{
        if(data){
            if(homeworld){
                axios.get(homeworld)
                    .then( response => {
                        setData((prev) => {
                            return {...prev,
                                ["homeworld"]:response.data.name
                            }
                        })
                    })
                    .catch( err => console.log(err));
            }
        }
        else{
            const {id} = props.match.params;
            if(id){
                axios.get(`https://swapi.dev/api/people/${id}`)
                    .then( response => {
                        axios.get(response.data.homeworld)
                        .then( response => {
                            setData((prev) => {
                                return {...response.data,
                                    ["homeworld"]:response.data.name
                                }
                            })
                            
                        })
                    .catch( err => console.log(err));
                    keys = Object.keys(data);

                })
                .catch( err =>{
                    if(err.response){
                        setData({Error: "These are not what looking for"})
                    }
                });
                
            }
        }
        
    },[])
    return (
        <div> 
            {
                keys.map((key,index) =>{
                    return key!=="Error" ? (<p key={index}>{key}: {data[key]}</p>)
                    :   (<div key={index}>
                            <h3>{data[key]}</h3>
                            <img src="https://i0.wp.com/hipertextual.com/wp-content/uploads/2020/12/obi-wan-kenobi.jpg?resize=1536%2C865&ssl=1"/>
                        </div>)
                })
            }
        </div>
    )


}


export default Results;