import {motion} from 'framer-motion';
import { IconCheck } from '@tabler/icons-react';
import Style from '../Styles/OldSchool.module.css';

const OldSchool = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ 
                once: true, 
                amount: 0.4
            }}
            className={Style.oldSchool}
        >
            <h2>Asegurá tu auto con +20 años de antigüedad con la más amplia cobertura</h2>
            <p> <IconCheck className={Style.icon}/> Cobertura sin importar la antigüedad de tu vehículo </p>
            <p> <IconCheck className={Style.icon}/> Asistencia mecánica las 24 horas</p>
        </motion.div>
    );
}

export default OldSchool;