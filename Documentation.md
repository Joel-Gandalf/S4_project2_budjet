# HISTORIAS DE USUARIO — PROJECTE BUDGET

Documento de Análisis Funcional: historias de usuario organizadas por épica, con criterios de aceptación y escenarios Gherkin asociados.

**Nivel de jerarquía de este documento:** Épica → User Story → Criterios de aceptación → Gherkin.
El siguiente escalón (tarjetas técnicas de Kanban, ligadas a ramas de Git) se desarrollará en un documento posterior.

---

## ÉPICA 1 — Creación personalizada de presupuestos (Nivel 1)

### US-01 — Selección y cálculo dinámico de servicios

**Como** cliente potencial, **quiero** marcar los servicios que me interesan y ver el precio total actualizarse al instante, **para** saber cuánto me costaría sin tener que esperar respuesta comercial.

**Criterios de aceptación:**
- [ ] Al marcar el checkbox de un servicio, su precio se suma al total mostrado en pantalla.
- [ ] Al desmarcarlo, su precio se resta del total.
- [ ] Se pueden marcar varios servicios a la vez (SEO, Ads y Web simultáneamente).
- [ ] Si no hay ningún servicio marcado, el total muestra 0€.

**Gherkin:**
```gherkin
Escenario: Marcar un servicio suma su precio al total
  Dado que el precio total mostrado es 0€
  Cuando marco el checkbox del servicio "SEO"
  Entonces el precio total mostrado debe ser 300€

Escenario: Desmarcar un servicio resta su precio del total
  Dado que el servicio "SEO" está marcado y el total es 300€
  Cuando desmarco el checkbox del servicio "SEO"
  Entonces el precio total mostrado debe ser 0€

Escenario: Marcar varios servicios simultáneamente
  Dado que el precio total mostrado es 0€
  Cuando marco los servicios "SEO" y "Ads"
  Entonces el precio total mostrado debe ser 700€
```

---

### US-02 — Configurador del servicio Web

**Como** cliente potencial, **quiero** ajustar el número de páginas e idiomas de mi web al seleccionar el servicio Web, **para** pagar solo por la configuración que realmente necesito.

**Criterios de aceptación:**
- [ ] Al marcar el servicio Web, aparece el configurador con valores iniciales predeterminados. *(Pendiente de confirmar con el cliente el valor exacto — por definir: 1 página / 1 idioma, según hipótesis a validar)*
- [ ] El precio total se recalcula automáticamente aplicando la fórmula: `500€ + (páginas + idiomas) × 30€`.
- [ ] No se puede reducir el número de páginas ni de idiomas por debajo de 1.
- [ ] Si se desmarca el servicio Web, el configurador desaparece y su coste deja de sumarse al total.
- [ ] Junto a los campos "Número de páginas" y "Número de idiomas" hay un icono de información que, al activarse (clic o foco de teclado), muestra un texto explicando el coste de cada unidad adicional (30€ cada una).
- [ ] *(Mejora UX propuesta)* Junto al configurador se muestra el coste parcial del servicio Web (ej. "620€"), calculado a partir de la base más páginas e idiomas, para que el cliente vea de un vistazo cuánto suma esta parte concreta sin tener que distinguirla mentalmente dentro del total general del presupuesto.

**Gherkin:**
```gherkin
Escenario: Configurar páginas e idiomas actualiza el precio
  Dado que el servicio "Web" está marcado con 1 página y 1 idioma
  Cuando incremento el número de páginas a 2
  Entonces el precio total mostrado debe ser 620€

Escenario: No se puede bajar de 1 página o idioma
  Dado que el servicio "Web" está marcado con 1 página y 1 idioma
  Cuando intento decrementar el número de páginas por debajo de 1
  Entonces el número de páginas se mantiene en 1

Escenario: Desmarcar el servicio Web oculta el configurador
  Dado que el servicio "Web" está marcado y configurado con 2 páginas y 3 idiomas
  Cuando desmarco el servicio "Web"
  Entonces el configurador deja de mostrarse
  Y el coste del servicio Web deja de sumarse al total

Escenario: Mostrar información de ayuda sobre el coste por idioma
  Dado que el servicio "Web" está marcado
  Cuando activo el icono de información junto a "Número de idiomas"
  Entonces se muestra un texto indicando que cada idioma adicional cuesta 30€

Escenario: Mostrar el subtotal del servicio Web
  Dado que el servicio "Web" está marcado con 1 página y 3 idiomas
  Entonces se muestra un coste parcial de 620€ junto al configurador
```

