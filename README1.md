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
