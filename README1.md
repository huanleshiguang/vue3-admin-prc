## 1. package.json部分配置介绍

  "scripts": {
    "dev": "vite --open",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  --open 表示项目启动后，自动打开浏览器

## 2. eslint配置

.eslintrc文件进行配置
2.1 prettier
 什么是prettier
prettier和eslint相辅相成
一个检测语法问题，一个检测格式问题，
一个注重语法质量，一个注重代码美观
eslit检测完毕，prettier接着干

{
  "singleQuote": true, // 单引号
  "semi": false, // 不要分号
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "auto",
  "trailingComma": "all",
  "tabWidth": 2
}

## 3. stylelint的作用

 对css进行语法限制，类似与eslint

 

## 4. husky的作用

在git到远程仓库之前，自动格式化一下代码