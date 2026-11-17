---
publish: true
aliases:
  - Inicio
  - Wiki de campaña
created: 2026-02-08T17:05:38.362Z
modified: 2026-11-12T11:54:39.271Z
published: 2026-11-12T11:54:39.271Z
tags:
  - meta/home
---

# Ellea — Wiki de campaña

> [!abstract] Bienvenida a Ellea
> Punto de entrada para el mundo, sus pueblos, sus historias y las aventuras que lo atraviesan. Usa las rutas de abajo para explorar o crear una nota nueva con una etiqueta que describa qué es.

## Explorar el mundo

| Área | Punto de partida | TOPIC TAG habitual |
| --- | --- | --- |
| Historia y mitos | [[HISTORIA PRIMORDIA]] · [[Y así terminó el universo]] · [[Recuerdos y Ruinas del Albedrío]] | `historia` |
| Geografía y lugares | [[Principados y Princesas del Albedrío]] | `geobiologia` |
| Pueblos y personajes | [[Los Djvati]] · [[Las Kjeres]] · [[Los Mirmidones Rojos]] | `sociedad` |
| Magia y cosmología | [[Fatum Trinitae - guías del más allá]] · [[Las Lágrimas de Wën]] | `magia` |
| Lenguas y culturas | [[DVATI LANGUAGUE]] · [[Hodos Trimelgue]] | `sociedad` o `conocimientos` |
| Consulta rápida | [[Glosario y desambiguaciones]] | `conocimientos` |

## ARKE FICTA ENTRIES

