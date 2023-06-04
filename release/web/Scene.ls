{
  "_$ver": 1,
  "_$id": "thdaiokf",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$comp": [
    {
      "_$type": "8e3b7db3-2492-4e8f-8b42-195285ed59b9",
      "scriptPath": "script/ballMain.ts"
    },
    {
      "_$type": "81f2ed27-4d13-433c-b35f-73d85b703cd2",
      "scriptPath": "script/ball/ballManager.ts"
    },
    {
      "_$type": "a4d0dee3-5109-4390-913f-a05f8f3256df",
      "scriptPath": "script/ball/ball3dManager.ts",
      "scene3d": {
        "_$ref": "n9gjxcltvl"
      },
      "ballPre": {
        "_$uuid": "prefab/Main Camera.lh",
        "_$type": "Prefab"
      }
    },
    {
      "_$type": "20bfe878-cd06-49ec-9d52-3521f2c224ff",
      "scriptPath": "script/ball/ball2dManager.ts",
      "scene2dNode": {
        "_$ref": "vsj01h28"
      },
      "ball2d": {
        "_$uuid": "prefab/Sprite.lh",
        "_$type": "Prefab"
      }
    }
  ],
  "_$child": [
    {
      "_$id": "n9gjxcltvl",
      "_$type": "Scene3D",
      "name": "Scene3D",
      "skyRenderer": {
        "meshType": "dome",
        "material": {
          "_$uuid": "internal/DefaultSkyMaterial.lmat",
          "_$type": "Material"
        }
      },
      "ambientMode": 0,
      "ambientColor": {
        "_$type": "Color",
        "r": 0.424308,
        "g": 0.4578516,
        "b": 0.5294118
      },
      "fogStart": 0,
      "fogEnd": 300,
      "fogDensity": 0.01,
      "fogColor": {
        "_$type": "Color",
        "r": 0.5,
        "g": 0.5,
        "b": 0.5
      },
      "lightmaps": [],
      "_$child": [
        {
          "_$id": "6ni3p096l5",
          "_$type": "Sprite3D",
          "name": "Direction Light",
          "transform": {
            "localPosition": {
              "_$type": "Vector3",
              "x": 5,
              "y": 5,
              "z": 5
            },
            "localRotation": {
              "_$type": "Quaternion",
              "x": -0.05018269196207069,
              "y": 0.205599051277124,
              "z": -0.13572952828247678,
              "w": 0.9678782065392334
            }
          },
          "_$comp": [
            {
              "_$type": "DirectionLightCom",
              "color": {
                "_$type": "Color",
                "r": 0.6,
                "g": 0.6,
                "b": 0.6
              },
              "intensity": 1,
              "lightmapBakedType": 1,
              "shadowMode": 0,
              "shadowStrength": 1,
              "shadowDistance": 50,
              "shadowDepthBias": 1,
              "shadowNormalBias": 1,
              "shadowNearPlane": 0.1,
              "shadowCascadesMode": 0,
              "strength": null,
              "angle": null,
              "maxBounces": null
            }
          ]
        }
      ]
    },
    {
      "_$id": "vsj01h28",
      "_$type": "Image",
      "name": "Image",
      "x": 164,
      "y": 86,
      "width": 820,
      "height": 480,
      "skin": "resources/tablex2.png",
      "useSourceSize": true,
      "color": "#ffffff"
    }
  ]
}