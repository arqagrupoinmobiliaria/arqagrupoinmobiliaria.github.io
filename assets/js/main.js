// =============================
// Header: transparent -> solid on scroll
// =============================
const header = document.getElementById("siteHeader");
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

function onScrollHeader(){
  const y = window.scrollY || 0;
  if (y > 20){
    header.classList.remove("header--transparent");
    header.classList.add("header--solid");
  } else {
    header.classList.add("header--transparent");
    header.classList.remove("header--solid");
  }
}
if (header) {
  window.addEventListener("scroll", onScrollHeader);
  onScrollHeader();
}
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
// =============================
// Mobile nav toggle
// =============================
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
}

// Close nav on click (mobile)
navLinks?.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a) return;
  navLinks.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
});

// =============================
// Hero slider
// =============================
const slidesEl = document.getElementById("heroSlides");
const dotsEl = document.getElementById("heroDots");

const SLIDES = [
  { cityKey: "city_quito", img: "assets/img/slider-quito.jpg" },
  { cityKey: "city_gye", img: "assets/img/slider-guayaquil.jpg" },
  { cityKey: "city_cuenca", img: "assets/img/slider-cuenca.jpg" }
];

let sliderIndex = 0;
let sliderTimer = null;

function renderSlides(){
  slidesEl.innerHTML = "";
  dotsEl.innerHTML = "";

  SLIDES.forEach((s, idx) => {
    const d = document.createElement("div");
    d.className = "hero__slide" + (idx === 0 ? " is-active" : "");
    d.style.backgroundImage = `url('${s.img}')`;
    d.dataset.cityKey = s.cityKey;
    slidesEl.appendChild(d);

    const dot = document.createElement("button");
    dot.className = "dot" + (idx === 0 ? " is-active" : "");
    dot.type = "button";
    dot.setAttribute("aria-label", `Slide ${idx + 1}`);
    dot.addEventListener("click", () => goToSlide(idx, true));
    dotsEl.appendChild(dot);
  });
}

function goToSlide(idx, restart){
  sliderIndex = idx;

  const all = [...document.querySelectorAll(".hero__slide")];
  const dots = [...document.querySelectorAll(".dot")];

  all.forEach((el, i) => el.classList.toggle("is-active", i === sliderIndex));
  dots.forEach((el, i) => el.classList.toggle("is-active", i === sliderIndex));

  if (restart){
    stopAuto();
    startAuto();
  }
}

function startAuto(){
  sliderTimer = setInterval(() => {
    const next = (sliderIndex + 1) % SLIDES.length;
    goToSlide(next, false);
  }, 6500);
}
function stopAuto(){
  if (sliderTimer) clearInterval(sliderTimer);
  sliderTimer = null;
}

if (slidesEl && dotsEl) {
  renderSlides();
  startAuto();
}

