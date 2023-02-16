# tsconfig.json配置详解
## 代码示例
  ```json
  {
      // 指定需要编译文件，否则默认当前目录下除了exclude之外的所有.ts, .d.ts, .tsx文件
      "include": ["./test.ts"],
      // 指定需要编译文件，否则默认当前目录下除了exclude之外的所有.ts, .d.ts, .tsx文件
      "files": ["./src/**/*"],
      // 不编译某些文件
      "exclude": ["test.ts"],
      // 项目引用，是 TS 3.0 中的一项新功能，它允许将 TS 程序组织成更小的部分
      "references": [],
      // 设置保存文件的时候自动编译
      "compileOnSave": true,
      "compilerOptions": {
          /**
           * 项目选项
           * incremental：只编译修改过的文件，这个时候会生成tsconfig.tsbuildinfo，下次编译的时候会进行对比只编译修改过的文件
           * target：指定ECMAScript目标版本，'ES3' (默认版本), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ESNEXT'
           * module：指定使用模块，'commonjs', 'amd', 'system', 'umd', 'es2015'
           * lib：如果未指定 --lib,则会注入默认的librares列表，默认
                * 对于target ES5: DOM, ES5, ScriptHost
                * 对于target ES6: DOM, ES6, DOM.Iterable, ScriptHost
                * 注意：TS不会再代码中注入polyfill，所以需要自己制定编译lib
           * allowJs：允许编译js
           * checkJs：是否检测js的语法
           * jsx：指定jsx代码的生成：'perserve', 'react-native', 'react'
           * declaration：如果设为true,编译每一个ts文件后会生成一个js文件和一个声明文件
                * 注意：declaration和allowJs不能同时被设为true
           * declarationMap：是否为声明文件.d.ts生成map文件
           * sourceMap：是否在编译时生成.map文件
           * outFile：当module设置为'amd'或'system'的时候可以使用此命令，这样可以将ts文件打包到一个目录下
           * outDir：编译后的文件存储到哪个目录下，默认时每一个ts文件的当前目录，下述的配置就是把ts编译到build目录下
           * rootDir：指定输入文件的根目录，默认情况下当前的项目目录为根目录，详见下文
           * composite：是否编译构建引用项目，详见下文
           * tsBuildInfoFile：指定文件用来存储增量编译信息，默认是tsconfig.tsbuildinfo
           * removeComments：是否在编译的时候删除注释
           * noEmit：是否不生成编译文件，一般较少使用，这个build目录下将没有任何文件，但是会进行编译，有错误将抛出
           * importHelpers：是否引入npm包tslib中的辅助函数，__extends等
           * downlevelIteration：当target为'ES3'或'ES5'时，为'for-of'，spread，destructuring中的迭代器提供完全支持
           * isolatedModules：是否将每个文件作为单独的模块，默认为true
                * 个人理解：设置为true之后，每个ts文件中要有export或者import,否则会报编译错误
                * 目的：便于在编译的时候将一些type或interface更好的识别，便于删除
                * 注意点：不可以与declaration同时设定
           */
          "incremental": true,
          "target": "es5",
          "module": "commonjs",
          "lib": ["es5", "dom", "ScriptHost", "es2015.promise"],
          "allowJs": true,
          "checkJs": true,
          "jsx": "preserve",
          "declaration": true,
          "declarationMap": true,
          "sourceMap": true,
          "outFile": "./",
          "outDir": "./build",
          "rootDir": "./src",
          "composite": true,
          "tsBuildInfoFile": "./",
          "removeComments": true,
          "noEmit": true,
          "importHelpers": true,
          "downlevelIteration": true,
          "isolatedModules": true,
          /**
           * 严格检查
           * TS中严格模式（与js中严格模式use strict不是一个概念），表示是否开启下面的一系列操作
           * noImplicitAny：不允许变量或函数参数有隐式any类型
           * strictNullChecks：null类型检测
           * strictFunctionTypes：对函数参数进行严格逆变比较
           * strictBindCallApply：严格检查bind, call, apply
           * strictPropertyInitialization：验证构造函数内部初始化前后已定义的属性
           * noImplicitThis：检测this是否隐式指定
           * alwaysStrict：使用js的严格模式，在每一个文件上都声明 use strict
           * 注意：如果设置strict为true，则上述配置默认都是true；如果设置strict为false，那么上述默认配置默认全是false；如果两者都设置了，以单独设置的为准
           */
          "strict": false,
          "noImplicitAny": true,
          "strictNullChecks": true,
          "strictFunctionTypes": true,
          "strictBindCallApply": true,
          "strictPropertyInitialization": true,
          "noImplicitThis": true,
          "alwaysStrict": true,
          /**
           * 附加检查
           * noUnusedLocals：是否检测定义了但是没有使用的变量，默认false
           * noUnusedParameters：检查是否有在函数体中没有使用的参数
           * noImplicitReturns：检查函数是否有返回值，设为true后，如果函数没有返回值将会提示
           * noFallthroughCasesInSwitch：检查switch中是否有case没有使用break跳出switch
           */
          "noUnusedLocals": true,
          "noUnusedParameters": true,
          "noImplicitReturns": true,
          "noFallthroughCasesInSwitch": true,
          /**
           * 模块解析选项
           * moduleResolution：用于选择模块解析策略，有'node'和'classic'两种类型
           * baseUrl：用于解析非绝对模块名的基本目录，相对模块不受影像，详见下文
           * paths：用于设置模块名称基于baseUrl的路径映射关系，详见下文
           * rootDirs：将多个目录放在一个虚拟目录下，运行编译后文件引入的位置发生改变，也不会报错,详见下文
           * typeRoots：指定声明文件或文件夹的路径列表，如果指定了此项，则只有在这里列出的声明文件才会被加载
           * types：用来指定需要包含的模块，并将其包含在全局范围内，只有在这里列出的模块的声明文件才会被加载进来
           * allowSyntheticDefaultImports：指定是否允许从没有默认导出的模块中默认导入
           * esModuleInterop：通过为导入内容创建命名空间，实现CommonJS和ES模块之间的互操作性，开启后，也将自动开启allowSyntheticDefaultImports
           * preserveSymlinks：是否不解析符号链接的真实路径，这是为了在Node.js中反应相同的标志，默认false
           * allowUmdGlobalAccess：允许您从模块文件内部访问作为全局变量的UMD导出，如果不使用该选项，从UMD模块导出需要一个导入声明，默认false
           */
          "moduleResolution": "node",
          "baseUrl": "./",
          "paths": {},
          "rootDirs": [],
          "typeRoots": [],
          "types": [],
          "allowSyntheticDefaultImports": true,
          "esModuleInterop": true,
          "preserveSymlinks": true,
          "allowUmdGlobalAccess": true,
          /**
           * Map选项
           * sourceRoot：指定调试器应定位TypeScript文件而不是相对源位置的位置
           * mapRoot：指定调试器定位Map文件的位置，而不是生成的位置
           * inlineSourceMap：是否将Map文件内容嵌套到JS文件中，这会导致JS文件变大，但在某些情况下会很方便，默认false
           * inlineSources：是否将.ts文件的原始内容作为嵌入字符串包含在.map文件中，默认：false
           */
          "sourceRoot": "",
          "mapRoot": "",
          "inlineSourceMap": true,
          "inlineSources": true,
          /**
           * 实验选项
           * experimentalDecorators：是否启用对装饰器的实验性支持，装饰器是一种语言特性（还没有完全被JS规范批准），默认false
           * emitDecoratorMetadata：为装饰器启用对发出类型元数据的实验性支持，默认false
           */
          "experimentalDecorators": true,
          "emitDecoratorMetadata": true
      }
  }
  ```