---

## ÉPICA 2 — Generación del presupuesto (Nivel 1)

### US-03 — Generación de presupuesto con datos del cliente

**Como** cliente potencial, **quiero** introducir mis datos personales y generar un resumen de mi presupuesto en una única vista, **para** ver el detalle completo de lo que he seleccionado antes de decidir.

**Criterios de aceptación:**
- [ ] El formulario de datos personales solo es interactuable si se ha seleccionado al menos un servicio.
- [ ] El botón "Generar presupuesto" permanece deshabilitado hasta que todos los campos obligatorios del formulario (nombre y apellidos, correo electrónico, teléfono) son válidos.
- [ ] Al hacer clic en el botón, se muestra una vista única con: servicios seleccionados, su configuración (páginas/idiomas si aplica), desglose de costes, precio total y datos del cliente.
- [ ] Al generarse, el presupuesto recibe un identificador único que lo distingue de cualquier otro presupuesto guardado (este identificador se reutilizará después en el histórico y en la URL de compartición).
- [ ] Si algún campo del formulario no es válido (ej. email mal formado), se muestra un mensaje de error específico junto al campo, sin bloquear el resto del formulario.

**Gherkin:**
```gherkin
Escenario: El formulario está bloqueado sin servicios seleccionados
  Dado que no hay ningún servicio marcado
  Entonces el formulario de datos personales no es interactuable

Escenario: El botón de generar permanece deshabilitado con datos incompletos
  Dado que he marcado el servicio "SEO"
  Y he rellenado solo el campo "Nombre"
  Entonces el botón "Generar presupuesto" está deshabilitado

Escenario: Generar el presupuesto con datos válidos
  Dado que he marcado el servicio "SEO" y "Ads"
  Y he rellenado correctamente nombre, email y teléfono
  Cuando pulso el botón "Generar presupuesto"
  Entonces se muestra una vista con los servicios seleccionados, el total (700€) y mis datos personales

Escenario: Email con formato inválido muestra error
  Dado que he marcado el servicio "SEO"
  Cuando introduzco "cliente@" en el campo de email
  Entonces se muestra un mensaje de error junto al campo de email
  Y el botón "Generar presupuesto" permanece deshabilitado

Escenario: El presupuesto generado recibe un identificador único
  Dado que he marcado el servicio "SEO"
  Y he rellenado correctamente nombre, email y teléfono
  Cuando pulso el botón "Generar presupuesto"
  Entonces el presupuesto guardado tiene asignado un identificador único
```

---

## ÉPICA 3 — Consulta de histórico (Nivel 2)

### US-04 — Visualización del listado de presupuestos generados

**Como** miembro del equipo comercial, **quiero** ver un listado de todos los presupuestos generados, **para** tener un registro accesible sin depender de otros canales (email, notas sueltas, etc.).

**Criterios de aceptación:**
- [ ] El listado muestra, por cada presupuesto: nombre del cliente, email, teléfono, servicios contratados, total y fecha.
- [ ] Cada entrada del listado enlaza a la vista de detalle de ese presupuesto concreto.
- [ ] Si no hay ningún presupuesto generado todavía, se muestra un mensaje indicándolo (no una lista vacía sin explicación).

**Gherkin:**
```gherkin
Escenario: Mostrar el listado con presupuestos existentes
  Dado que existen 2 presupuestos generados
  Cuando accedo a la vista de histórico
  Entonces se muestran las 2 entradas con nombre, servicios y total

Escenario: Listado vacío muestra mensaje explicativo
  Dado que no existe ningún presupuesto generado
  Cuando accedo a la vista de histórico
  Entonces se muestra un mensaje indicando que aún no hay presupuestos
```

