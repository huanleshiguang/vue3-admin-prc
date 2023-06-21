## 1. package.json 部分配置介绍

"scripts": {
"dev": "vite --open",
"build": "vue-tsc && vite build",
"preview": "vite preview"
},
--open 表示项目启动后，自动打开浏览器

## 2. eslint 配置

.eslintrc 文件进行配置
2.1 prettier
什么是 prettier
prettier 和 eslint 相辅相成
一个检测语法问题，一个检测格式问题，
一个注重语法质量，一个注重代码美观
eslit 检测完毕，prettier 接着干

{
"singleQuote": true, // 单引号
"semi": false, // 不要分号
"bracketSpacing": true,
"htmlWhitespaceSensitivity": "ignore",
"endOfLine": "auto",
"trailingComma": "all",
"tabWidth": 2
}

## 3. stylelint 的作用

对 css 进行语法限制

## 4. husky 的作用

在 git 到远程仓库之前，自动格式化一下代码

```
pnpm install -D husky
npx husky-init
```

执行完以上命令后，会在根目录下生成一个.husky 文件。

这是一个 git 提交前的钩子，在提交前，会执行 pre-commit 文件

![image-20230619212349209](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230619212349209.png)

## 5. 配置 commitlint

对于 commit 的信息，也是有规范的，不能随便瞎写

```
pnpm add @commitlint /config-conventional @commitlint/cli -D
```

安装好 commitlint 后，再添加 commitlint.cjs 配置文件

```js
module.exports = {
  ignores: [(commit) => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
  },
}
```

配置 husky

```
npx husky add .husky / commit-msg
```

在新增的 husky 文件下添加命令：

```
pnpm commitlint
```

![image-20230619220840675](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230619220840675.png)

再执行 git commit -m ” 不能随便瞎写了“,必须要有关键字

![image-20230619221003271](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230619221003271.png)

![image-20230619220954752](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230619220954752.png)

![image-20230620224454953](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230620224454953.png)

## 6. 强制使用 pnpm 包管理工具

统一包管理工具，因为日不同包管理工具下载同一个依赖，可能版本不一样

在根目录下新建 scripts 文件夹，新建 preinstall.js 文件

![image-20230619222015828](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230619222015828.png)

然后再 package.json 中添加命令：

```
"preinstall": "node ./scripts/preinstall.js"
```

这样，当我们 install 的时候会触发 preinstall 脚本

## 7. src 别名的配置

### 1. vite.config.ts 文件配置

![image-20230620204034683](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230620204034683.png)

### 2. tsconfig.json 中的配置

![image-20230620205019126](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230620205019126.png)

## 7.项目环境变量配置

项目开发过程中，至少会经历开发环境，测试环境和生产环境（即正式环境）三个阶段，不同阶段请求的状态（如接口地址等）不尽相同，手动接环接口地址繁琐且易出错。

![image-20230620205538297](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230620205538297.png)

1.

```
.env.development
.env.production
.env.test
```

![image-20230620214138752](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230620214138752.png)

2. 配置运行命令:package.json

![image-20230620214352179](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230620214352179.png)

3. 获取

```js
console.log(import.meta.env)
```

## 8. SVG 图标配置

### 1.安装 SVG 依赖插件

```
pnpm install vite-plugin-svg-icons -D
```

### 2. 在 vite.config.ts 中配置插件

```javascript
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  // 获取各种环境下对应的变量
  let env = loadEnv(mode, process.cwd())
  return {
    base: './',
    plugins: [
      VueSetupExtend(),
      DefineOptions(),
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        localEnabled: command === 'serve',
      }),
    ],
    resolve: { alias: { '@': path.resolve('./src') } },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    // 代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          // 需要代理跨域
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
}
```

### 3.入口文件中导入(main.ts)

```javascript
// svg插件需要配置代码
import 'virtual:svg-icons-register'
```

### 4.使用

4.1 创建一个 phone.svg 文件，复制它的 svg 代码到文件中

![image-20230620220044932](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230620220044932.png)

4.2 组件中使用

外层包一个 svg，内层加上 use 标签

![image-20230620220213372](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230620220213372.png)

**4.3 封装成一个组件直接使用（推荐**）

![image-20230620225526168](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230620225526168.png)

全局注册后进行使用

![image-20230620225542075](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230620225542075.png)

## 9.集成scss

1. npm.js.com 引入rest.scss， 将其放入styles下面的reset.scss文件中

![image-20230621215115685](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230621215115685.png)

2. 引入 模板全局样式

   ```css
   import '@/styles/index.scss'
   ```

3. 项目中引入全局变量（否则其他组件依然无法访问$color）

![image-20230621215700321](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230621215700321.png)