## 详细讲解
假设存在如下文件目录
```
-- src
  -- version1
    test.ts
  -- version2
    demo.ts
  test2.ts
```
1. 项目选项
  * rootDir：指定输入文件的根目录，默认情况下当前的项目目录为根目录
    * 如果我们设置```"rootDir": "./src"```，那么项目中除了src目录下，其他地方不能有ts文件
2. 模块解析
  * baseUrl：用于解析非绝对模块名的基本目录，相对模块不受影像
    * 在未设置baseUrl的情况下，test.ts中想要引用test2.ts：```import test2 from '../test2'```
    * 如果设置了baseUrl：```"baseUrl": "./src"```，那么我们在test.ts中引用test2.ts可以写成```import test2 from 'test2'```
    * 注意点：只有我们应用的是绝对路径的时候才会使用baseUrl去解析文件
  * paths：用于设置模块名称基于baseUrl的路径映射关系
    * 如果在tsconfig中使用如下配置
      ```json
      {
        "compilerOptions": {
          "baseUrl": ".",
          "paths": {
            "*": ["*", "version2/*"]
          }
        }
      }
      ```
    * 此时我们在test.ts中引用```import test2 from 'test2'```
    * 首先会匹配```baseUrl/test2```，如果找到则停止，否则开始寻找```baseUrl/version2/test2```
  * rootDirs：将多个目录放在一个虚拟目录下，运行编译后文件引入的位置发生改变，也不会报错
    * 如果我们在tsconfig中使用如下配置（这个时候我们生成了一个虚拟的根目录，这个根目录下存放了version2, version3目录下文件）
      ```json
      {
        "compilerOptions": {
          "rootDirs": [
            "src/version2",
            "src/version3"
          ]
        }
      }
      ```
    * 这个时候我们在test.ts中引用demo就可以直接这样写```import demo from './demo'```
## 参考网址
1. [typeScript tsconfig配置详解](https://juejin.cn/post/6844904093568221191)
2. [tsconfig.json详细配置](https://blog.csdn.net/ExtremeExplorer/article/details/117606486)