![[ARKE FICTA ENTRIES.base#Todas las entradas]]

> [!info] Cómo entra una nota en la Base
> Una nota aparece en la Base cuando tiene la propiedad `topic`. No hace falta moverla de carpeta. Copia este encabezado al crear o migrar una entrada:
>
> ```yaml
> ---
> resumen: Una frase que explique qué aporta la nota.
> topic: historia
> multi_tag:
>   - mitologia-y-leyendas
> campana:
>   - ellea-base
> acceso: privado
> timeline:
> ---
> ```
>
> La cronología se registra ahora en notas de evento mediante [[EVENTOS.base]]. No añadas fechas al campo `timeline` de una entrada: relaciónala con su nota de evento mediante `related_entries`.

## PERSONAJES

![[PERSONAJES.base#Todos los personajes]]

> [!info] Cómo entra una nota en la Base de personajes
> Una nota aparece en la Base cuando tiene la propiedad `character_type`. Copia este encabezado al crear o migrar un personaje:
>
> ```yaml
> ---
> character_type: player-character
> estado_vital: vivo
> related_groups:
>   - "[[Nombre del grupo]]"
> related_events:
>   - "[[Nombre del evento]]"
> related_entries:
>   - "[[Nombre de la entrada]]"
> ---
> ```
>
> `related_groups`, `related_events` y `related_entries` admiten varios enlaces Wikilink. Déjalas vacías si aún no hay relaciones que registrar.

## LOCALIZACIONES

![[LOCALIZACIONES.base#Todas las localizaciones]]

> [!info] Cómo entra una nota en la Base de localizaciones
> Una localización aparece en la Base cuando tiene la propiedad `location_type`. Para los lugares del mundo, mantiene también `topic: geobiologia`: ambas propiedades se complementan, no compiten. `topic` clasifica el contenido; `location_type` y `parent_location` lo sitúan en la jerarquía.
>
> Copia este encabezado al crear o migrar una localización:
>
> ```yaml
> ---
> resumen: Una frase que sitúe o describa el lugar.
> topic: geobiologia
> location_type: city
> parent_location: "[[Mar del Albedrío]]"
> ---
> ```
>
> `parent_location` admite un único enlace Wikilink: la localización que contiene directamente a esta. Las localizaciones raíz no llevan esta propiedad.

## Taxonomía de localizaciones

| Campo | Valores controlados / formato |
| --- | --- |
| `location_type` | `plane`, `planet`, `continent`, `region`, `city` |
| `parent_location` | Un único enlace Wikilink a la localización superior: `"[[Nombre del lugar]]"` |

> [!example] Jerarquía de ejemplo
> `[[Ellea]]` → `[[Primordia]]` → `[[Mar del Albedrío]]` → `[[Iserb]]`
>
> Cada nota enlaza solo a su contenedor directo: `Primordia` usa `parent_location: "[[Ellea]]"`, `Mar del Albedrío` usa `"[[Primordia]]"` e `Iserb` usa `"[[Mar del Albedrío]]"`. El tipo se asigna según la escala que corresponda a cada nota.

| Campo | Valores controlados / formato |
| --- | --- |
| `group_type` | `religious`, `political`, `commercial`, `criminal`, `military`, `scholarly`, `social`, `other` |
| `related_characters` | Lista de Wikilinks a personajes |
| `related_events` | Lista de Wikilinks a eventos |
| `related_entries` | Lista de Wikilinks a otras entradas |
| `location` | Un único Wikilink a la localización principal |

> [!tip] Criterio para `group_type`
> La lista parte de las organizaciones ya documentadas: órdenes religiosas, organizaciones políticas, compañías y redes comerciales, y bandas criminales. Usa el tipo que describa su función principal; `other` queda para casos que no encajen aún sin crear una categoría improvisada.

## EVENTOS

![[EVENTOS.base#Cronología]]

> [!info] Cómo entra una nota en la Base de eventos
> La Base de eventos es el documento de cronología: una nota aparece al tener `event_type`. Cada evento se fecha con el calendario de Ellea, separado en era, año, mes y día; no utiliza una fecha gregoriana.
>
> ```yaml
> ---
> event_type: conflict
> calendar_era: primera-era
> calendar_year: 1
> calendar_month: 1
> calendar_day: 1
> related_characters:
>   - "[[Nombre del personaje]]"
> related_groups:
>   - "[[Nombre del grupo]]"
> related_entries:
>   - "[[Nombre de la entrada]]"
> location: "[[Nombre de la localización]]"
> ---
> ```
>
> Las propiedades `related_*` admiten varios Wikilinks. `location` indica el escenario principal del evento y admite un único Wikilink.

## Calendario y taxonomía de eventos

| Campo | Valores controlados / formato |
| --- | --- |
| `event_type` | `conflict`, `agreement`, `founding`, `birth-death`, `religious`, `disaster`, `other` |
| `calendar_era` | `mitica`, `primera-era`, `segunda-era`, `tercera-era` |
| `calendar_year` | Entero desde `1`; se reinicia a `1` al comenzar cada era |
| `calendar_month` | Entero de `1` a `9` |
| `calendar_day` | Entero de `1` a `40` |
| `related_characters` | Lista de Wikilinks a personajes |
| `related_groups` | Lista de Wikilinks a grupos u organizaciones |
| `related_entries` | Lista de Wikilinks a otras entradas |
| `location` | Un único Wikilink a la localización principal |

> [!tip] Orden de la cronología
> Un año tiene 9 meses de 40 días (4 semanas de 10 días por mes): 360 días. La Base calcula un orden cronológico a partir de era, año, mes y día; por eso los años pueden reiniciarse al pasar de era sin romper la línea temporal. Las fechas incompletas se ordenan al principio de su año; usa la precisión máxima que conozcas.

## Taxonomía de personajes

| Campo | Valores controlados / formato |
| --- | --- |
| `character_type` | `player-character`, `major`, `minor` |
| `estado_vital` | `vivo`, `muerto`, `historico`, `desconocido` |
| `related_groups` | Lista de enlaces Wikilink a grupos: `"[[Nombre del grupo]]"` |
| `related_events` | Lista de enlaces Wikilink a eventos: `"[[Nombre del evento]]"` |
| `related_entries` | Lista de enlaces Wikilink a otras entradas: `"[[Nombre de la entrada]]"` |

> [!tip] Reglas de clasificación
>
> - `character_type` es obligatorio y contiene un solo valor: `player-character`, `major` o `minor`.
> - `estado_vital` es obligatorio: usa `vivo`, `muerto`, `historico` para figuras de una época pasada o `desconocido` cuando no se sepa.
> - Las tres propiedades `related_*` son opcionales y admiten varios enlaces Wikilink.
> - El nombre del personaje es el título de la nota y aparece en la columna **Personaje** de la Base.

## Taxonomía de ARKE FICTA

| Campo         | Valores controlados                                                                                                                                                                                                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `topic`       | `historia`, `sociedad`, `geobiologia`, `conocimientos`, `magia`, `miscelaneo`                                                                                                                                                                                                                                |
| `multi_topic` | `ciencia-y-tecnologia`, `culturas-y-lenguas`, `libros-y-documentos`, `mitologia-y-leyendas`, `religiones-e-ideologias`, `familias-y-nobles`, `organizaciones`, `fauna-y-flora`, `geografia-fisica`, `geografia-politica`, `sitios-de-interes`, `mapas`, `objetos`, `hechizos`, `efectos`, `teorias`, `otros` |
| `campana`     | `gondoa`, `albedrio`, `oneshot`, `ellea-base`                                                                                                                                                                                                                                                                |
| `acceso`      | `publico`, `privado`                                                                                                                                                                                                                                                                                         |
| `timeline`    | La cronología narrativa se construye en [[EVENTOS.base]] a partir de `calendar_era`, `calendar_year`, `calendar_month` y `calendar_day`.                                                                                                                                                                     |
|               |                                                                                                                                                                                                                                                                                                              |

> [!tip] Reglas de clasificación
>
> - `topic` es obligatorio y contiene **un solo** tema principal.
> - Las notas que representen localizaciones deben usar además `location_type` y, salvo las raíces, `parent_location`. Normalmente tendrán `topic: geobiologia`, por lo que aparecerán tanto en Arke Ficta como en la Base de localizaciones.
> - `multi_tag` y `campana` admiten varios valores; úsalos cuando añadan información real, no por rutina.
> - `acceso` es obligatorio: usa `privado` hasta decidir que una nota puede compartirse.
> - `timeline` deja de ser el lugar donde se escriben fechas: crea o vincula una nota de evento en [[EVENTOS.base]], que es la fuente de la cronología.
>
> Estas propiedades son las “etiquetas” de la Base: se comportan como los campos Select y Multi-select de Notion, pero permanecen en cada nota y no dependen de la carpeta donde esté guardada.

> [!example] Lectura del sistema de carpetas actual
>
> - **Historia:** `WORBUILDING HISTORIA-LORE` y parte de `LORENA CONJUNTA`.
> - **Sociedad:** `WORBUILDING GENTE`, `PERSONAJES Y PROTAGONISTAS` y política/cultura de otras carpetas.
> - **Geobiología:** `WORBUILDING GEOGRÁFICO-AMPLIO` y `WORBUILDING LOCALIZACIONES`.
> - **Conocimientos:** `WORBUILDING CONOCIMIENTOS`, `CONCEPTOS Y DESANVIGUACIONES` y `CALENDARIOS FECHAS`.
> - **Magia:** `WORBUILDING MAGIA` y los elementos mágicos de `WORBUILDING DETALLES`.
> - **Misceláneo:** recursos, tablas y notas híbridas que no encajen limpiamente en lo anterior.
>
> Las carpetas pasan a ser solo una procedencia inicial: la clasificación final la determinan estas propiedades, que permiten que una misma nota tenga varios `multi_tag` y campañas.
