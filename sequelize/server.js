import express from "express";
import { Sequelize, DataTypes } from "sequelize";
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

// MySQL

// conexión Sequelize con MySQL
const sequelize = new Sequelize("supernat", "root", "Natfer84", {
  host: "localhost",
  dialect: "mysql",
});

// tabla cliente
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

// tabla Producto
const Product = sequelize.define("Product", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  bar_code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
}, {
  tableName: "products",
  timestamps: false,
});

// Ruta para agregar un nuevo Cliente
app.post("/clientes", async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.status(201).json({ message: "Cliente agregado con éxito", cliente: newCustomer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para agregar un nuevo Producto
app.post("/productos", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ message: "Producto agregado con éxito", producto: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor y conectar a MySQL
app.listen(3000, async () => {
  try {
    await sequelize.authenticate();
    console.log("Servidor corriendo en http://localhost:3000");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
});

// MongoDB



// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/superNat', {
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch(err => {
  console.error('Error de conexión a MongoDB:', err);
});

// Definición del esquema y modelo
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model('usuarios', userSchema);

// Operaciones CRUD

// Create
async function createUser(userData) {
  try {
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    console.log('Usuario creado:', savedUser);
    return savedUser;
  } catch (error) {
    console.error('Error al crear usuario:', error);
  }
}

/*
// Read (all users)
async function getAllUsers() {
  try {
    const users = await User.find();
    console.log('Todos los usuarios:', users);
    return users;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
}

// Read (single user)
async function getUserById(id) {
  try {
    const user = await User.findById(id);
    if (user) {
      console.log('Usuario encontrado:', user);
      return user;
    } else {
      console.log('Usuario no encontrado');
    }
  } catch (error) {
    console.error('Error al buscar usuario:', error);
  }
}

// Update
async function updateUser(id, updateData) {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (updatedUser) {
      console.log('Usuario actualizado:', updatedUser);
      return updatedUser;
    } else {
      console.log('Usuario no encontrado');
    }
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
  }
}

// Delete
async function deleteUser(id) {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      console.log('Usuario eliminado:', deletedUser);
      return true;
    } else {
      console.log('Usuario no encontrado');
      return false;
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
  }
}
*/
// Función principal para ejecutar las operaciones
async function main() {

    app.post("/usuarios", async (req, res) => {
        try {
          const newUser = await createUser(req.body);
          res.status(201).json({ message: "Usuario agregado con éxito", usuario: newUser });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      });


  // Ejemplos de uso
  //await createUser({ email: 'usuario4@gmail.com', password: "contraseña321" });

 
  // Cerrar la conexión de MongoDB
  //await mongoose.connection.close();
  //console.log('Conexión a MongoDB cerrada');
}

main().catch(console.error);