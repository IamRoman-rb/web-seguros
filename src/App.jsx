import Header from './Components/Header'
import Footer from './Components/Footer'
import Banner from './Components/Banner'
import Coberturas from './Components/Coberturas'
import Elegirnos from './Components/Elegirnos'
import Contacto from './Components/Contacto'
import Monopatin from './Components/Monopatin'
import OldSchool from './Components/OldSchool'
import Eventos from './Components/Eventos'

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

      </main>
      <Footer />
    </>
  )
}

export default App