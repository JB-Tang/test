# Node学习
## 知识点
1. 包镜像源
    * 代码示例
        ```javascript
        //查看当前包镜像源
        npm config get registry
        //设置当前包镜像源是淘宝镜像
        npm config set registry=https://registry.npm.taobao.org/
        ```  
2. npx
    * npx：npm5.2之后发布的一个命令
    * 使用原因
        * 在命令行执行本地已安装的依赖包命令
            * 使用npx可以在命令行直接执行本地已安装的依赖包命令，而不用在scripts脚本写入命令，也不用麻烦的去找本地脚本
            * 传统的执行命令
                * 方法一：使用package.json的scripts脚本
                * 方法二：安装全局模块
                * 方法三：安装模块的更目录下执行
            * 使用npx执行命令
                * 直接 npx 模块命令
        * 避免全局安装模块
            * 有很多命令，我们只需要执行一次，但是却要全局安装一次，这很不科学，使用npx，可以在不全局安装依赖包的情况下，运行命令，而且运行后不会污染全局环境
        * 切换node版本来运行命令
            * 当你想要运行的命令不兼容当前的nodejs版本，可以通过npx来切换版本，指定某个版本的Node来运行命令
    * 原理
        * npx在运行时，会执行以下的流程
            * 去node_modules/.bin路径检查npx后的命令是否存在，找到后执行；
            * 找不到的话，就去环境变量$PATH里面，检查npx后的命令是否存在，找到后执行；（以上两步对应使用原因中的可直接执行命令）
            * 还是找不到的情况下，自动下载一个临时的依赖包最新版本在一个临时目录，然后再运行命令，运行后删除，不污染全局环境。（对应使用原因中的避免全局安装模块和切换node版本）
    * 安装和参数说明
        * -p ：指定npx所要安装的模块
        * -c ：
            * 默认-p情况下，只有第一个可执行项会使用npx安装的模块，后面的可执行项还是会交给Shell解释，使用-c的话，可以将所有命令都交给npx解释
            * 将环境变量代入要执行的命令
        * -no-install :强制使用本地模块，不下载远程模块，如果本地不存在该模块，就会报错
        * -ignore-existing ：忽略本地的同名模块，强制安装使用远程模块
    * 使用场景
        * 使用npx执行本地命令
        * 使用npx执行一次性命令
        * 使用npx切换node版本
        * 使用npx执行GitHub源码
            * 注：远程代码必须是一个模块，即必须包含package.json和入口脚本
        * 使用npx开启一个静态服务器
    * 参考网址：
        * http://www.ruanyifeng.com/blog/2019/02/npx.html
        * https://www.jianshu.com/p/14c813bba544
