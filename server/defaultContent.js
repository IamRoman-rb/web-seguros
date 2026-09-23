export const defaultContent = {
  meta: {
    siteName: 'Organización San Francisco',
    logoUrl: '/logo.png',
  },
  theme: {
    primaryColor: '#14335C',
    accentColor: '#E5484D',
  },
  header: {
    topbarText: 'Sucursal Las Toninas & Sucursal San Francisco Solano | Atención personalizada',
    topbarHoursText: 'Lunes a Viernes 9:00 a 18:00 hs',
  },
  hero: {
    badge1: 'Broker Multicompañía Líder',
    badge2: 'Asesores Matriculados SSN',
    titleBeforeHighlight: 'La mejor opción para el',
    titleHighlight: 'resguardo',
    titleAfterHighlight: 'de tu patrimonio.',
    subtitle:
      'Comparamos y gestionamos las mejores coberturas del mercado para vos, tu familia, tus vehículos y tu empresa con asesoramiento humano y oficinas de atención presencial en Las Toninas y San Francisco Solano.',
    ctaText: 'Cotizar en el acto',
    miniHighlightTitle: '¿Tu auto tiene más de 20 años?',
    miniHighlightText: 'Tenemos convenios especiales para cobertura contra Terceros y Grúa garantizada.',
  },
  cotizadores: {
    categories: [
      {
        label: 'Automotor / Camioneta',
        fields: [
          { label: 'Marca y Modelo', type: 'text' },
          { label: 'Año', type: 'text' },
          { label: 'Tiene GNC', type: 'checkbox' },
          { label: 'Tiene localizador / GPS', type: 'checkbox' },
          { label: 'Más de 20 años de antigüedad', type: 'checkbox' },
        ],
      },
      {
        label: 'Motovehículo',
        fields: [
          { label: 'Marca y Modelo', type: 'text' },
          { label: 'Año', type: 'text' },
          { label: 'Cilindrada', type: 'text' },
        ],
      },
      {
        label: 'Hogar',
        fields: [
          { label: 'Tipo de vivienda', type: 'select', options: ['Casa', 'Departamento', 'PH'] },
          { label: '¿Alquilás o es vivienda propia?', type: 'select', options: ['Alquilada', 'Propia'] },
          { label: 'Está en un barrio cerrado', type: 'checkbox' },
          { label: 'Cantidad de ambientes', type: 'number' },
        ],
      },
      {
        label: 'Bicicleta',
        fields: [
          { label: 'Marca y Modelo', type: 'text' },
          { label: 'Valor aproximado', type: 'text' },
        ],
      },
      {
        label: 'Monopatín Eléctrico',
        fields: [
          { label: 'Marca y Modelo', type: 'text' },
          { label: 'Valor aproximado', type: 'text' },
        ],
      },
      {
        label: 'Accidentes Personales',
        fields: [
          { label: 'Ocupación / Actividad', type: 'text' },
          { label: 'Cantidad de personas a asegurar', type: 'number' },
        ],
      },
    ],
  },
  trustbar: [
    { value: '+40 años', label: 'De Trayectoria' },
    { value: '2 Sedes', label: 'Las Toninas & Solano' },
    { value: '+10 Cías', label: 'Aseguradoras Aliadas' },
    { value: '100% Libre', label: 'Asesoría sin Costo' },
  ],
  elegirnos: {
    title: '¿Por qué elegirnos?',
    subtitle: 'Somos tu mejor opción para proteger lo que más valorás',
    items: [
      { title: 'Experiencia y Confianza', description: 'Más de 40 años brindando seguridad y respaldo a nuestros clientes.' },
      { title: 'Atención Personalizada', description: 'Nos adaptamos a tus necesidades para ofrecerte la mejor solución.' },
      { title: 'Amplia Cobertura', description: 'Protegemos todo lo que más valorás, desde tu auto hasta tu hogar.' },
      { title: 'Mejores Tarifas', description: 'Precios competitivos sin comprometer la calidad de la cobertura. Financiación disponible.' },
    ],
  },
  vehiculosAntiguos: {
    badge: 'Especialistas Exclusivos en Plaza',
    title: 'Cobertura real para vehículos con más de 20 años de antigüedad.',
    description:
      '¿Te dijeron que tu modelo no califica para grúa o no tiene cobertura? En Organización San Francisco resolvemos lo que otros rechazan. Diseñamos planes estratégicos con aseguradoras aliadas para autos clásicos, utilitarios de trabajo y vehículos con trayectoria.',
    image: '/assets/fiat600.jpg',
    imageCaption: 'Modelos clásicos con aprobación asegurada',
    features: [
      { title: 'Responsabilidad Civil Ampliada', description: 'Cumplimiento reglamentario legal con el mayor límite de cobertura del mercado.' },
      { title: 'Auxilio Mecánico y Grúa', description: 'Servicio de remolque garantizado con kilometraje y asistencia ante desperfectos.' },
      { title: 'Robo e Incendio Opcional', description: 'Inspección fotográfica ágil mediante WhatsApp sin traslados engorrosos.' },
      { title: 'Emisión Inmediata', description: 'Certificado de circulación digital en tu celular en menos de 2 horas hábiles.' },
    ],
  },
  coberturas: {
    title: 'Coberturas a la medida de tu realidad',
    subtitle: 'No vendemos pólizas genéricas. Analizamos los riesgos específicos de tu actividad cotidiana o productiva para recomendarte la compañía con mejor respuesta.',
    items: [
      { title: 'Automotores', description: 'Cobertura completa para tu vehículo: Responsabilidad Civil, Terceros y Todo Riesgo. Especialistas en vehículos de más de 20 años.' },
      { title: 'Motovehículos', description: 'Protección total para tu moto, con auxilio mecánico las 24hs incluido.' },
      { title: 'Monopatín Eléctrico', description: 'Cobertura pensada para la movilidad eléctrica urbana y sus riesgos específicos.' },
      { title: 'Integral Ciclista', description: 'Seguridad para vos y tu bicicleta ante robo, daños y responsabilidad civil.' },
      { title: 'Hogar e Incendio', description: 'Protección para tu casa o departamento: incendio, robo de electrodomésticos, daños por agua y cristales.' },
      { title: 'Comercios e Industrias', description: 'Seguro Integral de Comercio, mercaderías en depósito y cobertura por cortes de cadena de frío.' },
      { title: 'Accidentes Personales', description: 'Indispensable para profesionales autónomos que ingresan a obras, countries o consorcios.' },
      { title: 'ART & Riesgos del Trabajo', description: 'Asesoramiento normativo integral para empleadores y PyMEs, con alícuotas preferenciales.' },
      { title: 'Vida & Retiro', description: 'Protección económica para tu familia y planes de ahorro a futuro.' },
      { title: 'Consorcios', description: 'Cobertura integral para edificios y espacios comunes.' },
      { title: 'Caución', description: 'Garantías y cauciones para licitaciones, alquileres y contratos.' },
      { title: 'Embarcaciones & Seguros Técnicos', description: 'Náutica de placer y comercial, equipos electrónicos y maquinarias.' },
    ],
  },
  aseguradoras: {
    title: 'Trabajamos con las principales aseguradoras del país',
    subtitle: 'Un solo canal, todas las opciones. Al ser un broker independiente, auditamos la mejor prima y defendemos tus intereses de manera transparente en caso de siniestro.',
    logos: [
      { name: 'Federación Patronal', image: '/assets/fp.png' },
      { name: 'Mercantil Andina', image: '/assets/ma.png' },
      { name: 'RUS Seguros', image: '/assets/rus.png' },
      { name: 'Agro', image: '/assets/agro.png' },
      { name: 'Tuve un Choque', image: '/assets/tuve-un-choque.png' },
    ],
    infoTitle: '¿Por qué conviene contratar con un broker y no directo?',
    infoText: 'El costo final de tu póliza es exactamente el mismo, con un beneficio clave: nosotros no respondemos a los intereses de la compañía, sino a los tuyos. Ante un choque o siniestro, gestionamos los reclamos y trámites por vos.',
  },
  comoTrabajamos: {
    title: '¿Cómo trabajamos junto a vos?',
    subtitle: 'Tu póliza resuelta en pasos simples, sin letra chica ni trámites innecesarios.',
    steps: [
      { title: 'Nos contás tu necesidad', description: 'Por WhatsApp, web o en nuestras oficinas nos detallás qué querés resguardar.' },
      { title: 'Cotizamos en simultáneo', description: 'Cruzamos la información con nuestras compañías aliadas para encontrar la mejor relación costo / cobertura.' },
      { title: 'Elegís la mejor alternativa', description: 'Te explicamos claramente las diferencias de franquicia y cláusulas para que decidas con tranquilidad.' },
      { title: 'Acompañamiento en siniestros', description: 'Si tenés un problema, tu productor interviene de inmediato para acelerar el cobro.' },
    ],
  },
  sucursales: {
    title: 'Nuestras Sucursales de Atención al Público',
    subtitle: 'Vení a nuestras oficinas o escribinos al WhatsApp directo de cada sede. Trato directo, cara a cara y con profesionales con matrícula habilitante.',
    instagramHandle: '@orgsanfrancisco.seguros',
    instagramUrl: 'https://www.instagram.com/orgsanfrancisco.seguros?igsh=Yng0dGY2dnhpcWEx',
    branches: [
      {
        nombre: 'Las Toninas',
        zona: 'Partido de La Costa',
        direccion: 'Av. 7 N° 1825, Las Toninas, Provincia de Buenos Aires',
        horario: 'Lunes a Viernes de 09:00 a 17:00 hs',
        email: 'lastoninas@sanfranciscoseguros.com.ar',
        whatsapp: '5492246482927',
      },
      {
        nombre: 'San Francisco Solano',
        zona: 'Zona Sur GBA',
        direccion: 'Calle 838 N° 3792, San Francisco Solano, Bs. As.',
        horario: 'Lunes a Viernes de 09:00 a 18:00 hs',
        email: 'solano.seguros@sanfranciscoseguros.com.ar',
        whatsapp: '5491125957130',
      },
    ],
  },
  eventos: {
    title: 'Eventos',
    subtitle: 'Descubrí nuestros próximos eventos y actividades diseñados para mantenerte informado, conectado y entretenido. ¡No te pierdas la oportunidad de participar!',
  },
  faq: {
    title: 'Preguntas Frecuentes',
    subtitle: 'Respuestas claras a las dudas más comunes',
    items: [
      {
        pregunta: '¿Por qué contratar a través de un broker y no directo con la compañía?',
        respuesta: 'El precio de la prima es regulado y exactamente el mismo. La diferencia sustancial es que un broker actúa como tu asesor y defensor independiente: te ayudamos a denunciar siniestros y agilizamos el cobro ante los peritos.',
      },
      {
        pregunta: '¿Qué documentación necesito para asegurar mi auto con más de 20 años?',
        respuesta: 'Únicamente necesitás la Cédula Verde o Título del automotor, tu DNI y algunas fotografías del vehículo que podés enviarnos directamente por WhatsApp.',
      },
      {
        pregunta: '¿Cómo se realiza el pago mensual de la póliza?',
        respuesta: 'Podés adherir el pago a débito automático por tarjeta de crédito o CBU bancario, o pagar mediante cupón digital, Mercado Pago o transferencia bancaria directa.',
      },
      {
        pregunta: '¿Emiten pólizas y certificados para ingreso a obras en el acto?',
        respuesta: 'Sí. Los seguros de Accidentes Personales con cláusula de no repetición se emiten y envían en formato digital en el transcurso de la misma jornada laboral.',
      },
    ],
  },
  finalCta: {
    eyebrow: 'Protección y Tranquilidad Garantizada',
    title: 'Protegé lo que tanto esfuerzo te costó conseguir.',
    subtitle: 'Dejanos asesorarte sin compromiso. Conocé las opciones que mejor se adaptan a tu presupuesto con el respaldo de profesionales matriculados.',
  },
  footer: {
    slogan: 'La mejor opción para el resguardo de tu patrimonio.',
    legalLine: 'Organizador y Asesor de Seguros. Operaciones reguladas conforme Ley 22.400 y 20.091.',
    columns: [
      {
        titulo: 'Personas',
        items: ['Accidentes Personales', 'Seguro para hogar', 'Embarcaciones de Placer', 'Motos', 'Responsabilidad Civil profesional', 'Salud', 'Vida individual'],
      },
      {
        titulo: 'Empresas',
        items: ['Caución', 'Incendio', 'Seguro para Consorcios', 'Responsabilidad Civil General', 'Seguro Técnico', 'Todo Riesgo Operativo', 'Transporte de mercadería'],
      },
    ],
  },
}
