export function pushDataLayerEvent(event: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}
