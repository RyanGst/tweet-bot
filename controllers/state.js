const fs = require('fs');

const contentPath = './content/content.json'

function save(data) {
    const dataStringfy = JSON.stringify(data)
    return fs.writeFileSync(contentPath, dataStringfy)
}

function load() {
    const dataBuffer = fs.readFileSync(contentPath, 'utf-8')
    const dataJson = JSON.parse(dataBuffer)

    return dataJson
}

module.exports = {
    save, load
}