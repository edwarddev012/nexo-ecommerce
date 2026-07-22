// products.js
const products = [
  {
    id: 1,
    name: "Teclado Mecánico Minimalista Ghost",
    price: 189.0,
    category: "Tecnología",
    rating: 4.9,
    reviewsCount: 142,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/teclado%20mecanico%20g.jpg",
    description:
      "Eleva tu experiencia de escritura con un chasis de aluminio pulido y switches lineales lubricados de fábrica. Diseño compacto al 75% con conectividad inalámbrica de tres modos y retroiluminación blanca sutil.",
    features: [
      "Switches mecánicos lineales ultra suaves pre-lubricados",
      "Chasis de aluminio anodizado CNC de grado aeroespacial",
      "Conectividad triple: 2.4GHz, Bluetooth 5.1 y cable USB-C",
      "Teclas de PBT de doble inyección con perfil esbelto Cherry",
    ],
    reviews: [
      {
        id: 1,
        name: "David M.",
        rating: 5,
        comment:
          "El sonido de las teclas es pura música. La batería dura semanas sin cargarse.",
        date: "2026-04-12",
      },
      {
        id: 2,
        name: "Sofia T.",
        rating: 4,
        comment:
          "Estética impecable en el escritorio, aunque toma un par de días acostumbrarse al formato compacto.",
        date: "2026-05-01",
      },
    ],
  },
  {
    id: 2,
    name: "Mouse Ergonómico Inalámbrico Axis",
    price: 99.0,
    category: "Tecnología",
    rating: 4.7,
    reviewsCount: 115,
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
    description:
      "Diseño ergonómico avanzado que reduce la tensión muscular de la muñeca. Equipado con un sensor óptico de alta precisión capaz de rastrear sobre cualquier superficie, incluido el vidrio, y rueda de desplazamiento rápido de acero.",
    features: [
      "Ángulo de sujeción ergonómico de 57 grados para una postura natural",
      "Sensor de precisión ajustable hasta 8000 DPI con tracking sobre vidrio",
      "Rueda MagSpeed de acero mecanizado con desplazamiento hiperrápido",
      "Batería recargable USB-C con autonomía de hasta 70 días continuos",
    ],
    reviews: [
      {
        id: 1,
        name: "Lucas P.",
        rating: 5,
        comment:
          "Mis dolores de muñeca desaparecieron por completo tras una semana de uso diario.",
        date: "2026-03-18",
      },
      {
        id: 2,
        name: "Elena R.",
        rating: 4,
        comment:
          "La rueda de metal se siente increíblemente pro. Un poco grande para manos pequeñas.",
        date: "2026-04-05",
      },
    ],
  },
  {
    id: 3,
    name: "Auriculares ANC Premium SoundScape",
    price: 299.0,
    category: "Tecnología",
    rating: 4.8,
    reviewsCount: 204,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description:
      "Aísla por completo el ruido exterior y sumérgete en un sonido de alta fidelidad. Almohadillas de espuma con memoria forradas en cuero textil transpirable y cancelación activa de ruido adaptativa de última generación.",
    features: [
      "Cancelación Activa de Ruido híbrida y adaptativa con 4 micrófonos",
      "Drivers dinámicos de neodimio de 40mm para frecuencias equilibradas",
      "Hasta 40 hours de reproducción continua con ANC activado",
      "Modo transparencia inteligente con detección automática de voz",
    ],
    reviews: [
      {
        id: 1,
        name: "Gabriel S.",
        rating: 5,
        comment:
          "El silencio en el transporte público es total. La calidad de construcción es brutal.",
        date: "2026-05-20",
      },
      {
        id: 2,
        name: "Laura N.",
        rating: 5,
        comment:
          "Súper cómodos para largas jornadas de trabajo de más de 8 horas.",
        date: "2026-06-02",
      },
    ],
  },
  {
    id: 4,
    name: "Cargador de Escritorio GaN 100W",
    price: 69.0,
    category: "Tecnología",
    rating: 4.6,
    reviewsCount: 98,
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80",
    description:
      "Potencia compacta para alimentar todo tu ecosistema. Tecnología de nitruro de galio (GaN) que reduce el tamaño del cargador a la mitad disipando menos calor y entregando energía inteligente a cuatro dispositivos a la vez.",
    features: [
      "Potencia máxima de salida de 100W a través de un solo puerto USB-C",
      "Tecnología GaN avanzada de alta eficiencia térmica y tamaño reducido",
      "Distribución inteligente de energía con 3 puertos USB-C y 1 puerto USB-A",
      "Protección integrada contra sobrevoltaje, sobrecalentamiento y cortocircuitos",
    ],
    reviews: [
      {
        id: 1,
        name: "Mateo B.",
        rating: 5,
        comment:
          "Reemplazó el cargador de mi laptop y de mi teléfono de un solo golpe. Ideal para viajar.",
        date: "2026-04-22",
      },
      {
        id: 2,
        name: "Claudia G.",
        rating: 4,
        comment:
          "Se calienta un poco si usas los 100W completos, pero nada fuera de lo común. Construcción sólida.",
        date: "2026-05-15",
      },
    ],
  },
  {
    id: 5,
    name: "Base de Carga Inalámbrica Magnética Trío",
    price: 119.0,
    category: "Tecnología",
    rating: 4.7,
    reviewsCount: 84,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/Base%20de%20Carga.jpg",
    description:
      "Organiza y carga tus dispositivos esenciales sin enredos de cables. Estructura minimalista de aluminio y silicona suave con alineación magnética perfecta para smartphone, smartwatch y auriculares inalámbricos.",
    features: [
      "Carga inalámbrica simultánea rápida para tres dispositivos individuales",
      "Alineación magnética ultra fuerte compatible con tecnología MagSafe",
      "Base ponderada de acero cepillado que evita deslizamientos en la mesa",
      "Includes adaptador de corriente de pared de alta velocidad de 30W",
    ],
    reviews: [
      {
        id: 1,
        name: "Andrés L.",
        rating: 5,
        comment:
          "Limpia el aspecto de la mesa de noche por completo. Los imanes sujetan firmemente.",
        date: "2026-06-11",
      },
      {
        id: 2,
        name: "Patricia F.",
        rating: 4,
        comment:
          "Excelente acabado mate. Hubiera preferido un cable de alimentación más largo.",
        date: "2026-06-28",
      },
    ],
  },
  {
    id: 6,
    name: "Altavoz Bluetooth Portátil AeroSound",
    price: 135.0,
    category: "Tecnología",
    rating: 4.5,
    reviewsCount: 76,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
    description:
      "Lleva un audio nítido y con graves profundos a cualquier rincón. Altavoz cilíndrico de diseño elegante con proyección de audio en 360 grados, resistencia total al agua y exterior textil premium cepillado.",
    features: [
      "Proyección acústica omnidireccional de 360 grados de alta claridad",
      "Certificación IPX7 de resistencia total al agua y sumersión accidental",
      "Batería recargable con hasta 20 horas de reproducción de música",
      "Radiadores pasivos duales integrados para graves potentes sin distorsión",
    ],
    reviews: [
      {
        id: 1,
        name: "Felipe J.",
        rating: 5,
        comment:
          "Suena increíble para el tamaño que tiene. Los bajos llenan una habitación sin problema.",
        date: "2026-05-09",
      },
      {
        id: 2,
        name: "Marta C.",
        rating: 4,
        comment:
          "Muy estético. El emparejamiento por Bluetooth es instantáneo cada vez.",
        date: "2026-05-24",
      },
    ],
  },
  {
    id: 7,
    name: "Luz LED Inteligente de Acento Aura",
    price: 52.0,
    category: "Tecnología",
    rating: 4.6,
    reviewsCount: 112,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/lampara%20led.jpg",
    description:
      "Transforma la atmósfera de tu habitación o zona de setup con un degradado de color fluido. Barra de luz vertical compacta controlable por aplicación móvil con sincronización de música dinámica en tiempo real.",
    features: [
      "Paleta ilimitada de 16 millones de colores y gradientes dinámicos",
      "Micrófono interno de alta sensibilidad para sincronización con el sonido",
      "Control total inalámbrico mediante app móvil y comandos de voz",
      "Base versátil para colocación vertical o montaje horizontal tras el monitor",
    ],
    reviews: [
      {
        id: 1,
        name: "Tomás H.",
        rating: 5,
        comment:
          "La respuesta al ritmo de la música es impecable. El software de la app es muy intuitivo.",
        date: "2026-06-14",
      },
      {
        id: 2,
        name: "Valeria P.",
        rating: 4,
        comment:
          "Da una luz ambiental perfecta para ver películas de noche. Muy configurable.",
        date: "2026-06-29",
      },
    ],
  },
  {
    id: 8,
    name: "Disco Duro SSD Externo AeroSlim 1TB",
    price: 129.0,
    category: "Tecnología",
    rating: 4.9,
    reviewsCount: 153,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/SANDISK-DISCO-DURO-EXTERNO-SOLIDO-1TB-6-MESES-DE-GARANTIA-SDSSDE60-1T00-G25.jpg",
    description:
      "Velocidad de transferencia masiva protegida en una carcasa de aluminio del tamaño de una tarjeta de crédito. Solución de almacenamiento robusta y ultraligera para fotógrafos, editores y creadores en movimiento.",
    features: [
      "Velocidades de lectura de hasta 1050 MB/s con interfaz USB 3.2 Gen 2",
      "Carcasa sólida de aluminio pulido resistente a caídas de hasta 2 metros",
      "Cifrado de hardware AES de 256 bits para máxima seguridad de datos",
      "Conectividad plug-and-play directa mediante cables USB-C a USB-C e ID tipo A",
    ],
    reviews: [
      {
        id: 1,
        name: "Santiago D.",
        rating: 5,
        comment:
          "Edito video 4K directamente desde el disco sin ningún tipo de retraso o tirón.",
        date: "2026-05-18",
      },
      {
        id: 2,
        name: "Camila V.",
        rating: 5,
        comment:
          "Es increíblemente pequeño y ligero. Cabe literalmente en la palma de mi mano.",
        date: "2026-06-03",
      },
    ],
  },
  {
    id: 9,
    name: "Organizador de Escritorio de Aluminio Mod",
    price: 48.0,
    category: "Accesorios",
    rating: 4.7,
    reviewsCount: 65,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/organizador%20de%20aluminio.jpg",
    description:
      "Mantén tus herramientas diarias al alcance y con un orden impecable. Bandeja modular de aleación mecanizada con ranuras para smartphones, bolígrafos de precisión y pequeños accesorios técnicos de uso continuo.",
    features: [
      "Construcción monobloque de aluminio mecanizado por CNC de alta resistencia",
      "Ranuras revestidas de silicona suave para no rayar los dispositivos móviles",
      "Base con pies de goma microperforados que evitan deslizamientos en la mesa",
      "Diseño de perfil bajo y líneas industriales sobrias",
    ],
    reviews: [
      {
        id: 1,
        name: "Diego F.",
        rating: 5,
        comment:
          "Se ve sumamente limpio en la mesa. Despeja el desorden de bolígrafos de inmediato.",
        date: "2026-04-30",
      },
      {
        id: 2,
        name: "Isabel S.",
        rating: 4,
        comment:
          "El metal combina perfecto con mi laptop. Desearía que tuviera un compartimento más ancho.",
        date: "2026-05-12",
      },
    ],
  },
  {
    id: 10,
    name: "Funda para Laptop de Fieltro y Cuero",
    price: 45.0,
    category: "Accesorios",
    rating: 4.8,
    reviewsCount: 94,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/funda%20para%20laptop.jpg",
    description:
      "Protección sofisticada y de tacto cálido contra arañazos cotidianos. Funda artesanal cortada a medida para laptops de 14 pulgadas fabricada en fieltro de lana densa y solapa de cuero genuino curtido vegetal.",
    features: [
      "Fieltro de lana 100% natural de 3mm de grosor con propiedades térmicas",
      "Cierre de solapa de cuero curtido al vegetal con imanes invisibles integrados",
      "Bolsillo frontal adicional optimizado para blocs de notas, cables o cargadores",
      "Costuras perimetrales reforzadas con hilo de nylon de alta resistencia",
    ],
    reviews: [
      {
        id: 1,
        name: "Marcos N.",
        rating: 5,
        comment:
          "La calidad de los imanes de la solapa es excelente. El tacto del fieltro es de primera.",
        date: "2026-05-14",
      },
      {
        id: 2,
        name: "Clara E.",
        rating: 4,
        comment:
          "Protege de forma impecable dentro de la mochila. El cuero va ganando carácter con los días.",
        date: "2026-06-01",
      },
    ],
  },

  // ID 11: Estuche de Viaje Técnico Rígido Shell
  {
    id: 11,
    name: "Estuche de Viaje Técnico Rigido Shell",
    price: 34.0,
    category: "Accesorios",
    rating: 4.6,
    reviewsCount: 79,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/estuche%20de%20viaje%20rigido.jpg",
    description:
      "Protección balística indestructible para tus accesorios informáticos más preciados. Estuche rígido semiesférico con compartimentos internos de malla, lazos elásticos para cables y cremalleras selladas impermeables.",
    features: [
      "Carcasa exterior rígida de EVA termoformada recubierta de nylon balístico 1680D",
      "Diseño interior de doble sección con bolsillos de malla y cintas elásticas",
      "Cremallera invertida repelente a salpicaduras con tiradores ergonómicos",
      "Mosquetón exterior de aluminio anodizado para enganche rápido en mochilas",
    ],
    reviews: [
      {
        id: 1,
        name: "Ricardo G.",
        rating: 5,
        comment:
          "Soporta golpes sin inmutarse. Dentro va mi mouse y cargador perfectamente seguros.",
        date: "2026-03-27",
      },
      {
        id: 2,
        name: "Julia M.",
        rating: 4,
        comment:
          "Un poco rígido al abrir por las cremalleras selladas, pero la protección es inigualable.",
        date: "2026-04-19",
      },
    ],
  },

  // ID 12: Soporte de Laptop de Aluminio Ajustable
  {
    id: 12,
    name: "Soporte de Laptop de Aluminio Ajustable",
    price: 49.0,
    category: "Accesorios",
    rating: 4.7,
    reviewsCount: 132,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/soporte%20para%20laptop.jpg",
    description:
      "Mejora tu postura elevando la pantalla de tu ordenador a la altura ergonómica de los ojos. Soporte plegable de aluminio cepillado con ángulos variables y ventilación pasiva optimizada.",
    features: [
      "Mecanismo de elevación regulable en 6 niveles angulares precisos",
      "Aleación de aluminio estructural que disipa el calor de forma pasiva",
      "Almohadillas de silicona antideslizantes de gran agarre en la base y cunas",
      "Diseño plegable plano ultra delgado idóneo para bolsos o mochilas",
    ],
    reviews: [
      {
        id: 1,
        name: "Hugo B.",
        rating: 5,
        comment:
          "Mi dolor de cuello disminuyó drásticamente desde que lo uso. Súper estable al escribir.",
        date: "2026-05-22",
      },
      {
        id: 2,
        name: "Natalia K.",
        rating: 4,
        comment:
          "El acabado mate combina al 100% con mi portátil. Es muy ligero de llevar.",
        date: "2026-06-10",
      },
    ],
  },

  // ID 13: Soporte Magnético de Escritorio para MagSafe
  {
    id: 13,
    name: "Soporte Magnético de Escritorio para MagSafe",
    price: 29.0,
    category: "Accesorios",
    rating: 4.5,
    reviewsCount: 51,
    image:
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=600&q=80", // 📱 Soporte escritorio minimalista
    description:
      "Mantén tu teléfono visible en el ángulo perfecto mientras trabajas. Soporte de fundición de zinc pesado que aloja tu cargador magnético con un guiado de cable oculto trasero sumamente limpio.",
    features: [
      "Cuerpo pesado de fundición de aleación de zinc que no se levanta al retirar el teléfono",
      "Ángulo de visión fijo optimizado a 45 grados ideal para videollamadas o modo reposo",
      "Ranura interior de enrutamiento de cables engomada para evitar pellizcos",
      "Anillo de silicona de alta densidad que fija el disco magnético firmemente",
    ],
    reviews: [
      {
        id: 1,
        name: "Esteban R.",
        rating: 4,
        comment:
          "Pesa lo suficiente para quitar el teléfono con una sola mano sin que se mueva la base.",
        date: "2026-05-02",
      },
      {
        id: 2,
        name: "Patricia H.",
        rating: 5,
        comment:
          "El diseño es precioso y minimalista. Esconde el cable por detrás a la perfección.",
        date: "2026-05-19",
      },
    ],
  },
  {
    id: 14,
    name: "Cuaderno Técnico de Notas A5 Blackout",
    price: 24.0,
    category: "Accesorios",
    rating: 4.8,
    reviewsCount: 62,
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=600&q=80",
    description:
      "El lienzo analógico perfecto para plasmar tus esquemas, prototipos o ideas de código. Cuaderno de tapa dura de lino negro con páginas de papel de alto gramaje texturizado con sutil patrón de puntos.",
    features: [
      "160 páginas de papel premium de 120 g/m² resistente a la tinta de estilográfica",
      "Maquetación interior con cuadrícula de puntos gris claro espaciada a 5mm",
      "Encuadernación cosida Smyth que permite una apertura totalmente plana a 180 grados",
      "Cubierta de lino natural cepillado repellent al polvo con doble cinta marcapáginas",
    ],
    reviews: [
      {
        id: 1,
        name: "Fernando S.",
        rating: 5,
        comment:
          "El papel es de otro planeta. La tinta de mis estilográficas no se pasa al reverso.",
        date: "2026-06-04",
      },
      {
        id: 2,
        name: "Marta D.",
        rating: 5,
        comment:
          "Abre completamente plano en la mesa, lo cual facilita mucho dibujar wireframes rápidos.",
        date: "2026-06-25",
      },
    ],
  },
  {
    id: 15,
    name: "Bolígrafo de Precisión de Aluminio Vertex",
    price: 35.0,
    category: "Accesorios",
    rating: 4.7,
    reviewsCount: 43,
    image:
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80",
    description:
      "Instrumento de escritura de por vida diseñado bajo pautas industriales estrictas. Cuerpo facetado anti-rodamiento equilibrado al milímetro para ofrecer trazos fluidos sin fatiga manual.",
    features: [
      "Cuerpo de aluminio anodizado texturizado con estrías de agarre micro-mecanizadas",
      "Silencioso mecanismo de clic retráctil mediante rodamientos internos de acero",
      "Compatible con cartuchos de tinta de gel de alta fluidez estilo Schmidt o Parker",
      "Clip integrado de resorte de acero pulido de alta retención",
    ],
    reviews: [
      {
        id: 1,
        name: "Guillermo O.",
        rating: 5,
        comment:
          "El peso se siente perfecto en los dedos. El mecanismo de clic es sumamente adictivo.",
        date: "2026-05-11",
      },
      {
        id: 2,
        name: "Sonia L.",
        rating: 4,
        comment:
          "Trazos limpios y sin borrones. Una herramienta de diseño analógico preciosa.",
        date: "2026-05-30",
      },
    ],
  },
  {
    id: 16,
    name: "Lámpara de Mesa de Concreto y Filamento Retro",
    price: 58.0,
    category: "Hogar",
    rating: 4.6,
    reviewsCount: 71,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    description:
      "Contraste brutalista y cálido para tu mesita de noche o estantería. Base cilíndrica de concreto vertido a mano con un interruptor de palanca de latón clásico y bombilla de filamento LED expuesta.",
    features: [
      "Base monolítica de hormigón arquitectónico pulido con burbujas naturales",
      "Interruptor de palanca metálica de latón con respuesta de clic mecánica",
      "Bombilla LED Edison de filamento cálido en espiral de bajo consumo incluida",
      "Cable trenzado de lino natural de 1.8 metros con enchufe reforzado",
    ],
    reviews: [
      {
        id: 1,
        name: "Fabián T.",
        rating: 5,
        comment:
          "El hormigón le da un carácter rústico e industrial increíble. La luz es muy acogedora.",
        date: "2026-04-18",
      },
      {
        id: 2,
        name: "Elena F.",
        rating: 4,
        comment:
          "Es pesada y robusta. Combina genial con muebles de madera oscura.",
        date: "2026-05-02",
      },
    ],
  },
  {
    id: 17,
    name: "Difusor de Aromas Ultrasónico Minimal Slate",
    price: 65.0,
    category: "Estilo de vida",
    rating: 4.7,
    reviewsCount: 89,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/difusor%20de%20aromas%202.jpg",
    description:
      "Mejora el bienestar de tus espacios humidificando el aire con aceites esenciales purificados. Cubierta de cerámica esculpida a mano en color gris pizarra que simula una pieza de arte decorativo.",
    features: [
      "Tecnología ultrasónica de 2.4MHz que atomiza el agua sin calentarla",
      "Cubierta exterior de cerámica porosa acabada en pintura mate texturizada",
      "Temporizador configurable de apagado automático por falta de agua (1h/3h/6h)",
      "Anillo de luz LED inferior sutil con opción de brillo tenue respirable",
    ],
    reviews: [
      {
        id: 1,
        name: "Adriana M.",
        rating: 5,
        comment:
          "Silencioso al 100%. Lo uso por las noches con esencia de lavanda y es una maravilla.",
        date: "2026-05-29",
      },
      {
        id: 2,
        name: "Mateo C.",
        rating: 4,
        comment:
          "Estéticamente es precioso, parece un jarrón de diseño. El tanque de agua podría ser algo mayor.",
        date: "2026-06-12",
      },
    ],
  },
  {
    id: 18,
    name: "Reloj de Pared de Cemento e Hilos Chrono",
    price: 89.0,
    category: "Hogar",
    rating: 4.5,
    reviewsCount: 38,
    image:
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=600&q=80",
    description:
      "Una obra de arte minimalista que marca el ritmo de tu día. Reloj de pared sin números fabricado en un disco de cemento de alta densidad con manecillas delgadas de aluminio cepillado.",
    features: [
      "Esfera circular de cemento micro-reforzado texturizado de 30cm de diámetro",
      "Mecanismo de cuarzo de barrido continuo totalmente silencioso (sin tic-tac)",
      "Manecillas lineales estilizadas de aluminio anodizado en contraste mate",
      "Anclaje de suspensión trasero integrado reforzado en el propio chasis",
    ],
    reviews: [
      {
        id: 1,
        name: "Óscar L.",
        rating: 5,
        comment:
          "No se escucha absolutamente nada, ideal para mi estudio donde necesito concentración total.",
        date: "2026-05-14",
      },
      {
        id: 2,
        name: "Laura V.",
        rating: 4,
        comment:
          "Llegó muy bien protegido. Es un objeto contundente y pesado, requiere un buen taco en la pared.",
        date: "2026-06-03",
      },
    ],
  },
  {
    id: 19,
    name: "Soporte de Libros de Acero Geométrico (Par)",
    price: 32.0,
    category: "Hogar",
    rating: 4.8,
    reviewsCount: 57,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/soporte%20de%20libros.jpg",
    description:
      "Sujeta tus volúmenes preferidos con un sutil juego de sombras. Sujeta-libros de diseño angular fabricados en láminas de acero cortadas con láser de alta precisión y acabado en pintura epoxi texturizada.",
    features: [
      "Estructura monolítica de acero de 3mm de grosor capaz de sostener tomos pesados",
      "Corte láser de patrón geométrico asimétrico que crea efectos tridimensionales",
      "Base inferior forrada en fieltro anti-deslizante de gran adherencia",
      "Acabado con recubrimiento de polvo negro mate texturizado anti-rayaduras",
    ],
    reviews: [
      {
        id: 1,
        name: "Javier M.",
        rating: 5,
        comment:
          "Sostienen enciclopedias grandes de diseño gráfico sin doblarse lo más mínimo. Excelente.",
        date: "2026-05-20",
      },
      {
        id: 2,
        name: "Isabel R.",
        rating: 4,
        comment:
          "Muy limpios a la vista. Cumplen su función aportando un toque arquitectónico a mi estantería.",
        date: "2026-06-08",
      },
    ],
  },
  {
    id: 20,
    name: "Maceta Autorregable de Terracota Element",
    price: 39.0,
    category: "Hogar",
    rating: 4.6,
    reviewsCount: 68,
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
    description:
      "Mantén tus plantas de interior hidratadas sin esfuerzo mediante capilaridad natural. Sistema doble que combina un vaso exterior de vidrio soplado transparente con un cuenco interior de terracota porosa.",
    features: [
      "Inserto interior de terracota natural que dosifica la humedad de forma óptima",
      "Depósito exterior de vidrio borosilicato que permite monitorizar el nivel de agua",
      "Previene la putrefacción de raíces mediante un intercambio de aire controlado",
      "Formato compacto ideal para escritorios, repisas o mesas de centro",
    ],
    reviews: [
      {
        id: 1,
        name: "Carlos T.",
        rating: 5,
        comment:
          "Mi planta de suculentas está feliz. Solo lleno el cristal una vez al mes.",
        date: "2026-04-29",
      },
      {
        id: 2,
        name: "Sofía L.",
        rating: 4,
        comment: "Muy bonito diseño. Ayuda a que no olvides regar las plantas.",
        date: "2026-05-18",
      },
    ],
  },
  {
    id: 21,
    name: "Caja Organizadora de Madera y Vidrio",
    price: 75.0,
    category: "Hogar",
    rating: 4.8,
    reviewsCount: 52,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/caja%20organizadora.jpg",
    description:
      "Almacena tus joyas, relojes o colecciones personales con estilo. Estructura de nogal americano macizo con una tapa transparente para mantener todo visible y libre de polvo.",
    features: [
      "Estructura robusta de madera de nogal con ensambles premium",
      "Tapa superior de cristal templado resistente a golpes",
      "Almohadillas interiores forradas en gamuza suave protectora",
      "Cierre con herrajes de latón con un toque rústico elegante",
    ],
    reviews: [
      {
        id: 1,
        name: "Felipe M.",
        rating: 5,
        comment:
          "Increíble acabado. Ideal para lucir mis relojes y plumas estilográficas.",
        date: "2026-04-12",
      },
      {
        id: 2,
        name: "Clara G.",
        rating: 4,
        comment:
          "Muy bonita y el empaque vino perfecto. Los separadores internos son cómodos.",
        date: "2026-05-02",
      },
    ],
  },
  {
    id: 22,
    name: "Soporte Minimalista para Auriculares",
    price: 32.0,
    category: "Accesorios",
    rating: 4.7,
    reviewsCount: 61,
    image:
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=600&q=80", // 🎧 Soporte de audífonos real
    description:
      "Mantén tus audífonos de diadema organizados y con un aspecto flotante elegante. Construido en aluminio negro mate y base ponderada antideslizante.",
    features: [
      "Estructura curvada en aluminio anodizado CNC de alta calidad",
      "Cuna de apoyo con recubrimiento de silicona que no deforma la diadema",
      "Base de acero que evita cualquier tipo de balanceo al colocarlos",
      "Canal trasero para un enrutado de cable extra de forma discreta",
    ],
    reviews: [
      {
        id: 1,
        name: "Hugo T.",
        rating: 5,
        comment:
          "Súper estable y no ocupa casi nada de espacio en mi escritorio.",
        date: "2026-03-29",
      },
      {
        id: 2,
        name: "Elena V.",
        rating: 4,
        comment: "Estética perfecta que combina genial con mis cascos negros.",
        date: "2026-04-15",
      },
    ],
  },

  // ID 23: Cargador Magnético de Coche 15W
  {
    id: 23,
    name: "Cargador Magnético de Coche 15W",
    price: 45.0,
    category: "Tecnología",
    rating: 4.6,
    reviewsCount: 77,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/cargador%20para%20carros.jpg", // 🚗 Interior coche/cargador móvil
    description:
      "Sujeta y carga tu smartphone de forma segura en tus viajes por carretera. Compatible con sistemas de alineación magnética rápida e instalación fácil en la rejilla de ventilación.",
    features: [
      "Bobinas de cobre mejoradas para carga inalámbrica rápida de 15W",
      "Imanes de neodimio N52 con agarre firme incluso en baches fuertes",
      "Cabezal esférico con rotación completa de 360 grados ajustable",
      "Pinza de sujeción para rejilla con silicona antiarañazos estructural",
    ],
    reviews: [
      {
        id: 1,
        name: "Esteban R.",
        rating: 5,
        comment:
          "El teléfono no se mueve nada y carga bastante rápido en trayectos cortos.",
        date: "2026-05-11",
      },
      {
        id: 2,
        name: "Laura F.",
        rating: 4,
        comment:
          "Fácil de instalar y muy cómodo de poner y quitar con una sola mano.",
        date: "2026-06-02",
      },
    ],
  },
  {
    id: 24,
    name: "Estuche de Relojes en Nogal Macizo",
    price: 110.0,
    category: "Hogar",
    rating: 4.9,
    reviewsCount: 45,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/estuche%20de%20relojes.jpg",
    description:
      "Organiza tus relojes preferidos en una obra de artesanía de madera de nogal americano macizo con juntas de cola de milano.",
    features: [
      "Madera de nogal americano macizo con juntas de cola de milano",
      "Ventana superior de cristal templado mineral de alta resistencia a arañazos",
      "Capacidad para 4 relojes grandes con almohadillas acolchadas adaptables",
      "Cierre con herrajes magnéticos de neodimio ocultos de ajuste preciso",
    ],
    reviews: [
      {
        id: 1,
        name: "Alejandro P.",
        rating: 5,
        comment:
          "El acabado de la madera es sedoso y los encajes son perfectos. Una pieza de lujo.",
        date: "2026-05-24",
      },
      {
        id: 2,
        name: "Elena T.",
        rating: 5,
        comment:
          "Los cojines sujetan firmemente incluso mis relojes de correa más fina sin deformarlos.",
        date: "2026-06-15",
      },
    ],
  },
  {
    id: 25,
    name: "Micrófono de Condensador StudioOne",
    price: 159.0,
    category: "Tecnología",
    rating: 4.8,
    reviewsCount: 88,
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
    description:
      "Captura tu voz con claridad de estudio para podcasts, streaming o grabaciones musicales. Con patrón polar cardioide de precisión, cuerpo metálico y conexión plug-and-play USB-C.",
    features: [
      "Cápsula de condensador de 25mm con calidad de estudio",
      "Conversión de audio de alta resolución de 24 bits/96 kHz",
      "Botón de silencio táctil de respuesta rápida con indicador LED",
      "Conector para auriculares de 3.5mm integrado con cero latencia",
    ],
    reviews: [
      {
        id: 1,
        name: "Andrés K.",
        rating: 5,
        comment:
          "Mi audiencia notó el cambio de audio al instante. Excelente supresión de eco.",
        date: "2026-05-18",
      },
      {
        id: 2,
        name: "Sonia G.",
        rating: 4,
        comment:
          "Muy estético en su brazo articulado. El control de ganancia es muy útil.",
        date: "2026-06-03",
      },
    ],
  },
  {
    id: 26,
    name: "Barra de Luz Inteligente para Monitor",
    price: 79.0,
    category: "Tecnología",
    rating: 4.7,
    reviewsCount: 104,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/barra%20de%20luz%20para%20monitor.jpg",
    description:
      "Reduce la fatiga ocular iluminando tu zona de trabajo sin reflejos molestos en la pantalla. Cuenta con ajuste de temperatura automático y control táctil inalámbrico.",
    features: [
      "Diseño asimétrico patentado que elimina reflejos directos en el cristal",
      "Regulación de temperatura de color continua de 2700K a 6500K",
      "Abrazadera con contrapeso de gravedad compatible con cualquier grosor de monitor",
      "Sensor de luz ambiental integrado para ajuste inteligente automático",
    ],
    reviews: [
      {
        id: 1,
        name: "Carlos M.",
        rating: 5,
        comment:
          "Mis ojos ya no se cansan nada trabajando de noche. Un cambio radical de bienestar.",
        date: "2026-06-12",
      },
      {
        id: 2,
        name: "Sofia L.",
        rating: 4,
        comment:
          "El control inalámbrico de escritorio es genial. Ocupa muy poco espacio.",
        date: "2026-06-25",
      },
    ],
  },
  {
    id: 27,
    name: "Organizador Técnico de Cables Compacto",
    price: 38.0,
    category: "Accesorios",
    rating: 4.6,
    reviewsCount: 91,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/organizador%20de%20cables%20.jpg",
    description:
      "Mantén todos tus cargadores, adaptadores y memorias USB perfectamente organizados en tus viajes. Diseñado con bolsillos elásticos de origami y cremalleras YKK resistentes al agua.",
    features: [
      "Material exterior de poliéster 900D reciclado repelente al agua",
      "Distribución interna inteligente con bolsillos elásticos tipo origami",
      "Bolsillo externo de acceso rápido con puerto para pasar cables",
      "Cremalleras de alta durabilidad YKK con tiradores engomados",
    ],
    reviews: [
      {
        id: 1,
        name: "Raúl G.",
        rating: 5,
        comment:
          "Increíble la cantidad de cables y adaptadores que entran sin abultar.",
        date: "2026-04-18",
      },
      {
        id: 2,
        name: "Patricia T.",
        rating: 4,
        comment:
          "El material se siente muy resistente y el color gris espacial es espectacular.",
        date: "2026-05-02",
      },
    ],
  },
  {
    id: 28,
    name: "Hub USB-C Multipuerto Aluminio 8-en-1",
    price: 59.0,
    category: "Tecnología",
    rating: 4.7,
    reviewsCount: 112,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/hub%20usb.jpg",
    description:
      "Expande la conectividad de tu laptop con puertos HDMI 4K, lectores de tarjeta y entrega de energía continua a través de un elegante chasis de aluminio pulido.",
    features: [
      "Salida de video de alta definición HDMI compatible con resolución 4K a 60Hz",
      "Puerto de paso de carga USB-C PD con soporte de potencia de hasta 100W",
      "Lectores integrados de tarjetas SD y MicroSD de alta velocidad UHS-I",
      "Tres puertos adicionales USB-A 3.0 para periféricos heredados",
    ],
    reviews: [
      {
        id: 1,
        name: "Mario V.",
        rating: 5,
        comment:
          "Un accesorio totalmente imprescindible para mi portátil. Funciona sin calentarse.",
        date: "2026-05-19",
      },
      {
        id: 2,
        name: "Diana S.",
        rating: 4,
        comment:
          "Es ligero y el color combina a la perfección con mi MacBook gris.",
        date: "2026-06-01",
      },
    ],
  },
  {
    id: 29,
    name: "Soporte para Monitor de Madera Minimalista",
    price: 65.0,
    category: "Hogar",
    rating: 4.8,
    reviewsCount: 63,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/soporte%20para%20monitor%20de%20madera.jpg",
    description:
      "Eleva tu monitor a la altura perfecta para la vista mientras creas espacio extra debajo para guardar tu teclado. Fabricado en contrachapado de abedul de primera calidad.",
    features: [
      "Estructura curvada de una sola pieza en contrachapado de abedul báltico",
      "Soporta cargas de monitores pesados o iMacs de hasta 25 kg",
      "Pies acolchados de corcho natural que no rayan tu mesa de escritorio",
      "Apertura inferior amplia apta para teclados de tamaño completo",
    ],
    reviews: [
      {
        id: 1,
        name: "Enrique J.",
        rating: 5,
        comment:
          "Estética nórdica limpia y muy resistente. Mi escritorio se ve el doble de ordenado.",
        date: "2026-04-22",
      },
      {
        id: 2,
        name: "Marisol P.",
        rating: 5,
        comment:
          "La calidad de los bordes redondeados y el barniz mate es insuperable.",
        date: "2026-05-14",
      },
    ],
  },
  {
    id: 30,
    name: "Luz de Video LED Portátil para Creadores",
    price: 49.0,
    category: "Tecnología",
    rating: 4.5,
    reviewsCount: 84,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/luz%20led%20para%20creadores.jpg",
    description:
      "Iluminación profesional de tamaño bolsillo para tus llamadas de Zoom, transmisiones en vivo o vlogs. Con batería interna de larga duración y panel difusor de luz suave.",
    features: [
      "Panel de 120 LEDs bicolor con temperatura ajustable de 3200K a 5600K",
      "Batería de litio recargable integrada de 3000mAh para hasta 15 horas de uso",
      "Pantalla OLED trasera que indica el porcentaje de brillo y autonomía",
      "Incluye adaptador de zapata fría y ventosa para portátiles o tabletas",
    ],
    reviews: [
      {
        id: 1,
        name: "Tomás K.",
        rating: 5,
        comment:
          "La batería dura muchísimo y la luz que emite no es molesta ni deslumbra.",
        date: "2026-05-27",
      },
      {
        id: 2,
        name: "Victoria R.",
        rating: 4,
        comment:
          "Mejora mi imagen de manera espectacular en las videollamadas de trabajo cotidianas.",
        date: "2026-06-11",
      },
    ],
  },
  {
    id: 31,
    name: "Batería Portátil PowerBank GaN 20000mAh",
    price: 89.0,
    category: "Tecnología",
    rating: 4.8,
    reviewsCount: 121,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/bateria%20portatil.jpg",
    description:
      "La máxima potencia de viaje que cabe en tu mochila. Capaz de cargar por completo tu laptop gracias a su salida USB-C Power Delivery de alta velocidad de 65W.",
    features: [
      "Capacidad masiva de 20,000mAh para cargar un teléfono hasta 5 veces",
      "Salida USB-C PD de 65W que alimenta portátiles de gama alta a velocidad de pared",
      "Estructura interna compacta gracias a los componentes de nitruro de galio",
      "Pantalla digital LED inteligente que muestra la carga precisa restante",
    ],
    reviews: [
      {
        id: 1,
        name: "Andrés B.",
        rating: 5,
        comment:
          "Carga mi portátil de trabajo mientras estoy en cafeterías sin corriente. Excelente inversión.",
        date: "2026-05-24",
      },
      {
        id: 2,
        name: "Marta S.",
        rating: 4,
        comment:
          "Algo pesada, pero la velocidad de carga compensa totalmente el peso. Excelente construcción.",
        date: "2026-06-18",
      },
    ],
  },
  {
    id: 32,
    name: "Lámpara de Escritorio LED con Carga Inalámbrica",
    price: 79.0,
    category: "Hogar",
    rating: 4.7,
    reviewsCount: 83,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/lampara%20de%20escritorio.jpg",
    description:
      "Ilumina tu espacio con la temperatura perfecta y carga tus dispositivos simultáneamente. Brazo articulado de aluminio, controles táctiles y base con cargador Qi integrado.",
    features: [
      "Base de carga inalámbrica rápida de 15W compatible con smartphones Qi",
      "4 modos de temperatura de color y 5 niveles de brillo táctil",
      "Brazo y cabezal de aluminio anodizado totalmente multiajustables",
      "Puerto USB-A de salida trasera adicional para carga por cable",
    ],
    reviews: [
      {
        id: 1,
        name: "Tomás P.",
        rating: 5,
        comment:
          "Muy versátil y limpia en el escritorio. La luz de lectura cálida es muy relajante.",
        date: "2026-05-14",
      },
      {
        id: 2,
        name: "Elena R.",
        rating: 4,
        comment:
          "Excelente lámpara. Se siente pesada y de buena calidad, la carga Qi es rápida.",
        date: "2026-06-05",
      },
    ],
  },
  {
    id: 33,
    name: "Lámpara Colgante Minimalista Nordica",
    price: 119.0,
    category: "Hogar",
    rating: 4.8,
    reviewsCount: 46,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/lampara%20colgante.jpg",
    description:
      "Aporta un toque escandinavo contemporáneo a tu comedor o barra de cocina. Pantalla de aluminio torneado a mano con un acento de madera de fresno natural.",
    features: [
      "Pantalla cónica de aluminio torneada con acabado en pintura mate texturizada",
      "Detalle superior de acoplamiento de madera de fresno natural maciza",
      "Cable de suspensión forrado en tejido negro de 1.5 metros regulable",
      "Compatible con cualquier bombilla estándar de casquillo E27",
    ],
    reviews: [
      {
        id: 1,
        name: "Julio C.",
        rating: 5,
        comment:
          "Queda preciosa sobre la mesa del comedor. El acabado de la madera es de gran nivel.",
        date: "2026-05-10",
      },
      {
        id: 2,
        name: "Nerea M.",
        rating: 4,
        comment:
          "La luz que proyecta hacia abajo es perfecta. Llegó muy rápido y bien embalada.",
        date: "2026-06-02",
      },
    ],
  },
  {
    id: 34,
    name: "Organizador de Cuero para Llaves y Monedas",
    price: 29.0,
    category: "Estilo de vida",
    rating: 4.6,
    reviewsCount: 51,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/organizador%20de%20cuero%20para%20llaves%20y%20monedas.jpg",
    description:
      "Evita perder tus pertenencias esenciales al llegar a casa. Vaciabolsillos elegante fabricado en cuero curtido de grano completo con broches magnéticos de alta resistencia.",
    features: [
      "Cuero curtido vegetal que desarrollará una hermosa pátina con el tiempo",
      "Broches magnéticos en las esquinas que permiten guardarlo plano en tus viajes",
      "Base interior forrada en gamuza ultrasuave protectora de arañazos",
      "Perfecto para sostener tu reloj, llaves, monedas y lentes",
    ],
    reviews: [
      {
        id: 1,
        name: "Tomas B.",
        rating: 5,
        comment:
          "Sencillo, elegante y extremadamente útil. Evita que raye mis lentes en la mesa.",
        date: "2026-05-15",
      },
      {
        id: 2,
        name: "Juliana L.",
        rating: 4,
        comment:
          "El cuero huele increíble y el color tabaco es precioso. Muy bien fabricado.",
        date: "2026-06-12",
      },
    ],
  },
  {
    id: 35,
    name: "Estante Flotante de Madera Maciza",
    price: 49.0,
    category: "Hogar",
    rating: 4.7,
    reviewsCount: 73,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/estante%20flotante.jpg",
    description:
      "Muestra tus plantas, libros o cuadros con un soporte totalmente invisible. Estante robusto de madera de pino seleccionado con bordes cepillados a mano.",
    features: [
      "Madera de pino de bosque sostenible con vetas naturales marcadas",
      "Sistema de soporte interno de acero totalmente invisible y de fácil anclaje",
      "Acabado protector con ceras naturales repelentes al agua y polvo",
      "Soporta cargas estáticas de hasta 15 kg con una instalación sólida",
    ],
    reviews: [
      {
        id: 1,
        name: "Guillermo P.",
        rating: 5,
        comment:
          "La instalación fue sumamente sencilla y el soporte oculto es de acero muy robusto.",
        date: "2026-05-14",
      },
      {
        id: 2,
        name: "Clara O.",
        rating: 4,
        comment:
          "Precioso estante. Le da calidez instantánea a la pared de mi salón.",
        date: "2026-06-03",
      },
    ],
  },
  {
    id: 36,
    name: "Soporte para iPad de Aluminio Regulable",
    price: 39.0,
    category: "Accesorios",
    rating: 4.8,
    reviewsCount: 65,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/soporte%20para%20ipad3.jpg",
    description:
      "Trabaja o dibuja con tu tableta con la máxima comodidad. Base ajustable de aluminio con bisagras de gran rigidez que soportan la presión del trazo del lápiz óptico.",
    features: [
      "Estructura doble articulada que permite ajustar altura y ángulo de visión",
      "Inserciones de silicona de protección en la cuna de soporte y base antideslizante",
      "Apertura trasera para facilitar la conexión de cables de alimentación",
      "Diseño plegable plano idóneo para guardarlo en la funda de viaje de la tableta",
    ],
    reviews: [
      {
        id: 1,
        name: "Mateo G.",
        rating: 5,
        comment:
          "Soporta la presión del Apple Pencil dibujando de forma excelente. Cero balanceos.",
        date: "2026-04-29",
      },
      {
        id: 2,
        name: "Verónica L.",
        rating: 4,
        comment:
          "La calidad del aluminio y de las bisagras es muy alta. Muy duradero.",
        date: "2026-05-18",
      },
    ],
  },
  {
    id: 37,
    name: "Organizador de Escritorio de Fieltro Gris",
    price: 24.0,
    category: "Accesorios",
    rating: 4.6,
    reviewsCount: 42,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/organizador%20de%20escritorio%20fieltro%20gris.jpg",
    description:
      "Mantén tus bolígrafos, cuadernos y móvil ordenados con una textura suave al tacto. Bandeja compacta fabricada en fieltro de lana prensado termoformado.",
    features: [
      "Fieltro de lana sintética de alta densidad y propiedades amortiguadoras de sonido",
      "Compartimentos divididos optimizados para diferentes útiles de oficina",
      "Base rígida que mantiene la forma sin importar el peso del contenido",
      "Textura suave que evita cualquier tipo de arañazos en pantallas o gafas",
    ],
    reviews: [
      {
        id: 1,
        name: "Carlos O.",
        rating: 5,
        comment:
          "Es perfecto para vaciar los bolsillos al sentarse a trabajar. Muy discreto.",
        date: "2026-05-12",
      },
      {
        id: 2,
        name: "Sonia J.",
        rating: 4,
        comment:
          "Un diseño súper limpio y el color gris combina genial con cualquier mesa de madera.",
        date: "2026-05-30",
      },
    ],
  },
  {
    id: 38,
    name: "Caja Fuerte Portátil de Acero Compacta",
    price: 55.0,
    category: "Accesorios",
    rating: 4.5,
    reviewsCount: 38,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/caja%20fuerte.jpg",
    description:
      "Protege tu pasaporte, efectivo y unidades de almacenamiento durante tus viajes. Chasis de aleación de acero templado con cable de seguridad de acero trenzado.",
    features: [
      "Carcasa de aleación de acero ultra fuerte resistente a apalancamientos",
      "Cerradura de combinación numérica de tres dígitos de alta seguridad",
      "Interior forrado de espuma de alta densidad para amortiguar impactos",
      "Incluye cable de seguridad de acero de alta resistencia para anclaje fijo",
    ],
    reviews: [
      {
        id: 1,
        name: "Ramón P.",
        rating: 5,
        comment:
          "Excelente para dejarla anclada dentro del coche o del hotel de forma segura.",
        date: "2026-04-14",
      },
      {
        id: 2,
        name: "Isabel T.",
        rating: 4,
        comment:
          "Se siente pesada y muy robusta. El mecanismo de combinación va muy suave.",
        date: "2026-05-02",
      },
    ],
  },
  {
    id: 39,
    name: "Soporte de Pared para Auriculares Minimal",
    price: 19.0,
    category: "Accesorios",
    rating: 4.7,
    reviewsCount: 59,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/soporte%20de%20pared%20para%20auriculares.jpg",
    description:
      "Despeja tu mesa colgando tus cascos en la pared o al lateral de tu estantería. Percha elegante mecanizada de madera maciza y aluminio anodizado.",
    features: [
      "Apoyo de madera curvada de nogal que respeta la forma de la diadema",
      "Cuerpo de aluminio aeroespacial mecanizado mediante control numérico",
      "Fijación mediante cinta adhesiva ultra fuerte de doble cara o tornillería",
      "Soporta auriculares pesados de audiófilo de hasta 3 kg de peso",
    ],
    reviews: [
      {
        id: 1,
        name: "Alberto R.",
        rating: 5,
        comment:
          "Fácil de pegar al lateral de mi escritorio de madera. Queda sumamente estético.",
        date: "2026-05-20",
      },
      {
        id: 2,
        name: "Marta N.",
        rating: 4,
        comment:
          "El acabado de nogal es precioso y los auriculares descansan sin marcarse.",
        date: "2026-06-11",
      },
    ],
  },
  {
    id: 40,
    name: "Lámpara de Pie Inteligente RGB Flow",
    price: 129.0,
    category: "Hogar",
    rating: 4.8,
    reviewsCount: 92,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/lampara%20de%20luz%20led.jpg",
    description:
      "Crea ambientes de iluminación fluidos y envolventes en las esquinas de tus habitaciones. Barra de luz vertical de diseño esbelto con control inalámbrico y efectos de luz multicolor.",
    features: [
      "Perfil de aluminio ultra delgado que encaja en cualquier esquina",
      "Tecnología LED RGBIC que muestra múltiples colores en una misma línea",
      "Sincronización de música inteligente con micrófono de alta respuesta integrado",
      "Control por aplicación móvil y compatibilidad con asistentes de voz",
    ],
    reviews: [
      {
        id: 1,
        name: "David F.",
        rating: 5,
        comment:
          "La transición de los colores de luz es súper fluida. Totalmente recomendada.",
        date: "2026-05-18",
      },
      {
        id: 2,
        name: "Laura K.",
        rating: 5,
        comment:
          "Una lámpara de esquina preciosa. Da un ambiente espectacular para ver series.",
        date: "2026-06-05",
      },
    ],
  },
  {
    id: 41,
    name: "Soporte para Auriculares Bajo Mesa",
    price: 15.0,
    category: "Accesorios",
    rating: 4.6,
    reviewsCount: 49,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/soporte%20para%20auriculares%20bajo%20mesa.jpg",
    description:
      "El truco definitivo de organización para mantener tus audífonos ocultos pero siempre al alcance de la mano. Gancho metálico discreto de fácil montaje bajo el tablero.",
    features: [
      "Fabricado en aleación de aluminio doblado de gran solidez",
      "Almohadilla de silicona antideslizante que protege la diadema de arañazos",
      "Instalación instantánea mediante adhesivo de alta resistencia 3M VHB precortado",
      "Diseño ultra discreto que se adapta a cualquier entorno",
    ],
    reviews: [
      {
        id: 1,
        name: "Felipe T.",
        rating: 5,
        comment:
          "Lo pegué al lateral del escritorio con el adhesivo 3M y ni se mueve. Súper práctico.",
        date: "2026-04-19",
      },
      {
        id: 2,
        name: "Laura R.",
        rating: 4,
        comment:
          "Sencillo y cumple su función perfectamente. El material se siente de buena calidad.",
        date: "2026-05-20",
      },
    ],
  },
  {
    id: 42,
    name: "Tapete de Escritorio de Fieltro de Lana XL",
    price: 85.0,
    category: "Hogar",
    rating: 4.7,
    reviewsCount: 118,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/tapete%20de%20escritorio%20xl.jpg",
    description:
      "Redefine por completo tu espacio de trabajo con nuestra superficie extra grande. Ofrece espacio de sobra para tu teclado de tamaño completo, mouse, taza y tableta gráfica.",
    features: [
      "Fieltro de lana premium extra grueso de 4mm de densidad",
      "Formato gigante XL de 90x40cm para una cobertura completa del escritorio",
      "Costuras de refuerzo invisibles en todo el perímetro que evitan el desgaste",
      "Base antideslizante estructurada con patrones de panal de abeja de látex",
    ],
    reviews: [
      {
        id: 1,
        name: "Esteban F.",
        rating: 5,
        comment:
          "Cubre casi toda mi mesa y hace que escribir y mover el mouse sea una experiencia súper placentera.",
        date: "2026-05-15",
      },
      {
        id: 2,
        name: "Diana P.",
        rating: 4,
        comment:
          "El ratón desliza de maravilla y el teclado ya no hace nada de ruido metálico sobre la madera.",
        date: "2026-06-02",
      },
    ],
  },
  {
    id: 43,
    name: "Maceta de Cerámica Texturizada con Base de Madera",
    price: 45.0,
    category: "Hogar",
    rating: 4.8,
    reviewsCount: 61,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/maceta%20de%20ceramica.jpg",
    description:
      "El hogar perfecto para tus plantas preferidas de interior. Cuenco de cerámica blanca horneada a alta temperatura colocada sobre un soporte de roble.",
    features: [
      "Cerámica esmaltada de primera calidad con textura mate sutil",
      "Base resistente de madera de roble cortada y ensamblada a mano",
      "Orificio de drenaje integrado con tapón de silicona removible",
      "Diseño moderno escandinavo de gran nivel estético decorativo",
    ],
    reviews: [
      {
        id: 1,
        name: "Fernando L.",
        rating: 5,
        comment:
          "Precioso soporte de roble. Eleva de inmediato la presencia de mi planta de salón.",
        date: "2026-05-29",
      },
      {
        id: 2,
        name: "Isabel K.",
        rating: 5,
        comment:
          "La cerámica es pesada y tiene un acabado artesanal en cada detalle.",
        date: "2026-06-15",
      },
    ],
  },
  {
    id: 44,
    name: "Cojín Ergonómico para Silla Lumbar Support",
    price: 39.0,
    category: "Hogar",
    rating: 4.6,
    reviewsCount: 85,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/cojin%20para%20silla%20lumbar.jpg",
    description:
      "Mejora tu postura al estar sentado en largas jornadas de oficina. Cojín de espuma con memoria adaptativa de alta densidad que proporciona soporte lumbar.",
    features: [
      "Espuma de memoria de grado médico con gran capacidad de rebote",
      "Funda extraíble y lavable de malla 3D transpirable e hipoalergénica",
      "Correas ajustables de doble hebilla que evitan desprendimientos",
      "Ergonomía contorneada que respeta y corrige la curvatura de la columna",
    ],
    reviews: [
      {
        id: 1,
        name: "Marcos N.",
        rating: 5,
        comment:
          "Mi dolor de espalda baja desapareció. Se adapta fantástico a la silla de oficina.",
        date: "2026-04-18",
      },
      {
        id: 2,
        name: "Sofía M.",
        rating: 4,
        comment:
          "Es cómodo y no da nada de calor. El soporte es bastante firme y firme.",
        date: "2026-05-12",
      },
    ],
  },
  {
    id: 45,
    name: "Soporte de Laptop de Acero para Escritorio",
    price: 59.0,
    category: "Accesorios",
    rating: 4.7,
    reviewsCount: 93,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/soporte%20para%20laptop%20de%20acero%20para%20escritorio.jpg",
    description:
      "Optimiza la refrigeración de tu ordenador y mantén tu mesa organizada. Soporte vertical rígido fabricado en plancha de acero plegado pesado.",
    features: [
      "Construcción estructural masiva de acero al carbono de 4mm de espesor",
      "Ancho de sujeción ajustable compatible con laptops de cualquier grosor",
      "Gomas de protección interiores de gran densidad que evitan roces metálicos",
      "Base ponderada súper pesada para evitar cualquier caída accidental",
    ],
    reviews: [
      {
        id: 1,
        name: "Mateo S.",
        rating: 5,
        comment:
          "La mejor base vertical. Ahorra muchísimo espacio al trabajar con monitor externo.",
        date: "2026-05-22",
      },
      {
        id: 2,
        name: "Julia H.",
        rating: 4,
        comment: "Pesada, robusta y con acabados de primera. Muy elegante.",
        date: "2026-06-03",
      },
    ],
  },
  {
    id: 46,
    name: "Cuaderno de Notas Técnico Tapa Dura",
    price: 28.0,
    category: "Accesorios",
    rating: 4.8,
    reviewsCount: 71,
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=600&q=80",
    description:
      "El compañero analógico definitivo para diseñadores y programadores. Cuaderno técnico A5 con cuadrícula de puntos y papel grueso que soporta todo tipo de tintas.",
    features: [
      "Páginas de papel premium de 120 g/m² libre de ácidos de alta durabilidad",
      "Páginas numeradas y tabla de índice inicial de organización",
      "Encuadernación cosida que permite una apertura totalmente plana",
      "Bolsillo de fuelle interno trasero para guardar tarjetas de visita o notas",
    ],
    reviews: [
      {
        id: 1,
        name: "David T.",
        rating: 5,
        comment:
          "El papel se siente de una calidad increíble. El bolígrafo de gel desliza perfecto.",
        date: "2026-05-14",
      },
      {
        id: 2,
        name: "Elena G.",
        rating: 5,
        comment:
          "Abre de forma plana sin romperse y el elástico de cierre es muy firme.",
        date: "2026-05-29",
      },
    ],
  },
  {
    id: 47,
    name: "Termo Negro Mate de Acero Inoxidable",
    price: 35.0,
    category: "Estilo de vida",
    rating: 4.6,
    reviewsCount: 54,
    image:
      "https://huknkdlroxztrpfbfbqm.supabase.co/storage/v1/object/public/proyectos/termo%20negro.jpg",
    description:
      "Mantén tus bebidas calientes o frías durante todo el día. Termo con aislamiento de doble pared de acero inoxidable y acabado texturizado negro mate antideslizante.",
    features: [
      "Aislamiento térmico al vacío TempShield de doble pared de acero",
      "Mantiene bebidas frías hasta por 24 horas y calientes hasta por 12",
      "Acabado exterior de pintura en polvo altamente duradera y mate",
      "Tapa hermética a prueba de fugas accidentales de silicona alimentaria",
    ],
    reviews: [
      {
        id: 1,
        name: "Guillermo P.",
        rating: 5,
        comment:
          "El agua permanece fría literalmente todo el día en el gimnasio. Súper recomendable.",
        date: "2026-05-11",
      },
      {
        id: 2,
        name: "Camila J.",
        rating: 4,
        comment:
          "El sistema de carga magnética de la tapa es comodísimo. El color negro mate se siente increíblemente pro.",
        date: "2026-06-24",
      },
    ],
  },
  {
    id: 48,
    name: "Mochila para Laptop Slimline Matte",
    price: 125.0,
    category: "Accesorios",
    rating: 4.7,
    reviewsCount: 92,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    description:
      "La combinación definitiva de delgadez y protección para tu setup de viaje. Diseño ultradelgado, carcasa semirígida resistente al agua y compartimentos acolchados dedicados.",
    features: [
      "Compartimento flotante para laptops de hasta 16 pulgadas",
      "Tejido de poliuretano mate repellent al agua y de fácil limpieza",
      "Perfil súper plano de solo 10cm de grosor que mantiene una silueta esbelta",
      "Correas acolchadas con espuma EVA de celda cerrada y canal de aire trasero",
    ],
    reviews: [
      {
        id: 1,
        name: "Javier L.",
        rating: 5,
        comment:
          "La mochila más elegante que he tenido. No abulta nada en el metro y protege mi laptop de forma espectacular.",
        date: "2026-05-14",
      },
      {
        id: 2,
        name: "Isabel Q.",
        rating: 4,
        comment:
          "Un diseño súper moderno. El espacio interior es justo pero perfecto para el día a día.",
        date: "2026-06-01",
      },
    ],
  },
];

export default products;
