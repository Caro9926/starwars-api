import React from "react";


const Busqueda = (props) => {
    const {submitForm} = props;
    const {onChange} = props;
    return(
        <form onSubmit={submitForm}>
            <label htmlFor="tipo">Search Form</label>
            <select id="tipo" name="tipo" onChange={(e) => onChange(e)} defaultValue="">
                <option value="" hidden>--Seleccione--</option>
                <option  value="people">People</option>
                <option  value="films">Films</option>
                <option  value="starships">Starships</option>
                <option  value="vehicles">Vehicles</option>
                <option  value="species">Species</option>
                <option  value="planets">Planets</option>
            </select>

            <label htmlFor="id">Id:</label>
            <input id="id" name="id" onChange={(e) => onChange(e)} type="text"/>

            <button type="submit">Search</button>
        </form>
    )
}


export default Busqueda;