// =============================
// i18n (ES/EN) - practical bilingual
// =============================
const I18N = {
  es: {
    tagline: "Visión urbana y desarrollo estratégico",

    nav_firma: "Firma",
    nav_proyectos: "Proyectos",
    nav_experiencia: "Experiencia",
    nav_alianzas: "Alianzas",
    nav_contacto: "Contacto",

    hero_title: "Desarrollo inmobiliario estratégico en Ecuador",
    hero_subtitle: "Quito · Guayaquil · Cuenca",
    hero_btn_projects: "Ver Proyectos",
    hero_btn_invest: "Invertir",
    hero_btn_contact: "Contacto",

    firma_title: "Firma",
    firma_lead: "Somos una firma desarrolladora enfocada en planificación y ejecución de proyectos inmobiliarios estratégicos en Ecuador.",
    firma_marcela_role: "Arquitecta – Dirección Arquitectónica",
    firma_marcela_text: "Lidera el diseño y la planificación técnica de los proyectos, asegurando coherencia urbana, eficiencia espacial y alto estándar arquitectónico.",
    firma_mauricio_role: "Desarrollador Inmobiliario",
    firma_mauricio_text: "Especializado en estructuración de proyectos, análisis estratégico de suelo y desarrollo integral de activos inmobiliarios con visión de largo plazo.",

    lines_title: "Líneas de Desarrollo",
    lines_lead: "Cuatro verticales claras para atender oportunidades inmobiliarias con criterio técnico y visión estratégica.",
    line_res_title: "Proyectos Residenciales",
    line_res_text: "Vivienda con enfoque en funcionalidad, ubicación y valorización sostenible.",
    line_com_title: "Proyectos Comerciales",
    line_com_text: "Espacios comerciales estratégicos diseñados para dinamizar zonas y consolidar presencia empresarial.",
    line_ind_title: "Proyectos Industriales",
    line_ind_text: "Infraestructura logística e industrial enfocada en eficiencia operativa y expansión.",
    line_pat_title: "Proyectos Patrimoniales",
    line_pat_text: "Puesta en valor de activos históricos con criterio técnico y coherencia urbana.",
    line_cta: "Explorar proyectos",
    
res_proj1_title: "Edificio Gallardo - Tayo",
res_proj1_location: "📍 Valle de los Chillos – Quito, Ecuador",
res_proj1_status_label: "Estado:",
res_proj1_status: "Diseño - Permisos de Construcción",
res_proj1_year_label: "Año:",
res_proj1_year: "2025-2026",
res_proj1_desc: "Es un proyecto familiar con varios departamentos y locales comerciales. Se compone de 3 departamentos de 180 m2 c/u, una suite de 50 m2 y 2 locales comerciales de 16 m2 c/u. Se emplaza en un lote junto a una quebrada, que permite distribuir el proyecto desde el subsuelo. El área total de construcción es de 750 m2.",

res_proj2_title: "Edificio Fortaleza",
res_proj2_location: "📍 Carcelén Alto – Quito, Ecuador",
res_proj2_status_label: "Estado:",
res_proj2_status: "Diseño - Construcción",
res_proj2_year_label: "Año:",
res_proj2_year: "2023",
res_proj2_desc: "Este proyecto es un edificio familiar compuesto por 3 departamentos, uno por cada planta. En planta baja el departamento tiene 130 m2 y en la 1ra y 2da planta cada departamento tiene 150 m2. Además se desarrolla en subsuelo toda el área de parqueaderos privados y de visitas. En total el proyecto tiene 650 m2 de área construida.",

res_proj3_title: "Casa Bassante",
res_proj3_location: "📍 Cumbayá – Quito, Ecuador",
res_proj3_status_label: "Estado:",
res_proj3_status: "Diseño - Construcción",
res_proj3_year_label: "Año:",
res_proj3_year: "2018",
res_proj3_desc: "Es una vivienda unifamiliar implantada en un terreno de 5 lados con un área de 210 m2 sobre una cuchara. Se desarrolla en función de la morfología del terreno, el cual tiene un área de 210 m2. La casa se desarrolla en 200 m2 en dos plantas.",

res_proj4_title: "Conjunto Residencial Villa Vega",
res_proj4_location: "📍 Tumbaco – Quito, Ecuador",
res_proj4_status_label: "Estado:",
res_proj4_status: "Diseño",
res_proj4_year_label: "Año:",
res_proj4_year: "2018",
res_proj4_desc: "Proyecto residencial de 22 casas pareadas de 160 m², con diseño contemporáneo.",

res_proj5_title: "Conjunto Residencial Bosques de Olón",
res_proj5_location: "📍 Olón – Santa Elena, Ecuador",
res_proj5_status_label: "Estado:",
res_proj5_status: "Diseño",
res_proj5_year_label: "Año:",
res_proj5_year: "2018",
res_proj5_desc: "Es un complejo vacacional y de vivienda sobre la Ruta del Spondylus. Se compone por 7 bloques de departamentos y 63 unidades de vivienda en total, diseñado para integrarse con el entorno natural de la costa.",

res_proj6_title: "Suites-Ayala",
res_proj6_location: "📍 Santa Cruz – Galápagos, Ecuador",
res_proj6_status_label: "Estado:",
res_proj6_status: "Diseño e Interiorismo",
res_proj6_year_label: "Año:",
res_proj6_year: "2024",
res_proj6_desc: "Es un proyecto que tendrá el enfoque de alquiler para turistas. Se compone de 4 suites distribuidas 2 al frente y 2 al lado posterior. El ingreso está centralizado por el medio y allí distribuye a los 4 ingresos. Tiene un área de 60 m2 cada suite y en total el proyecto cubre 230 m2. No se proyecta espacios de parqueaderos pues no es permitido comúnmente el tránsito de automotores en las Islas Galápagos.",    

com_proj1_title: "Beerman Pub",
com_proj1_location_label: "Ubicación:",
com_proj1_location: "Quito, Ecuador",
com_proj1_status_label: "Estado:",
com_proj1_status: "Diseño y acondicionamiento",
com_proj1_area_label: "Área:",
com_proj1_area: "90 m² aprox.",
com_proj1_year_label: "Año:",
com_proj1_year: "2016",
com_proj1_desc: "Bar de cervecería artesanal desarrollado con enfoque urbano y experiencia de marca.",

com_proj2_title: "Hotel La Cascada",
com_proj2_location_label: "Ubicación:",
com_proj2_location: "Lago Agrio, Ecuador",
com_proj2_status_label: "Estado:",
com_proj2_status: "Diseño",
com_proj2_intervention_label: "Intervención:",
com_proj2_intervention: "Rediseño de fachada",
com_proj2_year_label: "Año:",
com_proj2_year: "2014",
com_proj2_desc: "Propuesta de renovación arquitectónica enfocada en modernización de imagen y presencia urbana.",

com_proj3_title: "Boutique Villalengua",
com_proj3_location_label: "Ubicación:",
com_proj3_location: "Quito, Ecuador",
com_proj3_status_label: "Estado:",
com_proj3_status: "Diseño-Interiorismo",
com_proj3_year_label: "Año:",
com_proj3_year: "2019",
com_proj3_desc: "Es una boutique para venta de artículos de limpieza y belleza. Se desarrolla en un área de 15m2 en un espacio construido en los años 80s y donde originalmente era un parqueadero cubierto con losa de hormigón. El proyecto mantiene conexión con la casa grande por la parte posterior.",    
patrimoniales_proj1_title: "Teatro Colegio José Julián Andrade",
patrimoniales_proj1_location: "📍 San Gabriel - Carchi, Ecuador",
patrimoniales_proj1_status_label: "Estado:",
patrimoniales_proj1_status: "Consultoría de Diseño Arquitectónico e Ingenierías",
patrimoniales_proj1_year_label: "Año:",
patrimoniales_proj1_year: "2018",
patrimoniales_proj1_desc: "Este proyecto se enfocó en elaborar una propuesta arquitectónica y de ingenierías completa, abarcando todos los detalles para rehabilitar este teatro a nivel general. Por ser un espacio de uso público se optó por mejorar con materialidad, calidad de mobiliario y equipamiento básico como tramoyas, para que fuera la base de una puesta en marcha y diversificar sus usos tanto para el colegio como para la ciudad. La propuesta acústica se nota en cada detalle como los forramientos en paredes, butacas, pisos, cielos rasos, etc. La iluminación es otro punto importante que se instauró como elemento básico de confort, el cual en la actualidad no tiene en absoluto.",

patrimoniales_proj2_title: "Museo de las Artesanías",
patrimoniales_proj2_location: "📍 San Gabriel - Carchi, Ecuador",
patrimoniales_proj2_status_label: "Estado:",
patrimoniales_proj2_status: "Restauración y Rehabilitación Patrimonial",
patrimoniales_proj2_year_label: "Año:",
patrimoniales_proj2_year: "2015",
patrimoniales_proj2_desc: "Intervención de 2 casas patrimoniales que abarcan 330 m², las cuales se unen para formar el Museo de las Artesanías, conjugando sus amplios patios posteriores y áreas interiores para lograr un espacio no solo de exposición, sino también de espacio abierto para eventos. Se reconstruyó totalmente las cubiertas, se reformuló nuevos materiales compatibles con la infraestructura existente como el gres en pisos y se respetó completamente la morfología que conservaban los muros. Se pudo trabajar con tecnologías ancestrales como muros de tapiales, adobones y paredes en bahareque.",

patrimoniales_proj3_title: "Proyecto Recoleta",
patrimoniales_proj3_location: "📍 Centro Histórico de Quito - Ecuador",
patrimoniales_proj3_status_label: "Estado:",
patrimoniales_proj3_status: "Diseño Arquitectónico - Intervención Patrimonial",
patrimoniales_proj3_year_label: "Año:",
patrimoniales_proj3_year: "2010",
patrimoniales_proj3_desc: "Intervención en inmueble patrimonial ubicado en el centro histórico de Quito, adaptando el espacio a nuevas unidades habitacionales sin perder su esencia. Esta casa mide cerca de 800 m² de construcción, data del siglo XVIII y en su momento era considerada el predio patrimonial particular más grande del centro de Quito. El rediseño arquitectónico interior priorizó dividir la vivienda en 6 unidades habitacionales donde la familia propietaria pueda acoger a sus parientes y generar futuros ingresos con espacios para renta. Dentro de la etapa constructiva se optó por intervenir de forma delicada, pero transformando cada uno de los espacios más emergentes, conservando sus detalles originales.",

cap_arch_title: "Diseño Arquitectónico Estratégico",


cap_arch_title: "Diseño Arquitectónico Estratégico",
cap_arch_text: "Desarrollo de proyectos residenciales y comerciales optimizados en normativa, eficiencia constructiva y rentabilidad.",

cap_const_title: "Dirección y Control de Construcción",
cap_const_text: "Gestión técnica integral enfocada en control de costos, calidad y cumplimiento de cronograma.",

cap_dev_title: "Desarrollo y Estructuración Inmobiliaria",
cap_dev_text: "Identificación y estructuración de oportunidades inmobiliarias desde el análisis de suelo hasta la ejecución final.",

cap_arch_b1: "Diseño conceptual y ejecutivo",
cap_arch_b2: "Optimización de metros vendibles",
cap_arch_b3: "Diseño eficiente y sostenible",
cap_arch_b4: "Coordinación técnica integral",

cap_const_b1: "Supervisión técnica especializada",
cap_const_b2: "Control presupuestario",
cap_const_b3: "Optimización de recursos",
cap_const_b4: "Gestión de contratistas",

cap_dev_b1: "Análisis de viabilidad financiera",
cap_dev_b2: "Estructuración de inversión",
cap_dev_b3: "Desarrollo por etapas",
cap_dev_b4: "Gestión estratégica del proyecto",  

    exp_title: "Experiencia Técnica",
    exp_lead: "Sección práctica para subir proyectos de diseño y construcción progresivamente.",
    exp_design_title: "Diseño Arquitectónico",
    exp_design_text: "Proyectos de diseño y colaboración con otros arquitectos.",
    exp_build_title: "Dirección y Construcción",
    exp_build_text: "Proyectos ejecutados o dirigidos técnicamente.",

    all_title: "Alianzas Estratégicas",
    all_lead: "Invitación profesional a inversionistas y socios para conocer oportunidades y proyectos.",
    all_box_title: "Conversemos sobre oportunidades",
    all_box_text: "Promovemos proyectos bajo criterios técnicos y planificación estructurada. Si busca invertir o asociarse, contáctenos para recibir información.",
    all_btn: "Solicitar información",

    contact_title: "Contacto",
    contact_lead: "Complete el formulario y nos comunicaremos con usted.",
    f_name: "Nombre completo",
    f_phone: "Teléfono",
    f_email: "Correo",
    f_city: "Ciudad de interés",
    city_quito: "Quito",
    city_gye: "Guayaquil",
    city_cuenca: "Cuenca",
    city_other: "Otra",
    f_interest: "Tipo de interés",
    i_buy: "Compra de propiedad",
    i_invest: "Inversión",
    i_partner: "Asociación estratégica",
    f_msg: "Mensaje",
    f_submit: "Enviar",

    contact_box_title: "Canales directos",
    contact_box_city: "Ciudades:",
    contact_box_email: "Email:",
    contact_box_phone: "Teléfono:",
    models_title: "Modelos de Vivienda",
    
models_lead: "Inspírate con nuestros diseños pensados para cada estilo de vida.",
style_contemporary: "Estilo Contemporáneo",
style_modern: "Estilo Moderno",
style_rustic: "Estilo Rústico",
consult_style: "Consultar este estilo",
    
  },

  en: {
    tagline: "Urban Vision & Strategic Development",

    nav_firma: "Firm",
    nav_proyectos: "Projects",
    nav_experiencia: "Experience",
    nav_alianzas: "Partnerships",
    nav_contacto: "Contact",

    hero_title: "Strategic Real Estate Development in Ecuador",
    hero_subtitle: "Quito · Guayaquil · Cuenca",
    hero_btn_projects: "View Projects",
    hero_btn_invest: "Invest",
    hero_btn_contact: "Contact",

    firma_title: "Firm",
    firma_lead: "We are a development firm focused on planning and delivering strategic real estate projects in Ecuador.",
    firma_marcela_role: "Architect – Architectural Lead",
    firma_marcela_text: "Leads architectural design and technical planning, ensuring urban coherence, spatial efficiency and high standards.",
    firma_mauricio_role: "Real Estate Developer",
    firma_mauricio_text: "Specialized in real state project structuring, strategic land analysis and value-driven development with a long-term investment perspective.",

    lines_title: "Development Lines",
    lines_lead: "Four development areas addressing real estate opportunities with technical criteria and strategic vision.",

    line_res_title: "Residential Projects",
    line_res_text: "Residential developments focused on functionality, location and long-term value.",

    line_com_title: "Commercial Projects",
    line_com_text: "Strategic commercial spaces designed to activate urban areas and strengthen business presence.",

    line_ind_title: "Industrial Projects",
    line_ind_text: "Industrial and logistics infrastructure focused on operational efficiency and scalability.",

    line_pat_title: "Heritage Projects",
    line_pat_text: "Enhancing historic assets with technical criteria and urban coherence.",

    line_cta: "Explore projects",

 res_proj1_title: "Gallardo - Tayo Building",
res_proj1_location: "📍 Valle de los Chillos – Quito, Ecuador",
res_proj1_status_label: "Status:",
res_proj1_status: "Design - Construction Permits",
res_proj1_year_label: "Year:",
res_proj1_year: "2025-2026",
res_proj1_desc: "This is a family-oriented mixed-use project with several apartments and commercial units. It consists of 3 apartments of 180 m2 each, one 50 m2 suite, and 2 commercial spaces of 16 m2 each. It is located on a lot next to a ravine, which allows the project to be distributed from the basement level. The total construction area is 750 m2.",

res_proj2_title: "Fortaleza Building",
res_proj2_location: "📍 Carcelén Alto – Quito, Ecuador",
res_proj2_status_label: "Status:",
res_proj2_status: "Design - Construction",
res_proj2_year_label: "Year:",
res_proj2_year: "2023",
res_proj2_desc: "This project is a family residential building made up of 3 apartments, one on each floor. On the ground floor, the apartment has 130 m2, while on the first and second floors each apartment has 150 m2. The basement level contains the private and visitor parking area. In total, the project has 650 m2 of built area.",

res_proj3_title: "Bassante House",
res_proj3_location: "📍 Cumbayá – Quito, Ecuador",
res_proj3_status_label: "Status:",
res_proj3_status: "Design - Construction",
res_proj3_year_label: "Year:",
res_proj3_year: "2018",
res_proj3_desc: "This is a single-family house set on a five-sided lot with an area of 210 m2 on a spoon-shaped site. It was developed according to the morphology of the land, which has an area of 210 m2. The house is developed in 200 m2 over two floors.",

res_proj4_title: "Villa Vega Residential Complex",
res_proj4_location: "📍 Tumbaco – Quito, Ecuador",
res_proj4_status_label: "Status:",
res_proj4_status: "Design",
res_proj4_year_label: "Year:",
res_proj4_year: "2018",
res_proj4_desc: "Residential project of 22 semi-detached houses of 160 m², with contemporary design.",

res_proj5_title: "Bosques de Olón Residential Complex",
res_proj5_location: "📍 Olón – Santa Elena, Ecuador",
res_proj5_status_label: "Status:",
res_proj5_status: "Design",
res_proj5_year_label: "Year:",
res_proj5_year: "2018",
res_proj5_desc: "This is a vacation and residential complex located on the Ruta del Spondylus. It consists of 7 apartment blocks and 63 residential units in total, designed to integrate with the natural coastal surroundings.",

res_proj6_title: "Ayala Suites",
res_proj6_location: "📍 Santa Cruz – Galápagos, Ecuador",
res_proj6_status_label: "Status:",
res_proj6_status: "Design and Interior Design",
res_proj6_year_label: "Year:",
res_proj6_year: "2024",
res_proj6_desc: "This project is intended for tourist rental use. It consists of 4 suites distributed with 2 at the front and 2 at the rear. The main entrance is centralized in the middle and distributes access to all 4 units. Each suite has an area of 60 m2 and the total project covers 230 m2. Parking spaces are not planned, since the transit of motor vehicles is generally not permitted in the Galápagos Islands.",   

com_proj1_title: "Beerman Pub",
com_proj1_location_label: "Ubicación:",
com_proj1_location: "Quito, Ecuador",
com_proj1_status_label: "Estado:",
com_proj1_status: "Diseño y acondicionamiento",
com_proj1_area_label: "Área:",
com_proj1_area: "90 m² aprox.",
com_proj1_year_label: "Año:",
com_proj1_year: "2016",
com_proj1_desc: "Bar de cervecería artesanal desarrollado con enfoque urbano y experiencia de marca.",

com_proj2_title: "Hotel La Cascada",
com_proj2_location_label: "Ubicación:",
com_proj2_location: "Lago Agrio, Ecuador",
com_proj2_status_label: "Estado:",
com_proj2_status: "Diseño",
com_proj2_intervention_label: "Intervención:",
com_proj2_intervention: "Rediseño de fachada",
com_proj2_year_label: "Año:",
com_proj2_year: "2014",
com_proj2_desc: "Propuesta de renovación arquitectónica enfocada en modernización de imagen y presencia urbana.",

com_proj3_title: "Boutique Villalengua",
com_proj3_location_label: "Ubicación:",
com_proj3_location: "Quito, Ecuador",
com_proj3_status_label: "Estado:",
com_proj3_status: "Diseño-Interiorismo",
com_proj3_year_label: "Año:",
com_proj3_year: "2019",
com_proj3_desc: "Es una boutique para venta de artículos de limpieza y belleza. Se desarrolla en un área de 15m2 en un espacio construido en los años 80s y donde originalmente era un parqueadero cubierto con losa de hormigón. El proyecto mantiene conexión con la casa grande por la parte posterior.",    
patrimoniales_proj1_title: "José Julián Andrade School Theater",
patrimoniales_proj1_location: "📍 San Gabriel - Carchi, Ecuador",
patrimoniales_proj1_status_label: "Status:",
patrimoniales_proj1_status: "Architectural and Engineering Design Consulting",
patrimoniales_proj1_year_label: "Year:",
patrimoniales_proj1_year: "2018",
patrimoniales_proj1_desc: "This project focused on developing a complete architectural and engineering proposal, covering every detail required to rehabilitate the theater as a whole. As it is a public-use space, the proposal aimed to improve materials, furniture quality, and basic equipment such as stage rigging, creating the basis for reopening the venue and diversifying its uses for both the school and the city. The acoustic proposal is reflected in every detail, including wall cladding, seating, flooring, and ceilings. Lighting was also introduced as a key comfort element, which the theater currently lacks entirely.",

patrimoniales_proj2_title: "Museum of Handicrafts",
patrimoniales_proj2_location: "📍 San Gabriel - Carchi, Ecuador",
patrimoniales_proj2_status_label: "Status:",
patrimoniales_proj2_status: "Heritage Restoration and Rehabilitation",
patrimoniales_proj2_year_label: "Year:",
patrimoniales_proj2_year: "2015",
patrimoniales_proj2_desc: "This intervention involved two heritage houses totaling 330 m², which were joined to create the Museum of Handicrafts, combining their large rear courtyards and interior areas to achieve not only an exhibition space but also an open area for events. The roofs were fully rebuilt, new materials compatible with the existing structure were introduced, such as stoneware flooring, and the original morphology of the walls was fully respected. Traditional construction techniques such as rammed earth walls, adobe blocks, and bahareque walls were also preserved and incorporated.",

patrimoniales_proj3_title: "Recoleta Project",
patrimoniales_proj3_location: "📍 Quito Historic Center - Ecuador",
patrimoniales_proj3_status_label: "Status:",
patrimoniales_proj3_status: "Architectural Design - Heritage Intervention",
patrimoniales_proj3_year_label: "Year:",
patrimoniales_proj3_year: "2010",
patrimoniales_proj3_desc: "Intervention in a heritage property located in Quito’s historic center, adapting the space into new housing units without losing its essence. This house has nearly 800 m² of built area, dates back to the 18th century, and at one point was considered the largest privately owned heritage property in downtown Quito. The interior architectural redesign prioritized dividing the house into six housing units so the owning family could accommodate relatives and generate future income through rental spaces. During the construction phase, the intervention was carried out carefully, transforming the most critical spaces while preserving the original details.",
    cap_title: "Technical Capabilities and Real Estate Development",
cap_text: "Strategic integration between architectural design, technical management and real estate development.",

cap_arch_title: "Strategic Architectural Design",
cap_arch_text: "Development of residential and commercial projects optimized for regulations, construction efficiency and profitability.",

cap_const_title: "Construction Management and Control",
cap_const_text: "Integrated technical management focused on cost control, quality and schedule compliance.",

cap_dev_title: "Real Estate Development and Structuring",
cap_dev_text: "Identification and structuring of real estate opportunities from land analysis to project execution.",

   cap_arch_b1: "Conceptual and executive design",
cap_arch_b2: "Optimization of sellable area",
cap_arch_b3: "Efficient and sustainable design",
cap_arch_b4: "Integrated technical coordination",

cap_const_b1: "Specialized technical supervision",
cap_const_b2: "Budget control",
cap_const_b3: "Resource optimization",
cap_const_b4: "Contractor management",

cap_dev_b1: "Financial feasibility analysis",
cap_dev_b2: "Investment structuring",
cap_dev_b3: "Phased development",
cap_dev_b4: "Strategic project management",

cap_arch_b1: "Conceptual and executive design",
cap_arch_b2: "Optimization of sellable area",
cap_arch_b3: "Efficient and sustainable design",
cap_arch_b4: "Integrated technical coordination",

cap_const_b1: "Specialized technical supervision",
cap_const_b2: "Budget control",
cap_const_b3: "Resource optimization",
cap_const_b4: "Contractor management",

cap_dev_b1: "Financial feasibility analysis",
cap_dev_b2: "Investment structuring",
cap_dev_b3: "Phased development",
cap_dev_b4: "Strategic project management",
    
    exp_title: "Technical Experience",
    exp_lead: "A practical section to upload design and construction projects progressively.",
    exp_design_title: "Architectural Design",
    exp_design_text: "Design projects and collaborations with other architects.",
    exp_build_title: "Construction & Technical Direction",
    exp_build_text: "Executed projects or technically directed works.",

    all_title: "Strategic Partnerships",
    all_lead: "A professional invitation for investors and partners to learn about opportunities and projects.",
    all_box_title: "Let’s discuss opportunities",
    all_box_text: "We promote projects backed by technical planning and structured execution. If you want to invest or partner, contact us to receive information.",
    all_btn: "Request information",

    contact_title: "Contact",
    contact_lead: "Complete the form and we will reach out to you.",
    f_name: "Full name",
    f_phone: "Phone",
    f_email: "Email",
    f_city: "City of interest",
    city_quito: "Quito",
    city_gye: "Guayaquil",
    city_cuenca: "Cuenca",
    city_other: "Other",
    f_interest: "Interest type",
    i_buy: "Property acquisition",
    i_invest: "Investment",
    i_partner: "Strategic partnership",
    f_msg: "Message",
    f_submit: "Send",

    contact_box_title: "Direct channels",
    contact_box_city: "Cities:",
    contact_box_email: "Email:",
    contact_box_phone: "Phone:",
    models_title: "Home Models",
    
models_lead: "Explore our home designs tailored to every lifestyle.",
style_contemporary: "Contemporary Style",
style_modern: "Modern Style",
style_rustic: "Rustic Style",
consult_style: "Explore this style",
  }
};

