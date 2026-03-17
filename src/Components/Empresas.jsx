import Style from '../Styles/Empresas.module.css';
import fp from '../Assets/fp.png';
import ma from '../Assets/ma.png';
import rus from '../Assets/rus.png';
import agro from '../Assets/agro.png';
import tuve_un_choque from '../Assets/tuve-un-choque.png';
import { motion } from "framer-motion";

const Empresas = () => {
    const baseLogos = [fp, ma, rus, tuve_un_choque];
    const logoGroup = [...baseLogos, ...baseLogos, ...baseLogos];
    const sectionVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5
            }
        }
    }
    return (
        <motion.section 
        
            className={Style.empresas}
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
        >
            <h2>Compañías</h2>

            <div className={Style.slider}>
                <div className={Style.slideTrack}>
                    <div className={Style.slideGroup}>
                        {logoGroup.map((logo, index) => (
                            <div className={Style.slide} key={`group1-${index}`}>
                                <img src={logo} alt={`Logo aseguradora ${index}`} />
                            </div>
                        ))}
                    </div>
                    <div className={Style.slideGroup}>
                        {logoGroup.map((logo, index) => (
                            <div className={Style.slide} key={`group2-${index}`}>
                                <img src={logo} alt={`Logo aseguradora clon ${index}`} />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </motion.section>
    )
}

export default Empresas;