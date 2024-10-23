import { useState } from "react";


//Tomo los valores enviados por useForm y los almaceno en initialForm y trabajo con ellos
export const useForm = (initialForm = {}) => {

    const [formState, setFormState] = useState(initialForm);


    const onInputChange = ({ target }) => {
        const { name, value } = target
        setFormState({
            ...formState,
            [name]: value //Asigna el objeto que le mandamos con los nombre ejemplo {namees: 'juan',emaill:'juan@algo.com'}
        });
    }

    const onResetForm = () => {
        setFormState(initialForm) //El initialForm trae los campos vacios solo lo asignamos y lo llamamos con la funsion
    }

    return {
        ...formState, // Desestructuro los datos almacenados en el formState(username, email, pasword), los expongo para usarlos en otro componente
        formState, //Expongo los datos almacenados en formState
        onInputChange, //Expongo la funcion de onInputChange
        onResetForm
    };
};
