import App from "./App.jsx";
import React from "react";
// import ReactDom from "react-dom/client"
import ReactDOM from "react-dom";


// const root = ReactDom.createRoot(document.getElementById("root"));
// root.render(<App />)

// let root = null;
// let domRoot = null;
//
// // 子应用的入口生命周期
// export async function bootstrap() {
//     console.log('react app bootstraped');
// }
//
// /**
//  * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
//  */
// export async function mount(props) {
//     if (domRoot) {
//         domRoot.render(<App />);
//         return;
//     }
//     root = props.container ? props.container.querySelector('#childRoot') : document.getElementById('childRoot')
//     domRoot = ReactDom.createRoot(root)
//     domRoot.render(<App />)
// }
//
// /**
//  * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
//  */
// export async function unmount(props) {
//     // root.removeChild(root.children[0]);
//     console.log("卸载啦")
// }


export async function bootstrap() {
    console.log('react app bootstraped');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
    ReactDOM.render(<App />, props.container ? props.container.querySelector('#childRoot') : document.getElementById('childRoot'));
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
    ReactDOM.unmountComponentAtNode(
        // 注意此处的id选择器不能和主应用里的一样
        props.container ? props.container.querySelector('#childRoot') : document.getElementById('childRoot'),
    );
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
    console.log('update props', props);
}

// 独立运行时：
if (!window.__POWERER_BY_QIANKUN__) {
    mount({});
}

