import { importHTML } from "./import-html";

let _apps = [];
export const getApps = () => _apps;

// 注册微应用
export const registerMicroApps = (apps) => {
    _apps = apps;
    console.log(apps);
}

function handleRouter(handler) {

    // 处理路有变化
    handler()
}

function matchApp() {
    // 处理 "/"匹配...
    if (window.location.pathname === "/") return;

    // 二：匹配子应用
    const currentPath = window.location.pathname;
    // 去匹配列表里的activeRule
    const apps = getApps();
    const app = apps.find(item => item.activeRule.startsWith(currentPath));
    console.log(app);
    return app;
}

 function handleRouteChange() {
    handleRouter(async () => {
        const app = matchApp()

        // 请求资源：html、css、js
        if (app) {
            console.log("app", app);

            // // 渲染到container中，但是此时JS、css等文件没有请求
            // // script标签不会执行
            const container = document.querySelector(app.container);
            // container.innerHTML = html;
            const {template, getExternalScripts, execScripts} = await importHTML(app.entry);
            // 请求script：eval、new Function
            container.appendChild(template);
            const appExports = await execScripts()
            app.boostrap = appExports.bootstrap;
            app.mount = appExports.mount;
            app.unmount = appExports.unmount;
            await bootstrap(app);
            await mount(app);
        }
    })
}

// 微前端运行原理:
// 1. 监视路由变化
// 2. 匹配子应用
// 3. 加载子应用
// 4. 渲染子应用
export const start = () => {
    window.__POWERED_BY_QIANKUN__ = true;
    // 1. hash模式: hashchange
    // 2. history模式：popstate
    //     history.go 使用popstate
    //     history.pushstate
    window.addEventListener("popstate", () => {
        handleRouteChange();
    })
    const rawPushState = window.history.pushState;
    // 重写pushstate
    window.history.pushState = (...args) => {
        rawPushState.apply(window.history, args);
        handleRouteChange();
    }
    // 重写replaceState
    const rawReplaceState = window.history.replaceState;
    // 重写pushstate
    window.history.replaceState = (...args) => {
        rawReplaceState.apply(window.history, args);
        handleRouteChange();
    }

    window.addEventListener("hashchange", () => {
        handleRouteChange();
    })

    // 初始匹配一次
    handleRouteChange();
}

async function bootstrap(app) {
    app.bootstrap && (await app.bootstrap());
}

async function mount(app) {
    app.mount && (await app.mount({
        container: document.querySelector(app.container)
    }));
}

async function unmount(app) {
    app.unmount && (await app.unmount());
}