---

### US-05 — Búsqueda de presupuestos por nombre de cliente

**Como** miembro del equipo comercial, **quiero** buscar un presupuesto por el nombre del cliente en el histórico, **para** encontrar rápidamente su información sin revisar toda la lista.

**Criterios de aceptación:**
- [ ] El campo de búsqueda filtra la lista mientras se escribe.
- [ ] La búsqueda no distingue mayúsculas/minúsculas.
- [ ] Si no hay coincidencias, se muestra un mensaje indicándolo (no una lista vacía sin explicación).

**Gherkin:**
```gherkin
Escenario: Buscar un cliente existente
  Dado que existen los presupuestos de "Ona Costa" y "Joan Farrés"
  Cuando escribo "Joan" en el campo de búsqueda
  Entonces solo se muestra el presupuesto de "Joan Farrés"

Escenario: Búsqueda sin distinguir mayúsculas
  Dado que existe el presupuesto de "Joan Farrés"
  Cuando escribo "joan" en el campo de búsqueda
  Entonces se muestra el presupuesto de "Joan Farrés"

Escenario: Búsqueda sin resultados
  Dado que existen los presupuestos de "Ona Costa" y "Joan Farrés"
  Cuando escribo "Marc" en el campo de búsqueda
  Entonces se muestra un mensaje indicando que no hay resultados
```

---

### US-06 — Ordenación del histórico

**Como** miembro del equipo comercial, **quiero** ordenar el listado de presupuestos por fecha, importe o nombre, **para** localizar información según el criterio que me interese en cada momento (ej. los más recientes, o los de mayor importe).

**Criterios de aceptación:**
- [ ] El listado se puede ordenar por: fecha, importe (total) y nombre del cliente.
- [ ] Al seleccionar un criterio de orden, la lista se reordena inmediatamente sin recargar la página.
- [ ] El criterio de orden activo es visible para la persona usuaria (ej. resaltado o icono de flecha).

**Gherkin:**
```gherkin
Escenario: Ordenar por importe
  Dado que existen presupuestos con totales de 400€ y 760€
  Cuando selecciono ordenar por "Import"
  Entonces el presupuesto de 760€ aparece antes que el de 400€ (orden descendente)

Escenario: Ordenar por nombre
  Dado que existen los presupuestos de "Ona Costa" y "Joan Farrés"
  Cuando selecciono ordenar por "Nom"
  Entonces "Joan Farrés" aparece antes que "Ona Costa" (orden alfabético)

Escenario: Buscar y ordenar combinados
  Dado que existen varios presupuestos que coinciden con "Ona"
  Y están ordenados por "Import"
  Cuando escribo "Ona" en el buscador
  Entonces los resultados filtrados mantienen el orden por importe
```

---

## ÉPICA 4 — Compartición del presupuesto (Nivel 3)

### US-07 — URL única para consultar el presupuesto

**Como** cliente potencial, **quiero** obtener una URL única de mi presupuesto ya generado, **para** poder consultarlo o compartirlo más adelante sin tener que repetir el proceso.

**Criterios de aceptación:**
- [ ] La URL de consulta se construye a partir del identificador único que el presupuesto ya recibió al ser generado (ver US-03), sin necesidad de asignarle uno nuevo.
- [ ] Existe una URL con ese identificador que muestra la vista de detalle del presupuesto (servicios, configuración, desglose, total y datos del cliente).
- [ ] Acceder a esa URL no requiere haber generado el presupuesto en esa misma sesión/dispositivo (debe funcionar también si se abre en otro navegador).
- [ ] Si el identificador de la URL no corresponde a ningún presupuesto existente, se muestra un mensaje de error claro (no una pantalla en blanco).

**Gherkin:**
```gherkin
Escenario: Acceder a un presupuesto mediante su URL única
  Dado que existe un presupuesto generado con identificador "abc123"
  Cuando accedo a la URL correspondiente a "abc123"
  Entonces se muestra la vista de detalle de ese presupuesto

Escenario: URL con identificador inexistente
  Dado que no existe ningún presupuesto con identificador "xyz999"
  Cuando accedo a la URL correspondiente a "xyz999"
  Entonces se muestra un mensaje de error indicando que el presupuesto no existe
```

