(function () {
    let config = JSON.parse(`{"resolution":{"scaleMode":"showall","screenMode":"horizontal","designWidth":1136,"designHeight":640,"alignV":"top","alignH":"left","backgroundColor":"#888888"},"3D":{"lightClusterCount":{"x":12,"y":12,"z":12},"enableStaticBatch":true,"enableDynamicBatch":true,"defaultPhysicsMemory":16,"enableUniformBufferObject":true,"pixelRatio":1,"enableMultiLight":true,"maxLightCount":16,"useBVHCull":false,"BVH_max_SpatialCount":7,"BVH_limit_size":32,"BVH_Min_Build_nums":10},"splash":{"fit":"center","enabled":true,"duration":1},"2D":{"FPS":60,"isAntialias":true,"useRetinalCanvas":false,"isAlpha":false,"webGL2D_MeshAllocMaxMem":true,"defaultFont":"Arial","defaultFontSize":20},"spineVersion":"3.8","stat":false,"vConsole":false,"alertGlobalError":false,"startupScene":"login.ls","atlasInfoPath":"fileconfig.json"}`);

    Object.assign(Laya.Config, config["2D"]);

    let config3D = config["3D"];
    Object.assign(Laya.Config3D, config3D);

    let v3 = config3D.lightClusterCount;
    Laya.Config3D.lightClusterCount = new Laya.Vector3(v3.x, v3.y, v3.z);

    Laya.init(config.resolution).then(() => {
        if (Laya.Browser.onMobile && config.vConsole) {
            let script = document.createElement("script");
            script.src = "https://cdn.bootcss.com/vConsole/3.3.0/vconsole.min.js";
            script.onload = () => {
                window.vConsole = new VConsole();
            };
            document.body.appendChild(script);
        }

        if (config.alertGlobalError)
            Laya.alertGlobalError(true);
        if (config.debug || Laya.Browser.getQueryString("debug") == "true")
            Laya.enableDebugPanel();
        if (config.physicsDebug && Laya["PhysicsDebugDraw"])
            Laya["PhysicsDebugDraw"].enable();
        if (config.stat)
            Laya.Stat.show();

        Laya["Physics"] && Laya["Physics"].enable();

        Laya.AssetDb.inst.enableImageMetaFile = true;
        if (config.useSafeFileExtensions)
            Laya.URL.initMiniGameExtensionOverrides();

        if (Laya.ClassUtils.getClass("SpineSkeleton"))
            Laya.SpineTemplet.RuntimeVersion = config.spineVersion || "3.8";

        let promises = [];
        if (config.atlasInfoPath) {
            promises.push(Laya.loader.fetch(config.atlasInfoPath, "json").then(data => {
                Laya.AtlasInfoManager.addToDict(data);
            }));
        }

        if (config.shaderInfoPath) {
            promises.push(Laya.loader.fetch(config.shaderInfoPath, "json").then(data => {
                return Laya.loader.load(data);
            }));
        }

        Promise.all(promises).then(() => {
            if (config.startupScene) {
                Laya.Scene.open(config.startupScene).then(() => {
                    if (window && window.hideSplashScreen)
                        window.hideSplashScreen();
                });
            }
            else {
                if (window && window.hideSplashScreen)
                    window.hideSplashScreen();
            }
        });
    });
})();
