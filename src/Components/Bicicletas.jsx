import Style from '../Styles/Bicicleta.module.css'
import { IconBike } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const Bicicletas = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ 
                once: true, 
                amount: 0.4
            }}
            className={Style.bicicletas}
        >
            <h2> 
                <IconBike stroke={2} className={Style.scooterIcon} />
                La mejor opción para tu bicicleta
            </h2>
        </motion.section>
    )
}

export default Bicicletas;