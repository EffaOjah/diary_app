// The model talks directly to MySQL.
const db = require("../config/db");

// GET ALL
exports.getAll = (callback) => {

    const sql = `
        SELECT *
        FROM diary_entries
        ORDER BY created_at DESC
    `;

    db.query(sql, callback);

};

// GET ONE
exports.getById = (id, callback) => {

    const sql = `
        SELECT *
        FROM diary_entries
        WHERE id = ?
    `;

    db.query(sql, [id], callback);

};

// CREATE
exports.create = (title, content, callback) => {

    const sql = `
        INSERT INTO diary_entries(title, content)
        VALUES (?, ?)
    `;

    db.query(sql, [title, content], callback);

};

// UPDATE
exports.update = (id, title, content, callback) => {

    const sql = `
        UPDATE diary_entries
        SET title = ?, content = ?
        WHERE id = ?
    `;

    db.query(sql, [title, content, id], callback);

};

// DELETE
exports.delete = (id, callback) => {

    const sql = `
        DELETE FROM diary_entries
        WHERE id = ?
    `;

    db.query(sql, [id], callback);

};