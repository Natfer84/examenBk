import express from "express";
import { Sequelize, DataTypes } from "sequelize";

const app = express();
app.use(express.json());

// Configurar Sequelize con MySQL
const sequelize = new Sequelize("superNat", "root", "Natfer84", {
  host: "localhost",
  dialect: "mysql",
});

// Definir el modelo Cliente
const Customer = sequelize.define("customer", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  dni: { type: DataTypes.CHAR(9), allowNull: false, unique: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  surnames: { type: DataTypes.STRING(100) },
  card_number: { type: DataTypes.STRING(100), allowNull: false },
}, {
  tableName: "customers",
  timestamps: false,
});

// Definir el modelo Producto
const Product = sequelize.define("Product", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  barcode: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
}, {
  tableName: "products",
  timestamps: false,
});

// Rutas para agregar un Cliente
app.post("/clientes", async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.status(201).json({ message: "Cliente agregado con éxito", cliente: newCustomer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rutas para agregar un Producto
app.post("/productos", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ message: "Producto agregado con éxito", producto: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor y conectar a MySQL
app.listen(3001, async () => {
  try {
    await sequelize.authenticate();
    console.log("Servidor corriendo en http://localhost:3001");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
});
