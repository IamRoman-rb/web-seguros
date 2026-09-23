import { useEffect } from 'react'
import { trackPageview } from './api'
import { useTrackDuration } from './hooks/useTrackDuration'
import Header from './Components/Header'
import Banner from './Components/Banner'
import TrustBar from './Components/TrustBar'
import Elegirnos from './Components/Elegirnos'
import VehiculosAntiguos from './Components/VehiculosAntiguos'
import Coberturas from './Components/Coberturas'
import Aseguradoras from './Components/Aseguradoras'
import ComoTrabajamos from './Components/ComoTrabajamos'
import Sucursales from './Components/Sucursales'
import Eventos from './Components/Eventos'
import Faq from './Components/Faq'
import FinalCta from './Components/FinalCta'
import Footer from './Components/Footer'
import FloatingWhatsapp from './Components/FloatingWhatsapp'

function Landing() {
  useEffect(() => {
    trackPageview(window.location.pathname)
  }, [])

  useTrackDuration()

  return (
    <>
      <Header />
      <main className="w-full pt-28 bg-surface-page min-h-screen">
        <Banner />
        <TrustBar />
        <Elegirnos />
        <VehiculosAntiguos />
        <Coberturas />
        <Aseguradoras />
        <ComoTrabajamos />
        <Sucursales />
        <Eventos />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </>
  )
}

export default Landing
