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
    const image = req.file.buffer.toString('base64');  // Convert image buffer to Base64

    // Insert the data into MySQL
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

}

export const patchUsers = (req, res) => {

}