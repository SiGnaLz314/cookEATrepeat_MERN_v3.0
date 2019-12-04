// 'use strict'
require("dotenv").config();
const express = require("express");
const router = express.Router();
const DOCUMENT = require("../models/upload.model");
const uploadDocuments = require("./uploadDocuments");
const fs = require("fs");
const path = require('path');

/**
 * POST: Upload image to storage 
 * 
 * @alias http://localhost:3000/upload/image
 * 
 * @see routes/uploadDocuments handles moving the image to storage
 */
router.route('/image').post((req, res) => {
  uploadDocuments(req, res, error => {
    if (error) {
      console.log("Error after Routing, please try again !!");
    } else {
      if (req.file == undefined) {
        console.log("Error on File, no file was selected");
      } else {
        res.send({
          status: "200",
          responseType: "string",
          response: "success"
        });
      }
    }
  });
});

/**
 * Edit: Only edits Description.
 * 
 * NEED to add ability to update image.
 * Delete current image associated to Recipe.
 * Add New image.
 * 
 * @alias http://localhost:3000/upload/edit/:id
 * 
 */
router.route("/edit/:id").put((req, res, next) => {
  DOCUMENT.findOneAndUpdate(
    { document_id: req.params.id },
    { $set: { description: Object.keys(req.body)[0] } },
    { new: true },
    (err, updateDoc) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(updateDoc);
    }
  );
});

/**
 * Delete: Remove file from storage
 * 
 * @see route/recipes
 */
router.route("/:id").delete((req, res, next) => {
  DOCUMENT.findOneAndRemove({ document_id: req.params.id }, (err, result) => {
    if (err) {
      return next(err);
    }
    // Now delete the file from the disk storage
    let target_path = path.join(__dirname, '../../public/uploads/') + result.path;

    fs.unlink(target_path, function() {
      res.send({
        status: "200",
        responseType: "string",
        response: "success"
      });
    });
  });
});

module.exports = router;