---

### US-08 — (Bonus) Exportación del presupuesto a PDF

**Como** cliente potencial, **quiero** descargar mi presupuesto en formato PDF, **para** guardarlo o reenviarlo por otros medios (email, WhatsApp) sin depender de tener acceso a internet en ese momento.

**Criterios de aceptación:**
- [ ] Desde la vista de detalle del presupuesto hay un botón "Descargar PDF".
- [ ] El PDF generado incluye la misma información que la vista de detalle: servicios, configuración, desglose de costes, total y datos del cliente.
- [ ] El nombre del archivo descargado identifica el presupuesto (ej. incluye el nombre del cliente o el identificador único).

**Gherkin:**
```gherkin
Escenario: Descargar el presupuesto en PDF
  Dado que estoy en la vista de detalle de un presupuesto generado
  Cuando pulso el botón "Descargar PDF"
  Entonces se descarga un archivo PDF con el desglose completo del presupuesto
```

---

## HISTORIA TRANSVERSAL — Futura / opcional (no incluida en el MVP)

### US-09 — Accesibilidad de los iconos de ayuda (tooltips)

**Como** persona usuaria con lector de pantalla o que navega por teclado, **quiero** que cualquier icono de ayuda (ⓘ) sea accesible y anunciado correctamente, **para** poder entender la información sin depender del ratón.

> **Nota:** esta historia queda marcada como mejora futura/opcional. Para el MVP, la accesibilidad básica del tooltip ya queda cubierta como criterio de aceptación dentro de US-02. Esta historia formalizaría un compromiso de accesibilidad transversal a toda la aplicación, no solo al configurador Web.

**Criterios de aceptación (borrador, a desarrollar si se decide abordarla):**
- [ ] Todo icono de ayuda tiene un atributo `aria-label` o `aria-describedby` describiendo su función.
- [ ] El tooltip se puede abrir y cerrar mediante teclado (Enter/Espacio para abrir, Esc para cerrar).
- [ ] El foco del teclado se gestiona correctamente al abrir y cerrar el tooltip (no se pierde ni salta a un lugar inesperado).

**Gherkin (borrador):**
```gherkin
Escenario: Abrir un tooltip de ayuda con teclado
  Dado que el icono de ayuda tiene el foco de teclado
  Cuando pulso la tecla "Enter"
  Entonces se muestra el texto de ayuda correspondiente

Escenario: Cerrar un tooltip con la tecla Escape
  Dado que un tooltip de ayuda está abierto
  Cuando pulso la tecla "Esc"
  Entonces el tooltip se cierra
  Y el foco vuelve al icono de ayuda que lo abrió
```

---

## Resumen de trazabilidad Épica → Historia

| Épica | Historias |
|---|---|
| Épica 1 — Creación personalizada de presupuestos | US-01, US-02 |
| Épica 2 — Generación del presupuesto | US-03 |
| Épica 3 — Consulta de histórico | US-04, US-05, US-06 |
| Épica 4 — Compartición del presupuesto | US-07, US-08 (bonus) |
| Transversal (futuro/opcional) | US-09 |

---

## Nota — Requisitos técnicos del briefing que NO son historias de usuario

El briefing menciona dos requisitos que, tras revisión, se descartan deliberadamente de este documento por no aportar valor directo a ningún rol de usuario (no cumplen el criterio *Value* de INVEST):

- **Backend ligero / persistencia de datos** (*"Backend lleuger amb base de dades... opcionalment json server o local storage"*).
- **Despliegue en servidor o plataforma** (*"Desplegament a servidor o plataforma"*).

Ambos son trabajo de infraestructura necesario para que las historias de usuario funcionen, pero no son historias en sí mismas. Se abordarán como tarjetas técnicas con prefijo `[SETUP]` en el desglose del tablero Kanban (probablemente de las primeras, ya que varias historias —US-03, US-04, US-07— dependen de que exista un sitio donde guardar y recuperar presupuestos).
