import { useState, useEffect } from "react";
import WeatherForm from "./weatherForm";
import WeatherMainInfo from "./weatherMainInfo";
import styles from './weatherApp.module.css'; //"styles", le puse ese nombre para importar, pude haber elegido cualquier otro name. Importo esto para poder trabajar con módulos de css.
import Loading from "./loading";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);

  //Si quiero que, independientemente si el user carga una ciudad, al abrir la página/app por primera vez se cargue una ciudad por defecto => uso el hook "useEffect".
  //"useEffect", es un hook de efectos colaterales => se tiene la posibilidad de ejecutar código cuando: 1. Se carga la aplicaión, 2. Cada vez que exista una reenderización de toda la app o 3. Cuando el componente se destruye.
  useEffect(() => { //"useEffect", espera recibir una callback (o sea, otra función) y en este caso uso una función flecha.
    loadInfo();
  }, []); //Este segundo parámetro que recibe el hook ("[]"), es un arreglo de dependencias. Como no puse nada adentro de los corchetes => este "useEffect" se va a ejecutar siempre que haya un reenderizado de la página.

  useEffect(() => {
    document.title = `Weather | ${weather?.location.name ?? ""}`; //"document.title", hace alución al texto/titulito que aparece en la pestaña que se ve arriba cuando entrás a tu 'browser'. "?" porque al cargarse puede que te salga error, ya que, tiene como estado inicial "null" => con el signo de pregunta le decimos que si hay una propiedad "location.name" que ponga, sino no hay drama y seguí ejeutandote jajaja. Y si existe dicha propiedad pero no tiene ningún valor (esto se puede dar, por ejemplo, cuando en la barrita de busqueda no cargas ninguna ciudad y dás enter; obviamente te debería salir un .json con todas sus propiedades = "null"; digo 'debería' pero no te va a salir, ya que, por defecto la función "loadInfo" tiene cargado "city = london" ), o sea, es = a 'null' => que muestre un string vacío ("").
  }, [weather]); //Como acá estoy poniendo algo entre los corchetes ("[weather]"), => le estoy diciendo que cada vez que se actualice/cambie "weather" => se ejecute la callback que tiene como primer parámetro este hook "useEffect", que en este caso es una función flecha.

  async function loadInfo(city = "london") { //Por defecto le ponemos "london", pero puede ser cambiado cuando se llame a la función "loadInfo" en otro lado, dandole otro valor a "city"
    try {
      const request = await fetch(`${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`); //Con "esto mando a llamar a mi enpoint".
      const json = await request.json();

      //setWeather(json);
      setTimeout(() => {
        setWeather(json);
      }, 2000);
      console.log(json);
    } catch (error) {}
  }

  function handleChangeCity(city) {
    setWeather(null);
    loadInfo(city);
  }
  return (
  <div className={styles.weatherContainer /*Uso esta sintaxis para darle estilo, porque estoy usando modulos de 'css'; basicamente lo que hice fue primero importar "styles" para poder usar esta notación*/}>
    <WeatherForm onChangeCity= {handleChangeCity} />
    
    <div>{/*weather?.current.temp_c *//*"?", 'cause mientras carga el valor sería "null" => con el signo de pregunta le decimos que la propiedad ("current.temp_c") es una porpiedad opcional. Sino, te daría error, ya que, al principio no tiene cargado nada y por ende no tendría .json donde bucar dicha propiedad (de las muchas que tiene el archivo .json que estamos usando. En realidad estamos usando una api de internet con tiempo de prueba, así que si querés probar esta app dentro de 2 meses capaz ya no tengás acceso a dicho .json, porque está en internet y obviamente no pieaanzo paGar la suscripción jajaj).*/}</div>

    {weather ? <WeatherMainInfo weather = {weather} /> : <Loading/> /*Básicamente le pregunto si existe "weather" (o sea, si tiene un valor distinto de 'null' => si existe), y en el caso de que si => que muestre lo que contiene "WeatherMainInfo", sino, que llame a la función "Loading" (que muestra la animación de una ruedita cargando ¡lol!).*/}
  </div>
  );
}