import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import MaterialDatatable from "material-datatable"


const MiComponente = () => {
    const [id, setId] = useState("")
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [personas, setPersonas] = useState([])

    const handleInputChangeNombre = (event) => {
        //console.log(event.target.value)
        setNombre(event.target.value)
    }

    const handleInputChangeApellido = (event) => {
        
        setApellido(event.target.value)

    }
    const handleInputChangeId = (event) => {
        
        setId(event.target.value)

    }

    const enviarDatos = () => {
    
        // guardarPersona();

        editarPersona()

        setId("")
        setNombre("")
        setApellido("")


        // let nuevo = {
        //     name: nombre,
        //     last: apellido
        // }
        // setPersonas(personas => [...personas, nuevo])
        // setNombre("")
        // setApellido("")
    }

    useEffect(()=>{

        getPersonas()

    },[])
    async function getPersonas() {
        try {
            const response = await axios.get('http://192.99.144.232:5000/api/personas?grupo=5');
                if(response.status === 200)
            {
            
                setPersonas(response.data.persona)
            //console.log(response.data);

            }  
        } catch (error) {

            console.error(error);
        }
    }

    const editarPersona = async()=>{

        try {
            
            const response = await axios.put(`http://192.99.144.232:5000/api/personas/${ id }`,{
                nombre: nombre,
                apellido: apellido,
            });

            if(response.status === 200)
            {
                
                getPersonas();
              //console.log(response.data);
            }
            
        }catch (error) {
            console.error(error);
        }

    }

    //guardar persona con POST
    
    //   function guardarPersona()
    //   {
    //     axios.post('http://192.99.144.232:5000/api/personas', {
    //         nombre: nombre,
    //         apellido: apellido,
    //         grupo:5
    //       })
    //       .then(function (response) {

    //             if(response.status===200)
    //             {
    //                 alert("Registro correcto")
    //                 getPersonas()

    //             }else{
    //                 alert("Error al guardar")
    //             }
            
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    //   }

    const columns = [
        {
            name: "Nombre",
            field: "nombre",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Apellido",
            field: "apellido",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];
        
    const handleRowClick = (rowData, rowMeta) => {
        
            
        setId(rowData._id);
        setNombre(rowData.nombre);
        setApellido(rowData.apellido)

        

            
    };

    const options = {
        filterType: 'checkbox',
        onlyOneRowCanBeSelected:true,
        onRowClick: handleRowClick
    };

    return (
        <Fragment>
            <h1>Formulario</h1>
            <div>
                <div>
                    <input type="hidden" placeholder="Nombre" name="nombre" onChange={handleInputChangeId} value={id}></input>
                </div>
                <div>
                    <input type="text" placeholder="Nombre" name="nombre" onChange={handleInputChangeNombre} value={nombre}></input>
                </div>

                <div>
                    <input type="text" placeholder="Apellido" name="apellido" onChange={handleInputChangeApellido} value={apellido}></input>
                </div>
                <button onClick={enviarDatos}>Enviar</button>

            </div>
            <MaterialDatatable
                title={"Employee List"}
                data={personas}
                columns={columns}
                options={options}
            />

        </Fragment>

    )
}

export default MiComponente

