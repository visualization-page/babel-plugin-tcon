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

转换的路径默认是相对于 src 的，用的 alias @，也可以不使用 alias，即 `{ noAlias: true }`，使用相对路径 `'./'`

```js
import { button, color, layout } from 'tcon'  // eslint-disable-line
```

转换为

```js
import 'tcon/dist/button.css'
import 'tcon/dist/color.css'
import 'tcon/dist/layout.css'
```
