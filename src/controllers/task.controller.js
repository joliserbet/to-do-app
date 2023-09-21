import {client} from "../db.js";

export const viewTasks = async (req, res) => {
    try {
      await client.connect();
      console.log("Conexión exitosa a MongoDB");
      const db = client.db("Proyecto_ada");
      const collection = db.collection("tasks");
      const documentos = await collection.find().toArray();
      res.send(documentos);
    } catch (error) {
      next(error); // Pasa el error al middleware de manejo de errores
    } finally {
      client.close();
    }
  };

export const addTask = (req,res) =>{async (req, res, next) => {
        const newTask = {
          task: req.body.task, // Utiliza el cuerpo de la solicitud para obtener los datos
        };
        try {
          await client.connect();
          const db = client.db("Proyecto_ada");
          const collection = db.collection("tasks");
          const documento = await collection.insertOne(newTask);
          res.status(201).json(documento); // Devuelve el documento insertado
        } catch (error) {
          next(error); // Pasa el error al middleware de manejo de errores
        } finally {
          client.close();
        }
      }
};

export const deleteTask = (req,res) =>{async (req, res, next) => {
    try {
      await client.connect();
      console.log("Conexión exitosa a MongoDB");
      const db = client.db("Proyecto_ada");
      const collection = db.collection("tasks");
      
      const taskId = req.params.id;
      const documento = { _id: new ObjectId(taskId) }; // Construye un objeto de consulta
  
      const result = await collection.deleteOne(documento);
  
      if (result.deletedCount === 1) {
        res.send("Documento eliminado con éxito");
      } else {
        res.status(404).send("Documento no encontrado");
      }
    } catch (error) {
      next(error); // Pasa el error al middleware de manejo de errores
    } finally {
      client.close();
    }
  }};

export const editTask = (req,res) =>{async (req, res, next) => {
  try {
    await client.connect();
    console.log("Conexión exitosa a MongoDB");
    const db = client.db("Proyecto_ada");
    const collection = db.collection("tasks");

    const taskId = req.params.id;
    const updateData = req.body; // Los campos a actualizar deben estar en el cuerpo de la solicitud

    const result = await collection.updateOne(
      { _id: new ObjectId(taskId) }, // Utiliza el ID de la tarea como filtro
      { $set: updateData } // Utiliza $set para actualizar los campos especificados en updateData
    );

    if (result.matchedCount === 1) {
      res.send("Tarea actualizada con éxito");
    } else {
      res.status(404).send("Tarea no encontrada");
    }
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  } finally {
    client.close();
  }
}};

