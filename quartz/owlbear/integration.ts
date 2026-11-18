import OBR from "@owlbear-rodeo/sdk"
import {
  OPENED_PAGE_CHANNEL,
  readSharedPage,
  SHARED_PAGE_KEY,
  wikiPageUrl,
  type SharedPage,
} from "./sharedPage"

const siteRoot = new URL("../../", location.href)
const frame = document.querySelector<HTMLIFrameElement>("#wiki")
const share = document.querySelector<HTMLButtonElement>("#share")
const open = document.querySelector<HTMLButtonElement>("#open-shared")
const status = document.querySelector<HTMLElement>("#status")

function report(message: string) {
  if (status) status.textContent = message
  else console.error(message)
}

async function start() {
  let shared: SharedPage | undefined
  let observedChange = false
  const notifications: { shareId: string; notification: Promise<string> }[] = []
  if (!frame) {
    const connectionId = await OBR.player.getConnectionId()
    OBR.broadcast.onMessage(OPENED_PAGE_CHANNEL, (event) => {
      if (event.connectionId !== connectionId) return
      const index = notifications.findIndex((notice) => notice.shareId === event.data)
      if (index === -1) return
      // Opening a newer share also clears notices for the pages it replaced.
      // Keep any share that arrived while this page was loading.
      for (const notice of notifications.splice(0, index + 1)) {
        void notice.notification
          .then((id) => OBR.notification.close(id))
          .catch(() => report("No se pudo cerrar la notificación de la página compartida."))
      }
    })
  }
  const receive = (metadata: Record<string, unknown>, notify: boolean) => {
    const next = readSharedPage(metadata[SHARED_PAGE_KEY], siteRoot)
    const changed = next?.id !== shared?.id
    shared = next
    if (open) {
      open.disabled = !shared
      open.title = shared?.title ?? "Todavía no se ha compartido ninguna página"
    }
    if (frame) {
      if (changed && shared) report(`Página compartida: ${shared.title}`)
    } else if (changed) {
      void OBR.action.setBadgeText(shared ? "•" : undefined).catch(() => {
        report("No se pudo actualizar el indicador de la wiki.")
      })
      if (notify && shared) {
        const notification = OBR.notification.show(
          `Wiki: ${shared.title}. Pulsa Abrir página compartida en Arkeo Ficta para leerla.`,
          "INFO",
        )
        notifications.push({ shareId: shared.id, notification })
        void notification.catch(() =>
          report("No se pudo mostrar la notificación de la página compartida."),
        )
      }
    }
  }
  OBR.room.onMetadataChange((metadata) => {
    observedChange = true
    receive(metadata, true)
  })
  const metadata = await OBR.room.getMetadata()
  if (!observedChange) receive(metadata, false)

  let opening: SharedPage | undefined
  frame?.addEventListener("load", () => {
    if (!opening) return
    try {
      if (frame.contentWindow?.location.href !== opening.url) return
    } catch {
      return // An external link may finish loading before the requested wiki page.
    }
    const openedId = opening.id
    opening = undefined
    void OBR.broadcast
      .sendMessage(OPENED_PAGE_CHANNEL, openedId, { destination: "LOCAL" })
      .catch(() =>
        report(
          "La página se ha abierto, pero no se pudo cerrar su notificación. Intenta abrirla de nuevo.",
        ),
      )
  })
  open?.addEventListener("click", () => {
    if (shared && frame) {
      opening = shared
      frame.src = shared.url
    }
  })
  share?.addEventListener("click", () => {
    void (async () => {
      share.disabled = true
      try {
        const current = frame?.contentWindow
        const url = current && wikiPageUrl(current.location.href, siteRoot)
        if (!url) throw new Error("Abre una página de la wiki antes de compartirla.")
        const page: SharedPage = {
          id: crypto.randomUUID(),
          url: url.href,
          title: (current.document.title || "Wiki de Arkeo Ficta").slice(0, 200),
        }
        if (page.url.length > 2048)
          throw new Error("La dirección de esta página es demasiado larga para compartirla.")
        await OBR.room.setMetadata({ [SHARED_PAGE_KEY]: page })
        report(`Compartida con el grupo: ${page.title}`)
      } catch (error) {
        report(
          error instanceof Error
            ? error.message
            : "No se pudo compartir esta página. Inténtalo de nuevo.",
        )
      } finally {
        share.disabled = false
      }
    })()
  })
  if (share) {
    share.hidden = false
    share.disabled = false
  }
  if (status && !shared) report("Explora la wiki o abre la última página compartida con el grupo.")
}

if (OBR.isAvailable) {
  OBR.onReady(() => {
    void start().catch(() =>
      report("No se pudo conectar con la sala. Vuelve a abrir Arkeo Ficta para reintentarlo."),
    )
  })
} else {
  report("Vista previa. Abre esta extensión en Owlbear Rodeo para compartir páginas.")
}
