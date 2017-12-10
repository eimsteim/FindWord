const electron = require('electron');  // 控制应用生命周期的模块。
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;  // 创建原生浏览器窗口的模块
// const Menu = electron.Menu;
// const dialog = electron.dialog;

// Can not through the electron-builder check
//app.dock.setIcon('file://' + __dirname + '/app_icon.png');


// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;

function createWindow() {

    mainWindow = new BrowserWindow({width: 800, height: 600, defaultEncoding: 'utf-8'})
    // 加载应用的 index.html
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // 当 window 被关闭，这个事件会被发出
    mainWindow.on('closed', function() {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 但这次不是。
        mainWindow = null;
        //app.quit();
    });

}

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function() {
  // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
  // 应用会保持活动状态
  if (!isDarwin()) {
    app.quit();
  }
});

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', function() {

  // if (isDarwin()) {
    //menu = Menu.buildFromTemplate(template);
    //Menu.setApplicationMenu(menu);
  // }

  // 创建浏览器窗口。
  createWindow();

  // 打开开发工具
  // mainWindow.openDevTools();

});

app.on('activate', function () {
    // 在 macOS 上，当点击 dock 图标并且该应用没有打开的窗口时，
    // 绝大部分应用会重新创建一个窗口。
    //TODO 这样做其实还是有问题的，比如无法保存APP状态，只能重新加载首页
    if (mainWindow === null) {
        createWindow();
    }
});

/**
 * 判断是否为OSX系统
 * @returns {boolean}
 */
function isDarwin() {
    return process.platform == 'darwin';
}