const dict= I18N;

let currentLang = "es";
const langES = document.getElementById("langES");
const langEN = document.getElementById("langEN");

function applyLang(lang){
  currentLang = lang;
  document.documentElement.lang = lang;

  langES?.setAttribute("aria-pressed", String(lang === "es"));
  langEN?.setAttribute("aria-pressed", String(lang === "en"));

  const dict = I18N[lang];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
}

const savedLang = localStorage.getItem("lang") || "es";

langES?.addEventListener("click", () => {
  localStorage.setItem("lang", "es");
  applyLang("es");
});

langEN?.addEventListener("click", () => {
  localStorage.setItem("lang", "en");
  applyLang("en");
});

applyLang(savedLang);

// =============================
// Contact form behavior (practical)
// - Default: uses mailto fallback (no backend)
// - If you want: Formspree / Netlify Forms (instructions below)
// =============================
const contactForm = document.getElementById("contactForm");
const formHint = document.getElementById("formHint");

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(contactForm);
  const name = encodeURIComponent(data.get("name") || "");
  const phone = encodeURIComponent(data.get("phone") || "");
  const email = encodeURIComponent(data.get("email") || "");
  const city = encodeURIComponent(data.get("city") || "");
  const interest = encodeURIComponent(data.get("interest") || "");
  const message = encodeURIComponent(data.get("message") || "");

  const subject = encodeURIComponent("Contacto desde ARQA-GRUPO INMOBILIARIO");
  const body = encodeURIComponent(
    `Nombre: ${decodeURIComponent(name)}\n` +
    `Teléfono: ${decodeURIComponent(phone)}\n` +
    `Correo: ${decodeURIComponent(email)}\n` +
    `Ciudad: ${decodeURIComponent(city)}\n` +
    `Interés: ${decodeURIComponent(interest)}\n\n` +
    `Mensaje:\n${decodeURIComponent(message)}\n`
  );

  // Mailto fallback (simple and works on most devices)
  const to = "contacto@arqagrupoinmobiliario.com.ec";
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

  formHint.textContent = (currentLang === "es")
    ? "Se abrió su correo para enviar el mensaje. Si no se abre, escríbanos por WhatsApp."
    : "Your email client was opened to send the message. If it doesn’t open, message us on WhatsApp.";
});
