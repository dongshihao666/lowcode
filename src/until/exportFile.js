import FileSaver from 'file-saver'


// 单文件下载
let outExportFileByStr = (str, fileName) => {
  // str = str.replace(VUE_NAME,fileName.replace('.vue',''))
  
  let blob = new Blob([str], {type: "text/plain;charset=utf-8"});
  FileSaver.saveAs(blob, fileName)
}
export {outExportFileByStr};