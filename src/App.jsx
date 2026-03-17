import Header from './Components/Header'
import Footer from './Components/Footer'
import Banner from './Components/Banner'
import Coberturas from './Components/Coberturas'
import Elegirnos from './Components/Elegirnos'
import Contacto from './Components/Contacto'
import Monopatin from './Components/Monopatin'
import Bicicletas from './Components/Bicicletas'
import OldSchool from './Components/OldSchool'
import Eventos from './Components/Eventos'
import Empresas from './Components/Empresas'

function App() {
  return (
    <>
      <Header />
      <main>
        <div id="inicio">
          <Banner />
        </div>
        
        <div>
          <Monopatin />
        </div>

        <div>
          <Bicicletas />
        </div>

        <div id="coberturas">
          <Coberturas />
        </div>

        <div id="oldschool">
          <OldSchool />
        </div>

        <div id="elegirnos">
          <Elegirnos />
        </div>

        <div id="contacto">
          <Contacto />
        </div>

        <div id='eventos'>
          <Eventos />
        </div>

        <div id='empresas'>
          <Empresas />
        </div>

      </main>
      <Footer />
    </>
  )
}

export default App