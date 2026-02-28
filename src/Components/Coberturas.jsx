import { motion } from 'framer-motion';
import {
  IconCar, IconMotorbike, IconHome, IconBuildingStore, IconTool,
  IconShieldHalf, IconUsers, IconTruck, IconHeart, IconBuildingCommunity,
  IconFileCertificate, IconFlame, IconBike, IconAnchor, IconPlane
} from '@tabler/icons-react';

import Style from '../Styles/Coberturas.module.css';

const Coberturas = () => {
  const coberturas = [
    { icon: <IconCar size={32} stroke={1.5} />, title: "AUTO", description: "Cobertura completa para tu vehículo" },
    { icon: <IconMotorbike size={32} stroke={1.5} />, title: "MOTO", description: "Protección total para tu moto" },
    { icon: <IconHome size={32} stroke={1.5} />, title: "HOGAR", description: "Seguridad para tu casa y familia" },
    { icon: <IconBuildingStore size={32} stroke={1.5} />, title: "INTEGRAL DE COMERCIO", description: "Protección para tu negocio" },
    { icon: <IconTool size={32} stroke={1.5} />, title: "SEGURO TÉCNICO", description: "Cobertura especializada" },
    { icon: <IconShieldHalf size={32} stroke={1.5} />, title: "RESPONSABILIDAD CIVIL", description: "Protección legal y patrimonial" },
    { icon: <IconUsers size={32} stroke={1.5} />, title: "ACCIDENTES PERSONALES", description: "Cobertura para ti y tu familia" },
    { icon: <IconTruck size={32} stroke={1.5} />, title: "TRANSPORTE", description: "Seguridad en tus envíos" },
    { icon: <IconHeart size={32} stroke={1.5} />, title: "VIDA", description: "Protección para tus seres queridos" },
    { icon: <IconBuildingCommunity size={32} stroke={1.5} />, title: "CONSORCIOS", description: "Cobertura para edificios" },
    { icon: <IconFileCertificate size={32} stroke={1.5} />, title: "CAUCIÓN", description: "Garantías y cauciones" },
    { icon: <IconFlame size={32} stroke={1.5} />, title: "INCENDIO", description: "Protección contra incendios" },
    { icon: <IconBike size={32} stroke={1.5} />, title: "INTEGRAL CICLISTA", description: "Seguridad para ciclistas" },
    { icon: <IconAnchor size={32} stroke={1.5} />, title: "EMBARCACIONES DE PLACER", description: "Cobertura náutica" },
    { icon: <IconPlane size={32} stroke={1.5} />, title: "AERONAVEGACIÓN", description: "Seguros aeronáuticos" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="coberturas" className={Style.coberturas}>
      <h2 className={Style.tituloSeccion}>Coberturas</h2>
      <p>Ofrecemos una amplia gama de seguros para proteger todo lo que es importante para vos</p>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className={Style.cardsContainer}
      >
        {coberturas.map((cobertura, index) => (
          <motion.div 
            variants={cardVariants}
            className={Style.card}
            key={index}
          >
            <div className={Style.icon}>
              {cobertura.icon}
            </div>
            <h3>{cobertura.title}</h3>
            <p>{cobertura.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Coberturas;