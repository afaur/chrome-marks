const jsdom = require('jsdom')
const fs = require('fs')

let parse_file = (file, cb) => {

  html = fs.readFileSync(file).toString()

  let options = {
    html: html,
    scripts: ["./node_modules/jquery/dist/jquery.js"],
    done: (err, window) => {

      $ = window.$
      item_doubleclick = ""
      results = []

      anchors = $("dl").find("a")

      anchors.each( (index, element) => {

        url = $(element).attr("href")
        name = $(element).text()
        add_date = $(element).attr("add_date")
        tags = []

        $(element).parents("dl").each( (i, e) => {
          folder = $(e).prev()
          tag = folder.text()
          tags.push(tag)
        })

        result = {
          url: url,
          name: name,
          add_date: add_date,
          tags: tags
        }

        results.push(result)

      })

      if (typeof cb === "function") {
        cb(results)
      } else {
        console.warn("Callback isn't a function.")
      }

    }

  }

  jsdom.env(options)

}

parse_file("/tmp/temp.html", (results) => {
  console.log(results)
  fs.unlinkSync("/tmp/temp.html")
})

module.exports = parse_file
