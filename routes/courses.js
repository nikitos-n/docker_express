const {Router} = require("express")
const Course = require("../models/course")

const router = Router()

router.get("/", async (req, res) => {
    const courses = await Course.getAll()
    res.render("courses", {
        title: "Курсы",
        isCourses: true,
        courses
    })
})

router.get("/:id/edit", async (req, res) => {
    if(!req.query.allow) {
        res.redirect("/")
    }

    const course = await Course.getById(req.params.id)
    res.render("course-edit", {
        title: `Редактировать курс ${course.title}`,
        course
    })
})

router.get("/:id", async(req, res) => {
    const course = await Course.getById(req.params.id)
    res.render("course", {
        title: `Курс ${course.title}`,
        layout: "empty",
        course
    })
}) 

router.post("/edit", async (req, res) => {
    await Course.update(req.body)
    res.redirect("/")
})

module.exports = router