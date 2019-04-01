# babel-plugin-tcon

安装

```
xnpm i babel-plugin-tcon --save-dev

# or npm

npm i babel-plugin-tcon --save-dev
```

添加到 plugin，指定样式文件夹 

```json
{
  "plugins": [
    [
      "babel-plugin-tcon", {
        "libPath": "style/tcon" 
      }
    ]
  ]
}
```

作用，将

```js
import { button, color, layout } from 'tcon'
```

转换为

```js
import 'tcon/dist/button.css'
import 'tcon/dist/color.css'
import 'tcon/dist/layout.css'
```
