const electron = require('electron');  // 控制应用生命周期的模块。
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;  // 创建原生浏览器窗口的模块
// const Menu = electron.Menu;
// const dialog = electron.dialog;

// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function() {
  // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
  // 应用会保持活动状态
  if (!isDarwin()) {
    app.quit();
    // TODO 但这样做有个问题：在OSX上关闭程序后，再次点击就无法重新打开应用了，后续要考虑如何处理这个问题
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
  mainWindow = new BrowserWindow({width: 800, height: 600, defaultEncoding: 'utf-8'});

  // 加载应用的 index.html
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // 打开开发工具
  // mainWindow.openDevTools();

  // 当 window 被关闭，这个事件会被发出
  mainWindow.on('closed', function() {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 但这次不是。
    mainWindow = null;
    app.quit();
  });
});

/**
 * 判断是否为OSX系统
 * @returns {boolean}
 */
function isDarwin() {
    return process.platform == 'darwin';
}

// var template = [{
//     label: '编辑',
//     submenu: [{
//         label: '打开目录',
//         accelerator: 'CmdOrCtrl+N',
//         click: function (item, focusedWindow) {
//             // api: https://electronjs.org/docs/api/dialog
//             console.log(dialog.showOpenDialog({properties: ['openFile', 'openDirectory']}))
//         }
//     },{
//         label: '撤销',
//         accelerator: 'CmdOrCtrl+Z',
//         role: 'undo'
//     }, {
//         label: '重做',
//         accelerator: 'Shift+CmdOrCtrl+Z',
//         role: 'redo'
//     }, {
//         type: 'separator'
//     }, {
//         label: '剪切',
//         accelerator: 'CmdOrCtrl+X',
//         role: 'cut'
//     }, {
//         label: '复制',
//         accelerator: 'CmdOrCtrl+C',
//         role: 'copy'
//     }, {
//         label: '粘贴',
//         accelerator: 'CmdOrCtrl+V',
//         role: 'paste'
//     }, {
//         label: '全选',
//         accelerator: 'CmdOrCtrl+A',
//         role: 'selectall'
//     }]
// }, {
//     label: '查看',
//     submenu: [{
//         label: '重载',
//         accelerator: 'CmdOrCtrl+R',
//         click: function (item, focusedWindow) {
//             if (focusedWindow) {
//                 // 重载之后, 刷新并关闭所有的次要窗体
//                 if (focusedWindow.id === 1) {
//                     BrowserWindow.getAllWindows().forEach(function (win) {
//                         if (win.id > 1) {
//                             win.close()
//                         }
//                     })
//                 }
//                 focusedWindow.reload()
//             }
//         }
//     }, {
//         label: '切换全屏',
//         accelerator: (function () {
//             if (process.platform === 'darwin') {
//                 return 'Ctrl+Command+F'
//             } else {
//                 return 'F11'
//             }
//         })(),
//         click: function (item, focusedWindow) {
//             if (focusedWindow) {
//                 focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
//             }
//         }
//     }, {
//         label: '切换开发者工具',
//         accelerator: (function () {
//             if (process.platform === 'darwin') {
//                 return 'Alt+Command+I'
//             } else {
//                 return 'Ctrl+Shift+I'
//             }
//         })(),
//         click: function (item, focusedWindow) {
//             if (focusedWindow) {
//                 focusedWindow.toggleDevTools()
//             }
//         }
//     }, {
//         type: 'separator'
//     }, {
//         label: '应用程序菜单演示',
//         click: function (item, focusedWindow) {
//             if (focusedWindow) {
//                 const options = {
//                     type: 'info',
//                     title: '应用程序菜单演示',
//                     buttons: ['好的'],
//                     message: '此演示用于 "菜单" 部分, 展示如何在应用程序菜单中创建可点击的菜单项.'
//                 }
//                 electron.dialog.showMessageBox(focusedWindow, options, function () {})
//             }
//         }
//     }]
// }, {
//     label: '窗口',
//     role: 'window',
//     submenu: [{
//         label: '最小化',
//         accelerator: 'CmdOrCtrl+M',
//         role: 'minimize'
//     }, {
//         label: '关闭',
//         accelerator: 'CmdOrCtrl+W',
//         role: 'close'
//     }, {
//         type: 'separator'
//     }, {
//         label: '重新打开窗口',
//         accelerator: 'CmdOrCtrl+Shift+T',
//         enabled: false,
//         key: 'reopenMenuItem',
//         click: function () {
//             app.emit('activate')
//         }
//     }]
// }, {
//     label: '帮助',
//     role: 'help',
//     submenu: [{
//         label: '学习更多',
//         click: function () {
//             electron.shell.openExternal('http://electron.atom.io')
//         }
//     }]
// }]