import { motion } from 'framer-motion';
import { 
    IconUserShield, 
    IconHeadset, 
    IconShieldCheck, 
    IconTrendingUp 
} from '@tabler/icons-react';
import Style from '../Styles/Elegirnos.module.css';

const Elegirnos = () => {

    const info = [
        {
            icon: <IconUserShield size={40} stroke={1.5} />,
            title: "Experiencia y Confianza",
            description: "Más de 40 años brindando seguridad y respaldo a nuestros clientes."
        },
        {
            icon: <IconHeadset size={40} stroke={1.5} />,
            title: "Atención Personalizada",
            description: "Nos adaptamos a tus necesidades para ofrecerte la mejor solución."
        },
        {
            icon: <IconShieldCheck size={40} stroke={1.5} />,
            title: "Amplia Cobertura",
            description: "Protegemos todo lo que más valorás, desde tu auto hasta tu hogar."
        },
        {
            icon: <IconTrendingUp size={40} stroke={1.5} />,
            title: "Mejores Tarifas",
            description: "Precios competitivos sin comprometer la calidad de la cobertura. Financiación disponible."
        }
    ];

    return (
        <motion.section
            id="elegirnos"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ 
                once: true, 
                amount: 0.4
            }}
            className={Style.elegirnos}
        >
            <h2 className={Style.tituloSeccion}>¿Por Qué elegirnos?</h2>
            <p>Somos tu mejor opción para proteger lo que más valorás</p>
            
            <ul className={Style.listaBeneficios}>
                {info.map((item, index) => (
                    <li key={index} className={Style.beneficioItem}>
                        <div className={Style.iconWrapper}>
                            {item.icon}
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </li>
                ))}
            </ul>

        </motion.section>
    )
}

export default Elegirnos;