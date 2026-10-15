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

## 🗄️ 1. Configuración de Supabase (Base de Datos PostgreSQL)

Supabase proporciona la base de datos PostgreSQL en la nube para guardar las citas y clientes de forma permanente.

### Pasos para configurar Supabase:
1. Entra a [supabase.com](https://supabase.com) y crea una cuenta gratuita.
2. Haz clic en **"New Project"**, dale un nombre (ej. `quality-barbershop`) y asigna una contraseña segura a tu base de datos. Elige la región más cercana (ej. `East US` o `São Paulo`).
3. Una vez creado el proyecto, ve al menú lateral izquierdo y entra en **SQL Editor**.
4. Haz clic en **"New Query"**, copia y pega todo el contenido de [`supabase/schema.sql`](file:///c:/backup%20D/Desktop/DevMak3/quality-barbershop/supabase/schema.sql) y haz clic en **Run**.
   * Esto creará automáticamente la tabla `appointments`, sus índices de búsqueda rápida y las políticas de seguridad (RLS).
5. Ve a **Project Settings** (icono de engranaje) -> **API**.
6. Copia los siguientes valores:
   * **Project URL** (ej. `https://xyzcompany.supabase.co`)
   * **anon public key** (llave pública para el cliente)
   * **service_role key** (llave secreta para el backend)
7. Añade estas 3 variables a tu `.env.local` (para desarrollo local) o a las plataformas de despliegue (Vercel / Render):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-public-key
   SUPABASE_SERVICE_ROLE_KEY=tu-service-role-secret-key
   ```

---

## ⚡ 2. Despliegue en Vercel (Recomendado para Next.js)

Vercel es la plataforma creada por los creadores de Next.js; ofrece la mejor velocidad, renderizado en el Edge y certificado SSL automático.

### Pasos para desplegar en Vercel:
1. Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. En el panel principal, haz clic en **"Add New..."** -> **"Project"**.
3. Busca tu repositorio `qualitybarbershopapp/qualitybarbershop` y haz clic en **"Import"**.
4. En la sección **"Environment Variables"**, agrega las variables de Supabase:
   * `NEXT_PUBLIC_SUPABASE_URL` = `https://tu-proyecto.supabase.co`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `tu-anon-key`
   * `SUPABASE_SERVICE_ROLE_KEY` = `tu-service-role-key`
5. Haz clic en **"Deploy"**.
6. En menos de 60 segundos tu barbería estará funcionando en una URL pública `https://qualitybarbershop.vercel.app` (puedes vincularle tu propio dominio personalizado en **Settings -> Domains**).

---

## ☁️ 3. Despliegue en Render (Alternativa Cloud)

Render permite alojar la aplicación como un Web Service Node.js en su capa gratuita o de pago.

### Opción A: Despliegue con Blueprint (`render.yaml` incluido)
1. Ve a [dashboard.render.com](https://dashboard.render.com) e inicia sesión con GitHub.
2. Haz clic en **"New +"** -> **"Blueprint"**.
3. Conecta el repositorio `qualitybarbershopapp/qualitybarbershop`.
4. Render detectará automáticamente el archivo `render.yaml`.
5. Rellena las variables de entorno de Supabase que te solicite en pantalla y haz clic en **"Apply"**.

### Opción B: Despliegue Manual como Web Service
1. En Render Dashboard, haz clic en **"New +"** -> **"Web Service"**.
2. Conecta `qualitybarbershopapp/qualitybarbershop`.
3. Configura los siguientes campos:
   * **Runtime:** `Node`
   * **Build Command:** `npm install && npm run build`
   * **Start Command:** `npm run start`
   * **Instance Type:** `Free`
4. En **Environment Variables**, añade:
   * `NODE_VERSION` = `20`
   * `NEXT_PUBLIC_SUPABASE_URL` = `https://tu-proyecto.supabase.co`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `tu-anon-key`
   * `SUPABASE_SERVICE_ROLE_KEY` = `tu-service-role-key`
5. Haz clic en **"Create Web Service"**.

---

## 📄 Licencia y Créditos
Diseñado y desarrollado como réplica y MVP de arquitectura moderna para **Quality Barber Shop**.
