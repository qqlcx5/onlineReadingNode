const {
  MIME_TYPE_EPUB,
  UPLOAD_PATH,
  UPLOAD_URL,
} = require('../utils/constant');
const Epub = require('../utils/epub');

const fs = require('fs');

class Book {
  constructor(file, data) {
    if (file) {
      this.createBookFromFile(file);
    } else if (data) {
      this.createBookFromData(data);
    }
  }
  createBookFromFile(file) {
    /**
     *   数据详情
     *   fieldname: 'file',
     *   originalname: '_三体 中文版 全集.epub',
     *   encoding: '7bit',
     *   mimetype: 'application/epub+zip',
     *   destination: '/Users/another/upload/admin-upload-ebook/book',
     *   filename: 'bb74e7255dda2d4f0af56adebb066518',
     *   path: '/Users/another/upload/admin-upload-ebook/book/bb74e7255dda2d4f0af56adebb066518',
     *   size: 2147620
     */
    const { destination, filename, mimetype = MIME_TYPE_EPUB, path } = file;
    const suffix = mimetype === MIME_TYPE_EPUB ? '.epub' : '';
    const oldBookPath = path; //文件路径
    const bookPath = `${destination}/${filename}${suffix}`; //文件后缀的路径
    const url = `${UPLOAD_URL}/book/${filename}${suffix}`;
    const unzipPath = `${UPLOAD_PATH}/unzip/${filename}`;
    const unzipUrl = `${UPLOAD_URL}/unzip/${filename}`;
    if (!fs.existsSync(unzipPath)) {
      fs.mkdirSync(unzipPath, { recursive: true });
    }
    if (fs.existsSync(oldBookPath) && !fs.existsSync(bookPath)) {
      fs.renameSync(oldBookPath, bookPath); // 重命名文件
    }
    this.fileName = filename; // 文件名
    this.path = `/book/${filename}${suffix}`; // epub文件路径
    this.filePath = this.path; // epub文件路径
    this.url = url; // epub文件url
    this.title = ''; // 标题
    this.author = ''; // 作者
    this.publisher = ''; // 出版社
    this.contents = []; // 目录
    this.cover = ''; // 封面图片URL
    this.category = -1; // 分类ID
    this.categoryText = ''; // 分类名称
    this.language = ''; // 语种
    this.unzipPath = `/unzip/${filename}`; // 解压后的电子书目录
    this.unzipUrl = unzipUrl; // 解压后的电子书链接
    this.originalName = file.originalname;
  }
  createBookFromData(data) {
    console.log(data);
  }
  parse() {
    return new Promise((resolve, reject) => {
      const bookPath = `${UPLOAD_PATH}${this.filePath}`;
      if (!fs.existsSync(bookPath)) {
        reject(new Error('电子书不存在'));
      }
      const epub = new Epub(bookPath);
      epub.on('error', (err) => {
        reject(err);
      });
      epub.on('end', (err) => {
        if (err) {
          reject(err);
        } else {
          console.log(epub.metadata);
          resolve();
        }
      });
      epub.parse()
    });
  }
}
module.exports = Book;
