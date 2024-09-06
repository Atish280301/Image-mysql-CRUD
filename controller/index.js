// backend/controller/index.js

export const getUsers = (req, res) => {
    const query = "SELECT * FROM user";
    req.db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            return res.status(500).send("Server error");
        }
        res.json(results);
    });
}

export const addUsers = (req, res) => {
    const { username, usermail } = req.body;
    const image = req.file.buffer.toString('base64');

    const query = "INSERT INTO user (username, usermail, image) VALUES (?, ?, ?)";
    req.db.query(query, [username, usermail, image], (err, result) => {
        if (err) {
            console.error("Error inserting user:", err);
            return res.status(500).send("Server error");
        }
        res.send("User added successfully!");
    });
}

export const deleteUsers = (req, res) => {
    const userId = req.params.id;

    const query = "DELETE FROM user WHERE id = ?";
    req.db.query(query, [userId], (err, result) => {
        if (err) {
            console.error("Error deleting user:", err);
            return res.status(500).send("Server error");
        }
        res.send("User deleted successfully!");
    });
}

export const patchUsers = (req, res) => {
    const userId = req.params.id;
    const { username, usermail } = req.body;
    const image = req.file ? req.file.buffer.toString('base64') : null;

    let query = "UPDATE user SET username = ?, usermail = ?";
    let values = [username, usermail];

    if (image) {
        query += ", image = ?";
        values.push(image);
    }

    query += " WHERE id = ?";
    values.push(userId);

    req.db.query(query, values, (err, result) => {
        if (err) {
            console.error("Error updating user:", err);
            return res.status(500).send("Server error");
        }
        res.send("User updated successfully!");
    });
};

