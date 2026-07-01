// The controller receives the request and calls the model.
const Entry = require("../models/entryModel");

// GET ALL
exports.getEntries = (req, res) => {

    Entry.getAll((err, results) => {

        if (err)
            return res.status(500).json(err);

        res.json(results);

    });

};

// GET ONE
exports.getEntry = (req, res) => {

    Entry.getById(req.params.id, (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

};

// POST
exports.createEntry = (req, res) => {

    const { title, content } = req.body;

    Entry.create(title, content, (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.status(201).json({
            message: "Entry created",
            id: result.insertId
        });

    });

};

// PUT
exports.updateEntry = (req, res) => {

    const { title, content } = req.body;

    Entry.update(req.params.id, title, content, (err) => {

        if (err)
            return res.status(500).json(err);

        res.json({
            message: "Entry updated"
        });

    });

};

// DELETE
exports.deleteEntry = (req, res) => {

    Entry.delete(req.params.id, (err) => {

        if (err)
            return res.status(500).json(err);

        res.json({
            message: "Entry deleted"
        });

    });

};