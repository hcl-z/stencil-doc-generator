import fs from 'node:fs'
import path from 'node:path'
import type { JsonDocsUsage, OutputTargetDocsCustom } from '@stencil/core/internal'
import Handlebars from 'handlebars'
import defaultTemplate from './template.md'

/**
 * Options 接口定义
 */
interface Options {
  /**
   * 模板字符串
   */
  template?: string
  /**
   * 模板文件路径
   */
  templatePath?: string
  /**
   * 输出目录
   */
  outputDir?: string
  /**
   * 输出文件后缀
   */
  outputFileSuffix?: string
  /**
   * 输出文件名生成函数
   * @param tag 组件标签
   * @param file 文件名
   * @returns 生成的文件名
   */
  outputFileName?: (tag: string, file: string) => string
  /**
   * 编译选项
   */
  compileOptions?: CompileOptions
}
const DefaultReadmeName = 'readme.md'

export function generateCustomDoc(options: Options): OutputTargetDocsCustom['generator'] {
  const {
    templatePath,
    outputDir,
    outputFileName,
    outputFileSuffix = 'md',
    compileOptions,
  } = options
  return (docs) => {
    if (docs.components.length === 0) {
      console.log('WARN:No components found')
      return
    }

    let template = templatePath ? fs.readFileSync(templatePath, 'utf8') : options.template
    if (!template) {
      template = defaultTemplate
    }

    try {
      docs.components.forEach((component) => {
        const usages = mergeUsages(component.usage)

        const _component = {
          ...component,
          _usages: component.usage,
          usages,
        }
        const { dirPath, tag, fileName } = component
        const compileResult = Handlebars.compile(template, {
          noEscape: true,
          ...compileOptions,
        })(_component)
        const _outputDir = outputDir || dirPath || __dirname
        const _filename = outputFileName?.(tag, fileName || '') || DefaultReadmeName?.replace('.md', `.${outputFileSuffix}`)
        const finalPath = path.join(_outputDir, _filename)

        if (!fs.existsSync(_outputDir)) {
          fs.mkdirSync(_outputDir, { recursive: true })
        }
        fs.writeFileSync(finalPath, compileResult)
      })
    }
    catch (error) {
      console.log('error', error)
    }
  }
}

function mergeUsages(usages: JsonDocsUsage) {
  const keys = Object.keys(usages)
  const map = new Map<string, string[]>()
  keys.forEach((key) => {
    const usage = usages[key].trim()
    const array = map.get(usage) || []
    array.push(key)
    map.set(usage, array)
  })
  const merged: { name: string, text: string }[] = []
  map.forEach((value, key) => {
    merged.push({
      name: value.join(' / '),
      text: key,
    })
  })
  return merged
}
