const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve your existing HTML and CSS files
app.use(express.static(__dirname));

// Test API
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Portfolio backend is running!"
    });
});

// Contact API
app.post("/api/contact", (req, res) => {

    const { name, email, message } = req.body;

    // Check whether all fields are filled
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields."
        });
    }

    console.log("New Contact Message:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    res.json({
        success: true,
        message: "Message received successfully!"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
