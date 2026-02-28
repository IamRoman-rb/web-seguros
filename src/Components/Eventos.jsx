import {motion} from 'framer-motion';
import Style from '../Styles/Eventos.module.css';
import { IconCalendarEvent } from '@tabler/icons-react';
import FONTANA from '../Assets/FONTANA.mp4';
import GOLF from '../Assets/GOLF.jpeg';

const Eventos = () => {

    const eventos = [
        {
            titulo: "Torneo de Golf",
            subtitulo: "¡Gran jornada de golf en Santa Teresita! ⛳",
            descripcion: "Vivimos un fin de semana a puro deporte y camaradería en la Copa Organización San Francisco. Agradecemos a todos los golfistas que participaron de este gran torneo local y nos acompañaron en una jornada excepcional. Porque así como en el green la precisión lo es todo, en la vida diaria tu tranquilidad es nuestra prioridad. ¡Gracias por confiar en nuestro respaldo!",
            imagen: GOLF
        },
        {
            titulo: "Final TC 2025",
            subtitulo: "¡Aceleramos junto a Norberto Fontana en la gran final del TC! 🏁",
            descripcion: "El 7 de diciembre de 2025 el Autódromo Roberto Mouras de La Plata vibró con la definición del Turismo Carretera, y Organización San Francisco estuvo ahí. Nos enorgullece haber acompañado como sponsors a un histórico como Norberto Fontana en esta fecha tan especial. Sabemos que en la pista la velocidad y la precisión lo son todo, y que para acelerar tranquilo necesitás el mejor equipo detrás. Así como en el automovilismo, nosotros somos tu respaldo en el día a día para que avances seguro.",
            imagen: FONTANA
        }
    ]   

    return (
        <motion.section className={Style.eventos}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ 
                once: true, 
                amount: 0.4
            }}
        
        >
            <h2>Eventos</h2>
            <p>Descubre nuestros próximos eventos y actividades diseñados para mantenerte informado, conectado y entretenido. ¡No te pierdas la oportunidad de participar!</p>

            <ul className={Style.listadoEventos}>
                {eventos.map((evento, index) => (
                    <li key={index} className={Style.evento}>
                        <h3><IconCalendarEvent className={Style.icon}/>{evento.titulo}</h3>
                        <h4>{evento.subtitulo}</h4>
                        <p>{evento.descripcion}</p>
                        {   
                            evento.imagen.split('.').pop().toLowerCase() == 'mp4' ? (
                                <video controls className={Style.imagenEvento}>
                                    <source src={evento.imagen} type="video/mp4" />
                                    Tu navegador no soporta el elemento de video.
                                </video>
                            ) : (
                                <img src={evento.imagen} alt={evento.titulo} className={Style.imagenEvento}/>
                            )
                        }
                    </li>
                ))}
            </ul>

        </motion.section>
    )
}

export default Eventos;