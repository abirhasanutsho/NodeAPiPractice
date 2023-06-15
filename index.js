
const express = require("express");
const mongoose = require("mongoose");


const Product = require("./product");
const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));



// connect to server 


mongoose.set('strictQuery', true);
mongoose
    .connect("mongodb+srv://abirhasanutsho:admin123@cluster0.wo36f7h.mongodb.net/flutter", {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {



        console.log("Connected to MongoDB");
        app.post("/api/add-product", async (req, res) => {
            try {
                const product = new Product(req.body);
                const savedProduct = await product.save();
                res.status(200).json(savedProduct);
            } catch (error) {
                res.status(400).json({ status: "Something went wrong" });
            }
        });

        // GET API
        app.get("/api/getProduct", async (req, res) => {
            try {
                const products = await Product.find({});
                res.status(200).json({ status_code: 200, products });
            } catch (error) {
                res.status(400).json({ status: "Something went wrong" });
            }
        });


        app.put("/api/update-product/:id", async (req, res) => {
            try {
                const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
                res.status(200).json({ status_code: 200, message: "Product updated successfully" });
            } catch (error) {
                res.status(400).json({ status: "Something went wrong" });
            }
        });

        app.delete("/api/delete-product/:id", async (req, res) => {
            try {
                await Product.findByIdAndDelete(req.params.id);
                res.status(200).json({ status_code: 200, message: "Product deleted successfully" });
            } catch (error) {
                res.status(400).json({ status: "Something went wrong" });
            }
        });





    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });







app.listen(3000, () => {

});







