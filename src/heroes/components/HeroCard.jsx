import { Link } from "react-router-dom"

const CharacterByhero = ({ alter_ego, characters }) => {
    // if (alter_ego === characters) return (<></>)
    // return <p>{characters}</p>
    return (alter_ego === characters) ? <></>: <p>{characters}</p>
}

export const HeroCard = ({
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters
}) => {

    const heroImageUrl = `/heroes/${id}.jpg`

    // const charactesByhero = <p>{characters}</p>
    return (
        <div className="col animate__animated animate__fadeIn">
            <div className="card">
                <div className="row no-gutters">

                    <div className="col-4">
                        <img src={heroImageUrl} alt={superhero} className="card-img" />
                    </div>
                    <div className="col-8">
                        <div className="card-body">

                            <h5 className="card-title">{superhero}</h5>
                            <p className="card-text">{alter_ego}</p>

                            {/* Se puede crear una funcion para que filtre los alter_ego y los character y no los muestre repetidos, funcion CharacterByhero*/}
                            {/* o se puede usar el codigo, uno es mas facil el otro mas profesional
                            {
                                (alter_ego !== characters) && (<p>{characters}</p>)
                            }
                              {
                                (alter_ego !== characters) && <p>{characters}</p>
                            }
                            */}

                            <CharacterByhero characters={characters} alter_ego={alter_ego} />

                            <p className="card-text">
                                <small className="text-muted">{first_appearance}</small>
                            </p>

                            <Link to={`/hero/${id}`}>
                                Más...
                            </Link>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
