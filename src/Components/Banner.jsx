import { IconShieldFilled } from '@tabler/icons-react';
import Style from '../Styles/Banner.module.css';
const Banner = () => {
    return (
        <section className={Style.banner}>
            <p><IconShieldFilled stroke={2} />  Más de 40 años protegiendo tu patrimonio</p>
            <h1>ORGANIZACIÓN SAN FRANCISCO</h1>
            <h2>Broker de Seguros</h2>
            <p>La mejor opción para el resguardo de tu patrimonio</p>
        </section>
    )
}

export default Banner