3. package.json文件
    * 生成方式
        * 手动编辑
        * 使用命令行生成 npm init
    * 属性介绍
        * 必须属性
            * name：姓名
            * version：版本号
        * 描述信息
            * description：描述信息
            * keywords：关键词
            * author：作者
            * contributors：贡献者
            * homepage：主页
            * repository：仓库
            * bugs：BUG反馈地址
        * 依赖配置
            * dependencies：生产环境依赖
                * 使用命令 npm install xxx | npm i xxx | npm install xxx --save时将包添加至生产环境
            * devDependencies：开发环境依赖
                * 使用命令 npm install xxx -D | npm i xxx -D | npm install xxx --save-D | npm install xxx --save-dev时将包添加至开发环境
            * peerDependencies：兼容依赖
            * optionalDependencies：不阻断安装依赖
            * bundledDependencies：打包依赖
            * engines：版本要求
                * engines只是起到一个说明的作用，即使用户安装的版本不符合要求，也不影响依赖包的安装
        * 脚本配置
            * scripts：脚本命令 
                * 代码示例
                    ```javascript
                        "scripts": {
                            "build": "node build.js"
                        }
                    ```
                    * 注：以上执行npm run build 就相当于执行 node build.js
                * 这些定义在package.json里面的脚本，就称之为npm脚本
                * 优点
                    * 项目的相关脚本，可以集中在一个地方
                    * 不同项目的脚本命令，只要功能相同，就可以有同样的对外接口。用户不需要怎么测试你的项目，只要运行npm run test即可
                    * 可以利用npm提供的许多辅助功能
                * 相关命令
                    * npm run: 查看所有npm脚本命令
                * 原理
                    * 每当执行npm run，就会自动新建一个Shell，在这个Shell里面执行指定的脚本命令
                    * 只要是Shell可以运行的命令，就就可以写在npm脚本里面
                    * npm新建的Shell，会将当前目录node_modules/.bin子目录加入PATH变量，执行结束后，再将PATH变量恢复原样，所以，再node_modules/.bin子目录里面的所有脚本，都可以直接使用脚本名调用，而不用加上路径
                    * 由于npm脚本的唯一要求是可以再Shell执行，因此它不一定是Node脚本，任何可执行文件都可以写在里面。
                * 使用技巧
                    * 通配符
                        * 由于npm脚本是Shell脚本，所以可以使用Shell通配符
                        * 如果要将通配符传入原始命令，防止被Shell转义，要将星号转义
                        * 代码示例
                            ```javascript
                                "lint": "jshint *.js"
                                "lint": "jshint **/*.js"
                                "test": "tap test/\*.js"
                            ```
                    * 传参
                        * 向npm脚本传入参数，要使用--标明
                        * 代码示例
                            ```javascript
                                "lint": "jshint **.js"
                                //传参调用
                                npm run lint -- --reporter checkstyle > checkstyle.xml
                                //该过程也可以直接在package.json文件中直接封装成一个命令
                                "lint": "jshint **.js"
                                "lint:checkstyle": "npm run lint -- --reporter checkstyle > checkstyle.xml"
                            ```
                    * 执行顺序
                        * 如果npm脚本里面需要执行多个任务，那么需要明确执行顺序
                        * 并行执行（平行执行）
                            * 使用 & 符号
                            * 代码示例
                                ```javascript
                                    npm run script1.js & npm run script2.js
                                ```
                        * 继发执行（一个任务完成后，才能执行下一个任务）
                            * 使用 && 符号
                            * 代码示例
                                ```javascript
                                    npm run script1.js && npm run script2.js
                                ```
                        * 注：这两个符号是Bash的功能。此外，还可以使用node的任务管理模块：
                            * script-runner
                            * npm-run-all
                            * redrun
                    * 简写
                        * 四个常用的npm脚本有简写
                            * npm start <---> npm run start
                            * npm stop <---> npm run stop
                            * npm test <---> npm run test
                            * npm restart <---> npm run stop && npm run restart && npm run start的简写
                        * npm restart是一个复合命令、实际会执行三个脚本命令：stop、restart、start，执行顺序如下
                            * prerestart -> prestop -> stop -> poststop -> restart -> prestart -> start -> poststart -> postrestart
                * 默认值
                    * 一般来讲，npm脚本由用户提供，但是，npm对两个脚本提供了默认值。即这两个脚本不用定义，就可以直接使用
                    * 默认脚本
                        ```javascript
                            "start": "node server.js",
                            "install": "node-gyp rebuild"
                        ```
                    * 解析
                        * npm run start的默认值是node server.js，前提是项目根目录下由server.js这个脚本
                        * npm run install的默认值是node-gyp rebuild，前提是项目根目录下由binding,gyp文件
                * 钩子
                    * npm脚本有pre和post两个钩子。
                    * 用户在执行npm run build的时候，会自动执行下面的顺序
                        * npm run prebuild && npm run build && npm run postbuild
                    * 通常在这两个钩子里面，完成一些准备工作和清理工作。
                    * 自定义的脚本命令也可以加上pre和post钩子
                        * 例如： myscript这个脚本命令，也有premyscript和postmyscript钩子
                        * 注意：双重的pre和post是无效的，例如prepretest和postposttest是无效的
                    * npm提供了一个npm_lifecycle_event变量，返回当前正在运行的脚本名称，比如pretest、test、posttest等等。
                        * 在同一个脚本文件中，为不同的npm scripts命令编写代码
                            ```javascript
                                const TARGET = process.env.npm_lifecycle_event
                                if(TARGET === 'test'){
                                    console.log('Running the test task!')
                                }
                                if(TARGET === 'pretest'){
                                    console.log('Running the pretest task!')
                                }
                                if(TARGET === 'posttest'){
                                    console.log('Running the posttest task!')
                                }
                            ```
                    * 注意：
                        * prepublish钩子问题
                            * npm4中：
                                * prepublish不仅会在npm publish命令之前运行，还会在npm install (不带任何参数)命令之前运行。
                                * 在npm4中引入一个新的钩子prepare，行为等同于prepublish
                            * npm5中：
                                * prepublish将只在npm publish命令之前运行
                        * 钩子问题不仅仅在脚本中有，install,uninstall等也有
                * 变量
                    * npm脚本有个很强大的功能，就是可以使用npm的内部变量，通过npm_package_前缀，npm脚本可以拿到package.json里面的字段。
                    * 获取方式
                        * process.env.npm_package_xxx
                            * 代码示例
                                ```javascript
                                    console.log('获取的项目名称：', process.env.npm_package_name)
                                ```
                        * 嵌套的package.json字段
                            * 代码示例
                                ```javascript
                                    console.log('获取的嵌套内容：', process.env.npm_package_config_port)
                                ```
                    * 使用env命令可以列出所有环境变量
                * 常用脚本示例
                    ```javascript
                        //删除目录
                        "clean": "rimraf dist/*",
                        //本地搭建一个HTTP服务
                        "serve": "http-server -p 9090 dist/",
                        //打开浏览器
                        "open:dev": "opener http://localhost:9090",
                        //实时刷新
                        "livereload": "live-reload --port 9091 dist/",
                        //构建HTML文件
                        "build:html": "jade index.jade > dist/index.html",
                        //只要CSS文件有变动，就重新执行构建
                        "watch:css": "watch 'npm run build:css' assets/styles/",
                        //只要HTML文件有变动，就重新执行构建
                        "watch:html": "watch 'npm run build:html' assets/html",
                        //部署到Amazon S3
                        "deploy:prod": "s3-cli sync ./dist/ s3://example-com/prod-site/",
                        //构建favicon
                        "build:favicon": "node scripts/favicon.js",
                    ```
            * config：配置命令行环境变量
                * 个人理解，创建一些环境变量给脚本使用
        * 文件&目录
            * main：指定加载的入口文件，在browser和Node环境中都可以使用
                * 如果我们将项目发布为npm包，那么当使用require导入该npm包时，会去main定义的路径的文件的module.exports属性。
                * 如果不指定该字段，默认时项目根目录下的index.js，如果没有找到，就会报错。
            * browser：定义npm包在browser环境下的入口文件
                * 如果npm包只在web端使用，并且严禁在server端使用，使用browser来定义入口文件
            * module：定义npm包的ESM规范的入口文件
                * browser环境和node环境均可使用
                * .js文件是使用commonJS规范的语法（require('xxx)）, .mjs是使用ESM规范的语法（import 'xxx'）
            * bin：指定各个内部命令对应的可执行文件的位置
            * files：当把npm包作为依赖包安装时需要说明的文件列表
            * man：查看Linux中的指令帮助、配置文件帮助和编程帮助
            * directories：规范项目的目录
                * 这个属性实际上没有什么实际作用，但是不排除将来会有什么比较有意义的用处
        * 发布配置
            * private：防止意外的将私有库发布到npm服务器
            * preferGlobal：当用户不把该模块安装为全局模块时，该属性设置为true的情况下就会显示警告
            * publishConfig：配置会在模块发布时生效，用于设置发布时一些配置项的集合
            * os：设置npm包可以在什么操作系统使用
            * cpu：限制用户的安装环境
            * license：指定软件的开源协议
        * 第三方配置
            * typings：用来指定 TypeScript 的入口文件
            * eslintConfig：eslint 的配置可以写在单独的配置文件. eslintrc.json 中，也可以写在 package.json 文件的 eslintConfig 配置项中
            * babel：用来指定 Babel 的编译配置
            * unpkg：使用该字段可以让 npm 上所有的文件都开启 cdn 服务
            * lint-staged：是一个在 Git 暂存文件上运行 linters 的工具，配置后每次修改一个文件即可给所有文件执行一次 lint 检查，通常配合 gitHooks 一起使用
            * gitHooks：用来定义一个钩子，在提交（commit）之前执行 ESlint 检查。
            * browserslist：用来告知支持哪些浏览器及版本
    * 参考网址：
        * https://www.cnblogs.com/zhilili/p/15707947.html
        * https://www.ruanyifeng.com/blog/2016/10/npm_scripts.html
4. 常用内置模块
    * fs
        * fs.readFile
        * fs.writeFile
    * path
        * resolve
        * join
        * 
    * url
    * os
    * http

## 待整理知识点
1. npm install(默认, --save, -D)
2. 内置模块
3. Common.js
4. 模块化
5. npm包管理

## 待学习知识点
