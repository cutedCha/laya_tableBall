{
  "_$ver": 1,
  "_$id": "1lt1s6aa",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$comp": [
    {
      "_$type": "ef5c70e6-ac41-4abc-8a74-f1e3b09ae6f4",
      "scriptPath": "script/loginDialog.ts",
      "text": "",
      "sureBtn": {
        "_$ref": "90p90l5w"
      },
      "roomIdInput": {
        "_$ref": "wjcuw3p0"
      },
      "userIdInput": {
        "_$ref": "oi7s9fbm"
      }
    }
  ],
  "_$child": [
    {
      "_$id": "bv2g4gjy",
      "_$type": "Image",
      "name": "Image(1)",
      "x": -55,
      "y": -137.00000000000003,
      "width": 2000,
      "height": 2000,
      "skin": "internal//WhiteTexture.png",
      "color": "#194703"
    },
    {
      "_$id": "a7r3n6kb",
      "_$type": "Image",
      "name": "Image",
      "x": 175,
      "y": 143.00000000000009,
      "width": 512,
      "height": 313,
      "skin": "atlas/comp/image.png",
      "useSourceSize": true,
      "color": "#ffffff"
    },
    {
      "_$id": "renu4o0x",
      "_$type": "Sprite",
      "name": "Sprite",
      "x": 250,
      "y": 133,
      "width": 100,
      "height": 100,
      "mouseEnabled": true,
      "_$child": [
        {
          "_$id": "kvaf88ll",
          "_$type": "Label",
          "name": "Label",
          "width": 120,
          "height": 28,
          "text": "房间id",
          "fontSize": 20,
          "color": "#FFFFFF",
          "align": "center",
          "valign": "middle",
          "leading": 0,
          "padding": "0,0,0,0"
        },
        {
          "_$id": "wjcuw3p0",
          "_$type": "TextInput",
          "name": "roomidInput",
          "x": 121,
          "width": 128,
          "height": 28,
          "mouseEnabled": true,
          "text": "",
          "fontSize": 20,
          "color": "#A9A9A9",
          "valign": "middle",
          "overflow": "scroll",
          "leading": 0,
          "padding": "2,6,2,6",
          "skin": "atlas/comp/textinput.png",
          "type": "text",
          "maxChars": 100000,
          "restrict": "",
          "prompt": "",
          "promptColor": "#A9A9A9"
        }
      ]
    },
    {
      "_$id": "1ygiir32",
      "_$type": "Sprite",
      "name": "Sprite(1)",
      "x": 258,
      "y": 198,
      "width": 100,
      "height": 100,
      "mouseEnabled": true,
      "_$child": [
        {
          "_$id": "oavr4ei4",
          "_$type": "Label",
          "name": "Label",
          "width": 120,
          "height": 28,
          "text": "游戏玩家id",
          "fontSize": 20,
          "color": "#FFFFFF",
          "align": "center",
          "valign": "middle",
          "leading": 0,
          "padding": "0,0,0,0"
        },
        {
          "_$id": "oi7s9fbm",
          "_$type": "TextInput",
          "name": "roomidInput",
          "x": 121,
          "width": 128,
          "height": 28,
          "mouseEnabled": true,
          "text": "",
          "fontSize": 20,
          "color": "#A9A9A9",
          "valign": "middle",
          "overflow": "scroll",
          "leading": 0,
          "padding": "2,6,2,6",
          "skin": "atlas/comp/textinput.png",
          "type": "text",
          "maxChars": 100000,
          "restrict": "",
          "prompt": "",
          "promptColor": "#A9A9A9"
        }
      ]
    },
    {
      "_$id": "90p90l5w",
      "_$type": "Button",
      "name": "Button",
      "x": 320,
      "y": 265,
      "width": 120,
      "height": 40,
      "mouseEnabled": true,
      "skin": "atlas/comp/button.png",
      "label": "加入游戏",
      "labelSize": 20
    }
  ]
}