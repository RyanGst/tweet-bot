const imageDownloader = require('image-downloader')
const google = require('googleapis').google
const customSearch = google.customsearch('v1')


const googleSearchCredentials = require('../credentials/google-search.json')

async function robot() {

    await fetchImagesOfAllSentences(content)
    await downloadAllImages(content)

    async function fetchGoogleAndReturnImagesLinks(query) {
        const response = await customSearch.cse.list({
            auth: googleSearchCredentials.apiKey,
            cx: googleSearchCredentials.searchEngineId,
            q: query,
            searchType: 'image',
            num: 2
        })

        const imagesUrl = response.data.items.map((item) => {
            return item.link
        })

        return imagesUrl
    }

    async function downloadAllImages(content) {
        try {
            await downloadAndSave(imageUrl, `${content}-original.png`)
            break
        } catch (error) {
            console.log(`> [image-robot] [${sentenceIndex}][${imageIndex}] Error (${imageUrl}): ${error}`)
        }
    }

}

async function downloadAndSave(url, fileName) {
    return imageDownloader.image({
        url: url,
        dest: `./content/${fileName}`
    })
}

}

module.exports = robot