<h1 align="center">
Welcome to stencil-doc-generator 👋
<br>
<a href="https://npm.im/stencil-doc-generator">
  <img src="https://badgen.net/npm/v/stencil-doc-generator">
</a>
<a href="https://npm.im/stencil-doc-generator">
  <img src="https://badgen.net/github/stars/hcl-z/stencil-doc-generator">
</a>
<a href="https://npm.im/stencil-doc-generator">
  <img src="https://badgen.net/npm/license/stencil-doc-generator">
</a>
</h1>

<p align="center">
根据传入的模版来自定义生成doc
</p>

## Install

```sh
npm install stencil-doc-generator -D
```

## Usage
在stencil.config.ts中配置自定义文档输出：

```ts
{
  outputTargets:[
    {
      type: 'docs-custom',
      generator: generateCustomDoc({
        templatePath: './template.mdx',
        outputDir: 'docs/',
        outputFileName: (tag) => {
          return `${tag}.mdx`
        }
      })
    },
  ]
}
```
所有的组件文档会被自动生成到目标目录下

## Template
本项目中有一个默认的模板，也可以使用自己创建的模版，模版使用模版引擎handlebars编写，具体可以参考[handlebars](https://handlebarsjs.com/),传入的编译数据类型可参考[stencil-docs](https://stenciljs.com/docs/docs-custom)
## Interface
| 选项 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| template | string | 模板字符串 | 可选 |
| templatePath | string | 模板文件路径 | 可选 |
| outputDir | string | 输出目录 | 可选 |
| outputFileSuffix | string | 输出文件后缀 | 'md' |
| outputFileName | (tag: string, file: string) => string | 输出文件名生成函数 | 可选 |
| compileOptions | object | 编译选项 | 可选 |
