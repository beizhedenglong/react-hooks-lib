const fs = require("fs")

const str = fs.readFileSync("./README.md", "utf-8")


fs.writeFileSync("./test.txt", str)
