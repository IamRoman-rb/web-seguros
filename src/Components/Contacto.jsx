import {motion} from 'framer-motion';
import Style from '../Styles/Contacto.module.css';
import { IconMailFilled, IconDirections, IconBrandWhatsapp } from '@tabler/icons-react';

const Contacto = () => {

    const offices = [
    {
        ubicacion: "Las Toninas",
        direccion: "Av. 7 N° 1825",
        telefono: "+54 9 2246 48-2927",
        email: "lastoninas@sanfranciscoseguros.com.ar"
    },
    {
        ubicacion: "Francisco Solano",
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

        </motion.section>
    )
}

export default Contacto