// Written by Zally, to help Zally

//Excute Bash Commands
const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')

const directoryPath = path.join(__dirname, '../assets/gallery')
let files = fs.readdirSync(directoryPath)

function DeleteMinExtensionImages() {
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
    files = fs.readdirSync(directoryPath)
    for (const [i, file] of files.entries()) {
        let num = getRandomInt(100000, 1000000)
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
    files = fs.readdirSync(directoryPath)
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
