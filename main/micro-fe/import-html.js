export const importHTML = async (url) => {
    // fetch请求资源
    const html = await fetch(url).then(res => {
        return res.text();
    })

    // import-html-entry
    const template = document.createElement("div");
    template.innerHTML = html;
    // 转成DOM
    const scripts = Array.from(template.querySelectorAll("script"));
    // 获取所有script标签的代码：[]
    async function getExternalScripts() {
        return Promise.all(scripts.map(script => {
            const src = script.getAttribute("src");
            if (!src) {
                // html模板中的script，而不是webpack中插入到的
                return Promise.resolve();
            } else {
                // 外链：相对于html
                if (src.startsWith("http")) {
                    return fetch(src).then(res => res.text());
                } else {
                    const urlObj = new URL(src, `http://${url}`);
                    return fetch(urlObj.href).then(res => res.text());
                }
            }
        }))
    }

    // 获取并执行script
    async function execScripts() {
        // 模仿cjs
        const module = { exports: {} };
        const exports = module.exports;
        const scripts = await getExternalScripts()
        scripts.forEach(script => {
            eval(script);
        })
        // 获得钩子函数手动调用
        // 打包是umd格式，可以用module.exports
        // console.log(module.exports);
        return module.exports;
    }

    return {
        template,
        getExternalScripts,
        execScripts,
    }
}
