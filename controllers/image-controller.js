const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const fs = require('fs')
const isAdmin = require("../middleware/is-admin");

router.post("/", isAdmin, (request, response) => {
    console.log("request.files");
    console.log(request.files);
    console.log(request.files.image);
    if(!request.files) {
        response.status(400).send("No file sent");
        return;
    }

    const image = request.files.image;
    const extension = image.name.substr(image.name.lastIndexOf(".")); // e.g: ".jpg"

    if(extension != ".jpg" && extension != ".png") {
        response.status(400).send("Illegal file sent");
        return;
    }

    const newFileName = uuid.v4() + extension;
    image.mv("_front-end/uploads/" + newFileName);
    image.name=newFileName;
    response.status(201).json(image);

    // response.end();

});

router.delete("/:imageName", isAdmin, (request, response) => {
    try {
        const imageName = request.params.imageName;
        const path="./uploads/"+imageName;
        fs.unlinkSync(path);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;

