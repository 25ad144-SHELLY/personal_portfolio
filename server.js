const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;


// ==========================
// MIDDLEWARE
// ==========================

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


// ==========================
// SERVE FRONTEND
// ==========================

app.use(express.static(__dirname));


// ==========================
// MONGODB SCHEMA
// ==========================

const contactSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});


const Contact =
    mongoose.model("Contact", contactSchema);


// ==========================
// TEST BACKEND
// ==========================

app.get("/api/health", (req, res) => {

    res.json({

        success: true,

        message:
            "Portfolio backend is running!"

    });

});


// ==========================
// CONTACT API
// ==========================

app.post("/api/contact", async (req, res) => {

    try {

        const {
            name,
            email,
            message
        } = req.body;


        // Validation

        if (!name || !email || !message) {

            return res.status(400).json({

                success: false,

                message:
                    "Please fill all fields."

            });

        }


        // Create contact

        const contact =
            new Contact({

                name: name,

                email: email,

                message: message

            });


        // Save to MongoDB

        await contact.save();


        console.log(
            "Contact message saved successfully"
        );


        res.status(201).json({

            success: true,

            message:
                "Message sent successfully!"

        });


    } catch (error) {

        console.error(error);


        res.status(500).json({

            success: false,

            message:
                "Server error. Please try again."

        });

    }

});


// ==========================
// START SERVER
// ==========================

async function startServer() {

    try {

        await mongoose.connect(
            process.env.MONGO_URI
        );


        console.log(
            "MongoDB connected successfully!"
        );


        app.listen(PORT, () => {

            console.log(
                `Server running at http://localhost:${PORT}`
            );

        });


    } catch (error) {

        console.error(
            "MongoDB connection failed:"
        );

        console.error(
            error.message
        );

    }

}


startServer();
