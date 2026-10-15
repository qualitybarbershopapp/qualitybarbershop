# 💈 Quality Barber Shop — MVP & Replica Full-Stack

> Réplica de alta fidelidad y MVP funcional de **[Quality Barber Shop](https://qualitybarbershop.cesagencia.co/)**, ubicada en Dosquebradas, Risaralda.  
> Incluye catálogo completo de servicios (cortes, barbas, combos, marcaciones, uñas/manicura y paquetes VIP), productos, equipo de barberos/manicuristas, sistema dinámico de reservas en tiempo real y portal de consulta de citas.

---

## 🚀 Tecnologías y Arquitectura de Software

### 1. ¿Qué tecnologías usa la página web original?
Tras analizar minuciosamente los encabezados HTTP, bundles de cliente (`_next/static/chunks`), Server Components (RSC) y endpoints de API, la página web original está construida con:

* **Frontend:**
  * **Next.js (App Router + Turbopack):** Server Components y Client Components con hidratación selectiva.
  * **React 19:** Manejo de estado moderno y suspense boundaries.
  * **Tailwind CSS:** Diseño responsivo con paleta oscura de lujo (*Dark Luxury Barber*), bordes dorados, efectos aurora (`.aurora-blob`) y tipografías personalizadas:
    * **Kaushan Script:** Para el logotipo cursivo (*"Quality"*).
    * **Oswald:** Tipografía condensada en mayúsculas para títulos, números y precios.
    * **Inter:** Tipografía legible y limpia para textos y menús.
  * **Lucide React:** Iconografía vectorial estilizada.
  * **LocalStorage Persistence:** Llaves `qbs-booking-draft` (borrador de reserva) y `qbs-datos-cliente` (datos personales guardados para agilizar futuras reservas).

* **Backend & Servidor:**
  * **Next.js Route Handlers / Serverless Functions:** 
    * `GET /api/booking`: Cálculo de intervalos disponibles de 10 minutos según duración del servicio y horario laboral.
    * `POST /api/booking`: Procesamiento de reservas y prevención de colisiones horarias.
    * `POST /api/mis-citas`: Búsqueda de citas vigentes e históricas por teléfono o correo.
    * `GET /api/agenda/date-blocks`: Días bloqueados o festivos por barbero.
  * **Zona Horaria Estricta:** `America/Bogota` (Colombia UTC-5) para validar apertura (7:20 a.m. – 8:00 p.m.) y descartar horas pasadas en el día en curso.
  * **Notificaciones:** Integración de confirmación SMS/WhatsApp.

* **Infraestructura y Hosting:**
  * **Vercel Edge Network:** Cabeceras `Server: Vercel`, `X-Vercel-Cache: HIT`, `X-Nextjs-Prerender`.
  * **Base de datos:** Compatible con Supabase PostgreSQL, Prisma/Neon, o almacenamiento en memoria/JSON para desarrollo local ágil.

---

### 2. ¿Por qué esta arquitectura es la más conveniente?
1. **Next.js + Tailwind + TypeScript:**
   * Es el estándar líder de la industria para aplicaciones web interactivas con renderizado híbrido (SSR/SSG), excelente SEO local y carga instantánea.
   * Unifica Frontend y Backend en un solo repositorio sin necesidad de desplegar y mantener un servidor backend separado.
2. **Confirmación Inteligente por WhatsApp (Mejora clave):**
   * El envío de SMS mediante pasarelas como Twilio cuesta entre $0.05 y $0.08 USD por mensaje en Colombia.
   * En este MVP implementamos la confirmación directa y automática por **WhatsApp**, prellenando un mensaje con todos los datos de la cita dirigido al barbero asignado o al contacto oficial de la barbería. ¡Costo $0 y tasa de apertura de casi el 100%!
3. **Persistencia Dual (Zero-Config local + escalable a PostgreSQL):**
   * Funciona inmediatamente al clonar el repositorio sin necesidad de configurar Docker ni bases de datos complejas en tu máquina, permitiendo pruebas instantáneas.
   * Fácilmente conectable a Supabase / Neon / Prisma para producción.

---

## 📦 Características del MVP

* [x] **Diseño Visual Idéntico:** Paleta de colores Dark & Gold, fuentes Oswald/Kaushan Script/Inter, atmósfera de barbería clásica y divisor tradicional (*Barber Pole Stripe*).
* [x] **Flujo Completo de Reserva (Wizard en 5 Pasos):**
  1. **Selección de Servicio:** Cortes, barbas, combos, adicionales, uñas (16 servicios) y combos VIP con checklist de beneficios.
  2. **Selección de Barbero:** Filtrado inteligente según el servicio (los barberos atienden cabello/barba; las manicuristas atienden uñas) o *"Cualquiera disponible"*.
  3. **Calendario Interactivo:** Vista mensual con bloqueo automático de domingos y días pasados.
  4. **Selector de Horas:** Bloques de 10 minutos calculados dinámicamente según la duración total del servicio y citas ya reservadas.
  5. **Datos del Cliente y Confirmación:** Nombre, WhatsApp/teléfono, correo y notas, con guardado automático en `localStorage`.
* [x] **Portal "Mis Citas":** Modal para consultar citas próximas y pasadas mediante teléfono o correo, con enlace directo para contactar al profesional.
* [x] **Catálogo de Productos:** Cuidado capilar, de barba y lociones con fotos originales de marcas (Nativo's, TecnoStylo, Kirkland, Lacoste, etc.) y botón de consulta por WhatsApp.
* [x] **Equipo y Barberos:** Tarjetas con foto, llamada directa telefónica, chat directo por WhatsApp y botón *"Reservar con él/ella"*.
* [x] **Reseñas y Ubicación:** Integración con Google Maps, calificación 5.0 estrellas e iframe interactivo.
* [x] **Modal para Compartir:** Botón para copiar enlace o compartir por WhatsApp con un solo clic.

---

## 🛠️ Instalación y Ejecución Local

### Prerrequisitos
* Node.js v18+ o v20+ / v22+
* npm, pnpm o yarn

### Pasos
```bash
# 1. Clonar el repositorio
git clone <URL_DE_TU_REPOSITORIO>
cd quality-barbershop

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

Abre en tu navegador: [http://localhost:3000](http://localhost:3000)

### Compilación para Producción
```bash
npm run build
npm run start
```

---

## 📁 Estructura del Proyecto

```
quality-barbershop/
├── public/                 # Imágenes y assets originales descargados (logos, fotos de barberos, productos)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── agenda/date-blocks/route.ts  # Endpoint de bloqueos de agenda
│   │   │   ├── booking/route.ts             # Endpoint GET (horarios) y POST (crear cita)
│   │   │   └── mis-citas/route.ts           # Endpoint POST (consultar citas de usuario)
│   │   ├── globals.css     # Variables CSS de lujo, paleta gold/dark, aurora y divisores
│   │   ├── layout.tsx      # Configuración de Google Fonts (Oswald, Kaushan, Inter) y metadata
│   │   └── page.tsx        # Página principal de la barbería
│   ├── components/
│   │   ├── Header.tsx      # Barra superior, navegación y botones de acción
│   │   ├── Hero.tsx        # Portada principal con imagen de fondo y CTA
│   │   ├── Servicios.tsx   # Menú de precios, acordeón de uñas y paquetes VIP
│   │   ├── Condiciones.tsx # Normas de agendamiento
│   │   ├── Productos.tsx   # Vitrina interactiva de productos y lociones
│   │   ├── Barberos.tsx    # Tarjetas del equipo profesional con contacto
│   │   ├── Resenas.tsx     # Calificación 5.0 Google Maps
│   │   ├── Beneficios.tsx  # Ventajas del servicio
│   │   ├── Ubicacion.tsx   # Mapa de Google Maps y botón de cómo llegar
│   │   ├── Footer.tsx      # Pie de página y redes sociales
│   │   ├── BookingModal.tsx   # Wizard modal interactivo de reservas en 5 pasos
│   │   ├── MisCitasModal.tsx  # Portal de clientes para consultar citas
│   │   └── CompartirModal.tsx # Modal de recomendación y compartir
│   ├── context/
│   │   └── BookingContext.tsx # Estado global de reserva y datos del cliente
│   ├── data/
│   │   └── barbershop-data.ts # Datos fidedignos de servicios, barberos y productos
│   └── lib/
│       ├── booking-utils.ts   # Cálculo de horarios, calendario y zona horaria Colombia
│       └── storage.ts         # Motor de persistencia de citas
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🌐 Despliegue en la Nube (Vercel)

1. Sube este proyecto a tu repositorio de **GitHub**.
2. Entra en [vercel.com](https://vercel.com) e inicia sesión con GitHub.
3. Haz clic en **"Add New..."** -> **"Project"** y selecciona tu repositorio `quality-barbershop`.
4. Deja la configuración por defecto (Next.js es detectado automáticamente).
5. Haz clic en **"Deploy"**. En 60 segundos tendrás tu barbería en línea con certificado SSL gratuito.

---

## 📄 Licencia y Créditos
Diseñado y desarrollado como réplica y MVP de arquitectura moderna para **Quality Barber Shop**.
