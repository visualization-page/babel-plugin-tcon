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
    "babel-plugin-tcon"
  ]
}
```

当使用 `tcon-cli` 定制样式到项目后，需要指定样式目录 

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

例如，默认是使用 alias `@`，在项目中一般把他设置为 `src/` 目录。

```js
import 'tcon/button/size/layout'

// ===>

import '@/style/tcon/button.css'
import '@/style/tcon/size.css'
import '@/style/tcon/layout.css'
```

也可以不使用 alias

```json
{
  "plugins": [
    [
      "babel-plugin-tcon", {
        "libPath": "src/style/tcon",
        "noAlias": true
      }
    ]
  ]
}
```

这样便需要手动指定 src 目录了

```js
import 'tcon/button'

// ===>

import './src/style/tcon/button.css'
```
