const express = require('express');
const multer = require('multer');
const router = express.Router();
const { UPLOAD_PATH } = require('../utils/constant');
const Result = require('../models/Result');
router.post(
  '/upload',
  multer({ dest: `${UPLOAD_PATH}/book` }).single('file'),
  (req, res) => {
    if (!req.file || req.file.length === 0) {
      new Result('上传电子书失败').fail(res);
    } else {
      new Result('上传电子书成功').success(res);
    }
  }
);

module.exports = router;
