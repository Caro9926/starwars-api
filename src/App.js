import './App.css';
import Busqueda from './componentes/Busqueda';
import Results from './componentes/Results';
import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [busqueda,setBusqueda] = useState({
    tipo:"",
    id: ""
  });

  const [valorBusqueda, setValorBusqueda] = useState({
    tipo:"",
    id: ""
  });
  const [data, setData] = useState(null);
  useEffect(() =>{
    const {tipo,id} = busqueda;
    if(tipo && id){
      axios.get(`https://swapi.dev/api/${tipo}/${id}`)
        .then( respuesta => {
          setData({...respuesta.data})
        })
        .catch( err =>{
          if(err.response){
            setData({Error: "Estos no son los droides que está buscando"})
          }
        });
    }
  },[busqueda])

  const submitForm = (e) =>{
    e.preventDefault();
    setBusqueda({
      ...valorBusqueda
    })
  }

  const onChange = (e) =>{
    setValorBusqueda({
      ...valorBusqueda,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={"/:id"} render={(routeProps) => <Busqueda data={data} setData={setData} {...routeProps}/>}/>

          <Route path={"/"} render={(routeProps) => {
            return data ? (
              <>
                <Busqueda submitForm={submitForm} onChange={onChange} {...routeProps}/>
                <Results data={data} setData={setData}/>
              </>
            ):<Busqueda submitForm={submitForm} onChange={onChange} {...routeProps}/>;
          }}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;