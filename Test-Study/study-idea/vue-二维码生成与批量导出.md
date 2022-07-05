# vue中二维码的生成与批量导出
## 简介
1. 功能
  * 在vue项目中生成二维码，并且可以将二维码名片单张下载与批量多张zip下载
2. 大致步骤
  * 生成二维码：在vue项目中使用vueuse中的useQRCode生成二维码
  * 转化canvas：将页面中生成的二维码使用html2canvas转化canvas
  * 下载：
    * 对于只需要下载单张二维码的需求，可以直接使用```<a>```标签直接下载
    * 对于需要一次性下载多张二维码的需求，可以使用jszip、file-saver将二维码批量导出至一个zip压缩文件中
## 相关依赖
1. 生成二维码
  * vueuse中的useQRCode，使用以下命令会自动安装相关的vueuse依赖
    ```
      pnpm install qrcode 
    ```
2. 下载依赖
  * html2canvas（必需）
    ```
      pnpm install html2canvas
    ```
  * jszip与file-saver （仅在批量导出时需要）
    ```
      pnpm install jszip
      pnpm install file-saver
    ```
    * 注意：对于ts的项目，file-save需要安装的是ts的版本
    ```
      pnpm install @types/file-saver
    ```
## 关键代码
1. 生成二维码
  * html板块
    ```html
    <div class="qrCode">
      <img :src="qrCodeImg" alt="">
    </div>
    ```
  * js板块
    ```javascript
    import { useQRCode } from '@vueuse/integrations/useQRCode'

    export default defineComponent({
      setup(props, ctx) {
        let qrCodeText = '这边是二维码中需要插入的内容'       
        let qrCodeImg = useQRCode(qrCodeText)

        return {
          qrCodeImg
        }
      }
    }) 
    ```
2. 下载二维码（单张）
  * html板块
    ```html
    <div class="qrCode" id="QrCodeCard">
      <img :src="qrCodeImg" alt="">
    </div>
    ```
  * js板块
    ```javascript
    import html2canvas from 'html2canvas'

    export default defineComponent({
      setup(props, ctx) {
        const startDownload = () => {
          html2canvas(document.querySelector('#QrCodeCard') as HTMLElement).then(canvas => {
            const imageUrl = canvas.toDataURL('image/png')
            const a = document.createElement('a')
            a.href = imageUrl
            a.download = '文件名称'
            a.click()
          })
        }
        return {
          startDownload
        }
      }
    })
    ```
    * 注：生成二维码的部分参考上一步
3. 下载二维码（批量下载）
  * html板块
    ```html
    <div v-for="(site, index) in qrCodeList" class="qrCode" :id="'QrCodeCard'+index">
      <img :src="site" alt="">
    </div>
    ```
  * js板块
    ```javascript
    import html2canvas from 'html2canvas'
    import JSZip from 'jszip'
    import FileSaver from 'file-saver'
    
    export default defineComponent({
      setup(props, ctx) {
        /**
         * 批量下载相关
        */
        // 存储二维码原始数据的数组，用于判断需要生成多少次二维码数据
        let baseArr = []
        // 最终下载的所有canvas
        let finalCanvas:{fileUrl: string, renameFileName: string}[] = []
        // 下载
        const downloads = async() => {
          finalCanvas = []
          return new Promise((resolve) => {
            baseArr.forEach((item: any, index: number) => {
              html2canvas(document.querySelector('#QrCodeCard' + index) as HTMLElement).then(canvas => {
                const imageUrl = canvas.toDataURL('image/png')
                finalCanvas.push({
                  fileUrl: imageUrl,
                  renameFileName: (index + 1) + '-二维码.png'
                })
                if (finalCanvas.length >= baseArr.length) {
                  resolve(finalCanvas)
                }
              })
            })
          }).then((data) => {
            filesToRar(data, '二维码名片压缩包')
          })
        }

        const filesToRar = (arrImages: any, filename: string) => {
          let zip = new JSZip()
          let cache: any = {}
          let promises = []

          for (let item of arrImages) {
            const promise = getImgArrayBuffer(item.fileUrl).then((data: any) => {
              zip.file(item.renameFileName, data, {binary: true})
              cache[item.renameFileName] = data
            })
            promises.push(promise)
          }
          Promise.all(promises).then(() => {
            zip.generateAsync({type: 'blob'}).then(content => {
              FileSaver.saveAs(content, filename)
              loading.value = false
            })
          }).catch(res => {
            loading.value = false
            alert('文件压缩失败')
          })
        }

        const getImgArrayBuffer = (url: string) => {
          return new Promise((resolve, reject) => {
            let xmlhttp = new XMLHttpRequest()
            xmlhttp.open('GET', url, true)
            xmlhttp.responseType = 'blob'
            xmlhttp.onload = function() {
              if (this.status === 200) {
                resolve(this.response)
              } else {
                reject(this.status)
              }
            }
            xmlhttp.send()
          })
        }

        return {
          downloads
        }
      }
    })
    ```
4. 注意点：
  * 无论是单张下载，还是批量下载，使用html2canvas都需要先将二维码在页面中渲染出来
  * 批量下载的文件名要不同，否则重名文件会出现文件覆盖的情况

## 参考网址
1. [vueuse文档中useQRCode](https://vueuse.org/integrations/useqrcode)
2. [vue 中使用htmlcanvas生成多张图片，并转成压缩包，并下载到本地](https://blog.csdn.net/qq_37481512/article/details/121637346)
