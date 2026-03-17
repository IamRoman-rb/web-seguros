import {motion} from 'framer-motion';
import Style from '../Styles/Contacto.module.css';
import { IconMailFilled, IconDirections, IconBrandWhatsapp, IconBrandInstagram } from '@tabler/icons-react';

const Contacto = () => {

    const offices = [
    {
        ubicacion: "Las Toninas",
        direccion: "Av. 7 N° 1825",
        telefono: "+54 9 2246 48-2927",
        email: "lastoninas@sanfranciscoseguros.com.ar"
    },
    {
        ubicacion: "San Francisco Solano",
        direccion: "Calle 838 N° 3792",
        telefono: "+54 9 11 2595-7130",
        email: "solano.seguros@sanfranciscoseguros.com.ar"
    }
    ]

    return (
        <motion.section className={Style.contacto}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <h2 className={Style.tituloSeccion}>Contactanos</h2>
            <p>Estamos para ayudarte. Comunicate con nosotros por cualquiera de nuestros canales</p>

            <ul className={Style.listadoContacto}>
                {offices.map((office, index) => (
                    <li key={index} className={Style.office}>
                        <h3>{office.ubicacion}</h3>
                        <p> <IconDirections className={Style.icon}/> <strong>Dirección:</strong> {office.direccion}</p>
                        <p> <IconBrandWhatsapp className={Style.icon}/> <strong>Teléfono:</strong> {office.telefono}</p>
                        <p> <IconMailFilled className={Style.icon}/> <strong>Email:</strong> {office.email}</p>
                    </li>
                ))}
            </ul>
            <h3 className={Style.tituloSeccion}>También podes encontrarnos en Instagram</h3>
            <span className={Style.instagram}>
                <h4>@orgsanfrancisco.seguros</h4>
                <a href="https://www.instagram.com/orgsanfrancisco.seguros?igsh=Yng0dGY2dnhpcWEx" target='_blank'><IconBrandInstagram stroke={2} size={35}/></a>
            </span>

        </motion.section>
    )
}

export default Contacto