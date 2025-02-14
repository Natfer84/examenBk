import { Sequelize, DataTypes } from 'sequelize';

// Configuración de la conexión
const sequelize = new Sequelize('test', 'root', 'Natfer84', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false // Desactiva los logs SQL
});

// Definición del modelo User
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'superNat'
});

// Función para conectar a la base de datos
async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');
    await User.sync(); // Esto crea la tabla si no existe
    console.log('Modelo User sincronizado con la base de datos.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

// CRUD Operations

// Create
async function createUser(firstname, lastname) {
  try {
    const newUser = await User.create({ firstname, lastname });
    console.log('Usuario creado:', newUser.toJSON());
    return newUser;
  } catch (error) {
    console.error('Error al crear usuario:', error);
  }

}

async function main() {
    await connectToDatabase();
    console.log(connectToDatabase);
  
    // Ejemplos de uso
    await createUser('Juan', 'Pérez');

}
main().catch(console.error);