const imageDownloader = require('image-downloader')
const google = require('googleapis').google
const customSearch = google.customsearch('v1')
const googleSearchCredentials = require('../config/google-search.json')
const state = require('./state.js')

//funny stuff
const cool = require('cool-ascii-faces');
const colors = require('colors');

async function imageRobot() {

    const data = state.load()

    console.log(`[Image dowload] > process starting... ! ${cool()} \nsearching for: ${data.name}`.red.bold);

    const images = await fetchGoogleAndReturnImagesLinks(`"${data.name}"`)

    await downloadImages(images, data.name)

    async function fetchGoogleAndReturnImagesLinks(query) {
        const response = await customSearch.cse.list({
            auth: googleSearchCredentials.apiKey,
            cx: googleSearchCredentials.searchEngineId,
            q: query,
            searchType: 'image',
            num: 1
        })

        const imagesUrl = response.data.items.map((item) => {
            return item.link
        })

        return imagesUrl
    }

    async function downloadImages(url, imgName) {

        for (let imgIndex = 0; imgIndex < url.length; imgIndex++) {
            try {
                await downloadAndSave(url[imgIndex], `${imgName}.png`)
                console.log('Image downloaded')
            } catch (error) {
                console.log(`> Error (${url}): ${error}`)
            }
        }
        console.log(`[Image dowload] > process finished! ${cool()}`.red.bold);

    }

}

async function downloadAndSave(url, fileName) {
    return imageDownloader.image({
        url: url,
        dest: `./content/${fileName}`
    })
}

module.exports = imageRobot