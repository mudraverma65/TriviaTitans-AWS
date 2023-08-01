const express = require("express");
const cors = require("cors");
const functions = require("firebase-functions");

const admin = require("firebase-admin");
let serviceAccount = require("./serviceAccountKey.json");

const app = express();
app.use(cors({ origin: true }));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();



app.post("/createIdentity", (req, res) => {
    (async () => {
        try {
            await db
                .collection("Verification Questions")
                .doc("/" + req.body.email + "/")
                .create({
                    Q1: req.body.Q1,
                    Q2: req.body.Q2,
                    Q3: req.body.Q3
                });
            return res.status(200).send({
                status: "Success",
                message: "Verification question added Successfully"
            });
        } catch (error) {
        
            return res.status(500).send({
                status: "Failed",
                message: error
            });
        }
    })();
});

app.post("/verifyIdentity", (req, res) => {
    (async () => {
        try {
            const document = db.collection("Verification Questions").doc("/" + req.body.email + "/");
            let user = await document.get();
            let response = user.data();
            let questionNumber = req.body.question;
            if (req.body.answer == response[questionNumber].answer)
                return res.status(200).send({
                    status: "Success",
                    message: "User Verification Successful"
                });
            else
                return res.status(500).send({
                    status: "Failed",
                    message: "User Verification Failed"
                });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                status: "Failed",
                message: error
            });
        }
    })();
});

app.get("/getUserStatus/:email", (req, res) => {
    (async () => {
        try {
            const document = db.collection("Verification Questions").doc(req.params.email);
            let user = await document.get();
            let response = user.data();
            console.log(response.data);
            if (!response) {
                return res.status(200).send({
                    status: "Success",
                    userRegistered: false
                });
            }
            return res.status(200).send({
                status: "Success",
                userRegistered: true
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                status: "Failed",
                message: error
            })
        }
    })();
}
);

exports.app = functions.https.onRequest(app);
