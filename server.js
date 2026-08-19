const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


let products = require("./products");


// GET ALL PRODUCTS
app.get("/products",(req,res)=>{
    res.json(products);
});


// GET PRODUCT BY ID
app.get("/products/:id",(req,res)=>{

    const product = products.find(
        p => p.id == req.params.id
    );

    if(!product)
    {
        return res.status(404)
        .json({
            message:"Product not found"
        });
    }

    res.json(product);
});


// CREATE PRODUCT
app.post("/products",(req,res)=>{

    const newProduct={
        id:products.length+1,
        name:req.body.name,
        price:req.body.price,
        category:req.body.category
    };


    products.push(newProduct);

    res.status(201)
    .json(newProduct);
});


// UPDATE PRODUCT
app.put("/products/:id",(req,res)=>{

    const product=products.find(
        p=>p.id==req.params.id
    );


    if(!product)
    {
        return res.status(404)
        .json({
            message:"Product not found"
        });
    }


    product.name=req.body.name;
    product.price=req.body.price;
    product.category=req.body.category;


    res.json(product);

});


// DELETE PRODUCT
app.delete("/products/:id",(req,res)=>{


    const index=products.findIndex(
        p=>p.id==req.params.id
    );


    if(index==-1)
    {
        return res.status(404)
        .json({
            message:"Product not found"
        });
    }


    products.splice(index,1);


    res.json({
        message:"Product deleted"
    });

});



app.listen(3000,()=>{
    console.log(
        "Server running at port 3000"
    );
});