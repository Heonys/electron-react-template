const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback) => ipcOn("statistics", callback),
  getStaticData: () => ipcInvoke("getStaticData"),
} satisfies Window["electron"]);

function ipcInvoke<Channel extends keyof EventPayloadMapping>(
  channel: Channel
): Promise<EventPayloadMapping[Channel]> {
  return ipcRenderer.invoke(channel);
}

function ipcOn<Channel extends keyof EventPayloadMapping>(
  channel: Channel,
  listener: (payload: EventPayloadMapping[Channel]) => void
) {
  const callback = (_: Electron.IpcRendererEvent, payload: EventPayloadMapping[Channel]) => {
    return listener(payload);
  };
  ipcRenderer.on(channel, callback);
  return () => ipcRenderer.off(channel, callback);
}
