import styles from './weatherMainInfo.module.css';

export default function WeatherMainInfo({weather}) {
  return <div className={styles.mainInfo}>
    <div className={styles.city}>{weather?.location.name}</div>
    <div className={styles.country}>{weather?.location.country}</div>
    <div className={styles.row}>
      <div>
        <img src = {`http:${weather?.current.condition.icon}`} width="128" alt={weather?.current.condition.text} />
      </div>
      <div className={styles.weatherCondition}>
        <div className={styles.conditon}>{weather?.current.condition.text}</div>
        <div className={styles.current}>{weather?.current.temp_c}°</div>
      </div>
    </div>
    <iframe
    src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d327757.6898577613!2d${weather?.location.lon}224!3d${weather?.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1718161441731!5m2!1ses!2sar` /*Todo lo que está dentro de esta etiqueta "inframe", donde está contenido este "src" que es igual a un link, fue copiado tal cual de google maps (primero busqué 'Londres' manualmente, tipo me iba moviendo en el mapa, es importante que no haya buscado "Londres" directamente en el buscador de google maps, ya qu elo hice y no me funcionó, tipo el link parace que cambia; y en donde aparecen opciones de google maps, en la parte donde dice 'compartir o insertar un mapa' después en 'insertar un mapa' y te aparece un link y al lado te sale 'COPIAR HTML'; obviamente como es un 'HTML' después de pegarlo acá tuve que hacer algunos retoques en la sintaxis, ya que, estoy trabajando con 'react' (tuve que sacar cosas como, comillas dobles, coma, agregar llaves "{}", etc.). En lo que es propiamente el link que tiene asignado "src", tuve que borrar 14 núemros que representaban la longitud y 14 de la latitud y, poner "${weather?.location.lon}" y "${weather?.location.lat}" respectivamente para que cambie dependiendo la ciudad que el user ingrese.*/} 
    width="100%" 
    height="450" 
    style={{border:0}} 
    allowfullscreen="" 
    loading="lazy" 
    referrerpolicy="no-referrer-when-downgrade">
    </iframe>
  </div>
}