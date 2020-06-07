const { env } = require('./env')
const UPLOAD_PATH = env === 'dev' ?
  '/Users/another/upload/admin-upload-ebook' :
  '/root/upload/admin-upload-ebook'

const UPLOAD_URL = env === 'dev' ?
  'http://liaocx.design:8089/admin-upload-ebook' :
  'http://www.liaocx.design:8089/admin-upload-ebook'

module.exports = {
  CODE_ERROR: -1,
  CODE_SUCCESS: 0,
  debug: true,
  PWD_SALT: 'admin_imooc_node',
  PRIVATE_KEY: 'admin_imooc_node_test_youbaobao_xyz',
  JWT_EXPIRED: 60 * 60, // token失效时间
  CODE_TOKEN_EXPIRED: -2,
  UPLOAD_PATH,
  UPLOAD_URL,
  MIME_TYPE_EPUB: 'application/epub+zip'
};
