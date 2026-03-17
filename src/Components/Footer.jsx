import { motion } from "framer-motion";
import Style from '../Styles/Footer.module.css';
import logo from '../Assets/logo.png';

const Footer = () => {
    const info = [
        {
            titulo: "Personas",
            data: [
                "Accidentes Personales", 
                "Seguro para hogar",
                "Embarcaciones de Placer", 
                "Motos", 
                "Responsabilidad Civil profesional",
                "Salud", 
                "Vida individual"
            ]
        },
        {
            titulo: "Empresas",
            data: [
                "Caución", 
                "Incendio", 
                "Seguro para Consorcios",
                "Responsabilidad Civil General", 
                "Seguro Técnico", 
                "Todo Riesgo Operativo", 
                "Transporte de mercadería"
            ]
        }
    ];

    const rubrosDestacados = ["Automotores", "Agro", "ART"];

    const footerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };
    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <motion.footer
            className={Style.footer}
            variants={footerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className={Style.footerTop}>
                
                <motion.section variants={sectionVariants} className={Style.sectionBrand}>
                    <div className={Style.logoContainer}>
                        <img src={logo} alt="Logo Organización San Francisco" className={Style.logo} />
                        <div className={Style.brandName}>
                            <span>ORGANIZACIÓN</span>
                            <span>SAN</span>
                            <span>FRANCISCO</span>
                        </div>
                    </div>
                    <p className={Style.slogan}>
                        La mejor opción para el resguardo de tu patrimonio
                    </p>
                </motion.section>
                <motion.section variants={sectionVariants} className={Style.sectionLinks}>
                    <h2>{info[0].titulo}</h2>
                    <ul>
                        {info[0].data.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </motion.section>

                <motion.section variants={sectionVariants} className={Style.sectionLinks}>
                    <h2>{info[1].titulo}</h2>
                    <ul>
                        {info[1].data.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </motion.section>
                <motion.section variants={sectionVariants} className={Style.sectionPartners}>
                    <div className={Style.destacados}>
                        {rubrosDestacados.map((rubro, index) => (
                            <h2 key={index}>{rubro}</h2>
                        ))}
                    </div>
                </motion.section>
                
            </div>

            <motion.div variants={sectionVariants} className={Style.footerBottom}>
                <hr className={Style.linea} />
                <p>© 2026 Seguros San Francisco. Todos los derechos reservados.</p>
            </motion.div>

        </motion.footer>
    );
};

export default Footer;