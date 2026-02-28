import Style from '../Styles/Monopatin.module.css'
import { IconScooterElectric } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const Monopatin = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ 
                once: true, 
                amount: 0.4
            }}
            className={Style.monopatin}
        >
            <h2> 
                <IconScooterElectric stroke={2} className={Style.scooterIcon} />
                Asegura tu Monopatín Eléctrico
            </h2>
        </motion.div>
    )
}

export default Monopatin;