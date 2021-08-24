const express = require("express");
const ProductModel = require("../schemas/Product");

const router = express.Router();

router.get("/list", async (req, res, next) => {
    const products = await ProductModel.find({});
    // res.send(products);
    res.render("products", { products });
});

router.post("/add-product", async (req, res, next) => {
    const body = req.body;
    const product = new ProductModel({
        name: body.name,
        price: body.price,
        category: body.category,
        store: body.store,
        description: body.description,
    });
    const result = await product.save();
    res.send(result);
});

router.get("/edit/:id", async (req, res, next) => {
    const id = req.params.id;
    const currentProduct = await ProductModel.findById(id);
    res.render("edit", { product: currentProduct });
});

router.post("/edit", async (req, res) => {
    console.log(req.body.name);
    const body = req.body;
    await ProductModel.findByIdAndUpdate(body.id, {
        name: body.name,
        price: body.price,
        category: body.category,
        store: body.store,
        description: body.description,
    });
    res.redirect("/products/list");
});

module.exports = router;
