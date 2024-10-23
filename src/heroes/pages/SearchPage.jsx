import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useForm } from "../../hook/useForm";
import { HeroCard } from "../components";
import { getHerosByName } from "../helpers";

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation()
  // console.log(location)
  const { q = '' } = queryString.parse(location.search); // se instalo la libreria npm install query-string
  // console.log(query)
  //Los queryParameter son opcionales

  const heroes = getHerosByName(q);

  const showSearch = (q.length === 0) //Si la presona no escribe nada es T de lo contrario F
  const showError  = (q.length !== 0 && heroes.length === 0)


  const { formState, onInputChange, onResetForm, SearchText } = useForm({
    SearchText: ''
    // SearchText: q //Si quiero que lo escrito en el input no se borre
  });

  const onSearchSubmit = (event) => {
    event.preventDefault();
    // if (SearchText.trim().length <= 1) return;

    navigate(`?q=${SearchText}`)
  }

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">

        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input type="text"
              placeholder="Search a hero"
              className="form-control"
              name="SearchText"
              autoComplete="off"
              value={SearchText} //necesario para conectar
              onChange={onInputChange} //necesario para conectar
            />

            <button className="btn btn-outline-primary mt-1">
              Search
            </button>
          </form>
        </div>



        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {/* {
            (q === '' ?
              <div className="alert alert-primary">Search a hero</div>
              :(heroes.length === 0) &&
              <div className="alert alert-danger">No hero with <b>{q}</b></div>
            )
          } */}

          <div className="alert alert-primary animate__animated animate__fadeIn" style={{display: showSearch ? " ": 'none'}}>
            Search a hero
          </div>

          <div className="alert alert-danger animate__animated animate__fadeIn" style={{display: showError ? " ": 'none' }}>
            No hero with <b>{q}</b>
            </div>

          {
            heroes.map(hero => (
              <HeroCard key={hero.id} {...hero} />
            ))
          }

        </div>
      </div>


    </>
  )
}



