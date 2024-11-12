import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getHeroByid } from "../helpers";
import React, { useMemo } from "react";


export const HeroPages = () => {

  const navigate = useNavigate()
  const { id } = useParams();
  
  //Use memo para memorizar valores y useCallback para memorizar funciones
  const hero = useMemo( () => getHeroByid(id), [ id ]) 

  const onNavigateback = () => {

    // if (hero.publisher.match('DC Comics')) {
    //   navigate('/dc', {
    //     replace: true
    //   })
    // }
    // if (hero.publisher.match('Marvel Comics')) {
    //   navigate('/marvel', {
    //     replace: true
    //   })
    // }


    navigate(-1); //Regresa al a pagina anterior, puede sacarnos de la app

  }


  if (!hero) {
    return <Navigate to="/marvel" />
  }



  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={`/heroes/${id}.jpg`}
          alt={hero.superhero}
          className="img-thumbnail animate__animated animate__fadeInLeft"
        />
      </div>


      <div className="col-8">
        <h3>{hero.superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"> <b>Alter ego:</b> {hero.alter_ego} </li>
          <li className="list-group-item"> <b>Publisher:</b> {hero.publisher} </li>
          <li className="list-group-item"> <b>First appearance:</b> {hero.first_appearance} </li>
        </ul>

        <h5 className="mt-3"> Characters</h5>
        <p>{hero.characters}</p>

        <button
          aria-label="buttonNavigate"
          onClick={onNavigateback}
          className="btn btn-dark"
        >
          Back
        </button>
      </div>
    </div>
  )
}
