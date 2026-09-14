const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const Product = require("./models/Product");

const app = express();

app.use(cors());
app.use(express.json());

const initialProducts = [
  { name: "Wireless Mouse", price: 29.99, category: "Electronics", stockQuantity: 100 },
  { name: "Mechanical Keyboard", price: 89.99, category: "Electronics", stockQuantity: 50 },
  { name: "Running Shoes", price: 59.50, category: "Footwear", stockQuantity: 80 }
];

async function initDB() {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL database connected successfully.");
    
    await sequelize.sync();
    console.log("Product table created using Sequelize.");

    const count = await Product.count();
    if (count === 0) {
      await Product.bulkCreate(initialProducts);
      console.log("Database seeded with initial mock products.");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    process.exit(1);
  }
}

// GET ALL PRODUCTS (with filtering by category and sorting by price)
app.get("/products", async (req, res) => {
  try {
    const { category, sort, order } = req.query;
    const queryOptions = {};

    if (category) {
      queryOptions.where = { category };
    }

    if (sort === "price") {
      const sortOrder = (order && order.toUpperCase() === "DESC") ? "DESC" : "ASC";
      queryOptions.order = [['price', sortOrder]];
    }

    const productsList = await Product.findAll(queryOptions);
    res.json(productsList);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error: error.message });
  }
});

// GET PRODUCT BY ID
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving product", error: error.message });
  }
});

// CREATE PRODUCT (with validation)
app.post("/products", async (req, res) => {
  try {
    const { name, price, category, stockQuantity } = req.body;
    const newProduct = await Product.create({ name, price, category, stockQuantity });
    res.status(201).json(newProduct);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({ message: "Validation failed", errors: messages });
    }
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
});

// UPDATE PRODUCT
app.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, price, category, stockQuantity } = req.body;
    await product.update({ name, price, category, stockQuantity });

    res.json(product);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({ message: "Validation failed", errors: messages });
    }
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
});

// DELETE PRODUCT
app.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
});

const PORT = 3000;
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
});