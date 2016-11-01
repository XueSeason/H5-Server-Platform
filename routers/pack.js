const express = require('express')
const router = express.Router()

const packDao = require('../dao/packDao')

router.get('/', function (req, res, next) {
    packDao.all(req, res, next)
})

router.post('/add', function (req, res, next) {
    packDao.add(req, res, next)
})

router.post('/update', function (req, res, next) {
    packDao.update(req, res, next)
})

router.post('/remove', function (req, res, next) {
    packDao.remove(req, res, next)
})

module.exports = router
