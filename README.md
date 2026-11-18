# Quartz v5

> “[One] who works with the door open gets all kinds of interruptions, but [they] also occasionally gets clues as to what the world is and what might be important.” — Richard Hamming

Quartz is a set of tools that helps you publish your [digital garden](https://jzhao.xyz/posts/networked-thought) and notes as a website for free.

🔗 Read the documentation and get started: https://quartz.jzhao.xyz/

[Join the Discord Community](https://discord.gg/cRFFHYye7t)

## Arkeo Ficta en Owlbear Rodeo

Esta integración adapta la extensión de [Quartz Library](https://github.com/ddotts/quartz-library)
para consultar la wiki y compartir páginas dentro de una sala de Owlbear Rodeo.
Después de publicar estos cambios, añade esta dirección en **Extensions** de tu
perfil de Owlbear:

```text
https://bhkonnen.github.io/ArkeoFicta/static/owlbear/manifest.json
```

Activa **Arkeo Ficta** en la sala y abre su panel. Tanto el GM como los jugadores
pueden navegar por la wiki, usar su buscador y pulsar **Compartir página**. Cada
persona navega de forma independiente; compartir no cambia la página de los demás.

Todos reciben una notificación, incluso con el panel cerrado. Para leer la página,
abre el panel y pulsa **Abrir página compartida**. La notificación se cierra solo
para esa persona cuando la página termina de cargar; abrir el panel no la cierra.
Abrir la última página compartida también cierra sus notificaciones anteriores.
Si llega otra página mientras se carga la anterior, la nueva notificación permanece.

La sala conserva únicamente la última dirección y su título, disponibles para
quienes se incorporen más tarde o vuelvan a abrir el panel. El punto del icono
indica que hay una página compartida disponible. El contenido y las contraseñas
de páginas cifradas no se envían a Owlbear; cada lector sigue necesitando su
contraseña. Los enlaces compartidos omiten los parámetros de consulta de la URL.

### Desarrollo y comprobación

```sh
npm ci
npm run install-plugins
npx tsc --noEmit
npx tsx --test quartz/owlbear/*.test.ts
npx quartz build --serve
```

La vista previa está en `http://localhost:8080/static/owlbear/panel` y permite
navegar sin simular una sala. La interfaz del panel mide 600 × 700. Para probar
la instalación local, utiliza una copia temporal del manifiesto con las direcciones
del servidor local. En el servidor de Quartz, usa las rutas sin extensión
`/static/owlbear/panel` y `/static/owlbear/background` para evitar redirecciones
que pierdan los parámetros del SDK. Las direcciones publicadas mantienen `.html`
para GitHub Pages. La vista previa no sustituye una prueba en una sala real.

`quartz/static/owlbear/` contiene el manifiesto, HTML y CSS. El emisor `Owlbear`,
registrado en `quartz.ts`, empaqueta `quartz/owlbear/integration.ts` y el SDK
en `public/static/owlbear/integration.js` durante la compilación normal. El flujo
de publicación existente incluye estos archivos sin pasos adicionales.

Al cambiar de dominio o ruta de publicación, actualiza las direcciones absolutas
del manifiesto junto con `configuration.baseUrl` en `quartz.config.yaml`. Al
publicar una versión de la extensión, actualiza su versión y los parámetros `v`
del manifiesto y de los scripts de ambos archivos HTML. Los metadatos y mensajes
usan el espacio de nombres `io.github.bhkonnen.arkeoficta`, independiente del de
Quartz Library.

Para verificar en una sala real: comparte desde un jugador y desde el GM con
el panel del otro cerrado; confirma que las notificaciones permanecen al abrir
el panel y se cierran solo para quien abre la página compartida. Comprueba también
la navegación independiente, la reapertura del panel y una nueva página compartida
mientras se carga la anterior.

Consulta el [formato del manifiesto de Owlbear](https://docs.owlbear.rodeo/extensions/reference/manifest/)
y su [API de mensajes](https://docs.owlbear.rodeo/extensions/apis/broadcast/).
La extensión no solicita permisos adicionales en el manifiesto.

## Sponsors

<p align="center">
  <a href="https://github.com/sponsors/jackyzha0">
    <img src="https://cdn.jsdelivr.net/gh/jackyzha0/jackyzha0/sponsorkit/sponsors.svg" />
  </a>
</p>
