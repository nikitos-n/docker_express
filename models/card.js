const fs = require("fs")
const path = require("path")

class Card {

    static async add(course) {
        const card = await Card.fetch()
        // console.log(card)
        const idx = card.courses.findIndex(c => c.id === course.id) 
        // console.log(idx)
        const candidate = card.courses[idx]
        console.log(candidate)
        console.log(Boolean(candidate))
        if(candidate) {
            //Курс уже есть
            candidate.count += 1
            card.courses[idx] = candidate
        }
        else {
            //Курс нужно добавить
            course.count = 1
            card.courses.push(course)
        }

        card.price += +course.price
        
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, ("../data//card.json")),
                JSON.stringify(card),
                err => {
                    if(err) {
                        reject(err)
                    }
                    else {
                        resolve()
                    }
                }
            )
        })
    }

    static async remove(id) {
        const card = await Card.fetch()
        const idx = card.courses.findIndex(c => c.id === id)
        const course = card.courses[idx]
        if(course.count === 1) {
            //Удалить
            card.courses = card.courses.filter(c => c.id !== id)
        }
        else {
            //Изменить количество
            card.courses[idx].count -= 1
        }
        card.price -= course.price

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, ("../data//card.json")),
                JSON.stringify(card),
                err => {
                    if(err) {
                        reject(err)
                    }
                    else {
                        resolve(card)
                    }
                }
            )
        })
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, "../data/card.json"),
                "utf-8",
                (err, data) => {
                    if(err) {
                        reject(err)
                    }
                    else {
                        resolve(JSON.parse(data))
                    }
                }
            )
        })
    }

}

module.exports = Card