import axios from "axios"
import * as cheerio from "cheerio"

export default async function scrap(link) {
    let url = "https://welovedevs.com/app/job/" + link
    try {
        const { data } = await axios.get(url)
        const htmldata = cheerio.load(data)
        const paragraphs = htmldata("p").map((i, el) => htmldata(el).text()).get()
        console.log(paragraphs.join(" "))
        let param = paragraphs.join(" ")
        return param
    } catch (error) {
        console.error(error)
    }
}

