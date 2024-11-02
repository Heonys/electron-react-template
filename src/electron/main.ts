import { app, BrowserWindow } from "electron";
import path from "path";

const isDev = !app.isPackaged;

function createWindow() {
  const mainWindow = new BrowserWindow({});

  if (isDev) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
}

app.whenReady().then(createWindow);
