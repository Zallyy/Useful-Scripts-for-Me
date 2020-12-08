/*
    github.com/zallyy
    Notes:
     1. Images must contain no spaces
     2. Images must be named [0-9][a-zA-z]
     3. Might want to create a backup
     4. Never have this folder inside the folder you want to change
     5. No #4 because ALL FILES are affected not just img files.

     NOTE TO SELF > Go to folder 
     ----------- Convert PNG to JPG ----------- 
        $ ls -1 *.png | xargs -n 1 bash -c 'convert "$0" "${0%.png}.jpg"' > Then delete .png files rm *.png
*/

const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')

//Which folder do we want this to take place in
const directoryPath = path.join(__dirname, '../gallery')

function DeleteMinExtensionImages() {
    let files = fs.readdirSync(directoryPath)
    console.log("Deleting Min's ...")
    files.forEach((file, index) => {
        if (file.includes('min')) {
            fs.unlinkSync(`${directoryPath}/${file}`)
            files.splice(index, 0)
        }
    })
}

function RenameImagesInOrder() {
    console.log('Renaming Images ...')
    let files = fs.readdirSync(directoryPath)

    //This top part is simply for the bottom part to work. Say they are already organized. It'll mess up my shitty code below.
    for (const [i, file] of files.entries()) {
        let num = getRandomInt(10000, 1000000)
        const dot = file.indexOf('.')
        const extension = file.slice(dot, file.length)
        fs.renameSync(`${directoryPath}/${file}`, `${directoryPath}/${num}${extension}`)
    }

    files = fs.readdirSync(directoryPath)
    for (const [i, file] of files.entries()) {
        const dot = file.indexOf('.')
        const extension = file.slice(dot, file.length)
        fs.renameSync(`${directoryPath}/${file}`, `${directoryPath}/${i + 1}${extension}`)
    }
}

function CreateNewMinImage() {
    console.log("Generating Min's ...")
    let files = fs.readdirSync(directoryPath)
    for (const file of files) {
        const dot = file.indexOf('.')
        const fileName = file.slice(0, dot)
        if (file.includes('min-') || files.includes(`min-${fileName}`)) continue

        exec(`convert ${directoryPath}/${file} -resize 250x250 ${directoryPath}/min-${file}`)
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

DeleteMinExtensionImages()
RenameImagesInOrder()
CreateNewMinImage()
