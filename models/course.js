const uuid = require("uuid/v4")
const fs = require("fs")
const path = require("path")

class Course {
    constructor(title, description, price, img) {
        this.title = title
        this.description = description
        this.price = price
        this.img = img
        this.id = uuid()
    }

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }

    async save() {
        const courses = await Course.getAll()
        courses.push(this.toJSON())

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.resolve(__dirname, "../data/courses.json"),
                JSON.stringify(courses),
                err => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve()
                    }
                }
            )
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.resolve(__dirname, "../data/courses.json"),
                "utf-8",
                (err, contnent) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(contnent))
                    }
                }
            )
        })
    }

    static async getById(id) {
        const courses = await Course.getAll()
        return courses.find(c => c.id === id)
    }   

    static async update(course) {
        const courses = await Course.getAll()
        const idx = courses.findIndex(c => c.id === course.id)
        courses[idx] = course
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.resolve(__dirname, "../data/courses.json"),
                JSON.stringify(courses),
                err => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve()
                    }
                }
            )
        })
    }

}

module.exports = Course