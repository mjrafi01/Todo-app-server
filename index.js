const express=require('express')
const app =express();
const cors=require('cors')
require('dotenv').config()
const port =process.env.PORT || 5000



//midleware

app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion,ObjectId  } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.n1a2t1v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const todoCollection = client.db("todoDb").collection("todoCollection");
    const onProgressCollection = client.db("todoDb").collection("onProgressCollection");
    const doneCollection = client.db("todoDb").collection("doneCollection");



    //todo collection
    app.get('/todoCollection', async (req, res) => {
        try {
          const email=req.query.email
          const query={email:email}
          const result = await todoCollection.find(query).toArray();
          res.status(200).send(result);
        } catch (error) {
          console.error('Failed to fetch tasks:', error);
          res.status(500).send({ error: 'Failed to fetch tasks' });
        }
      });

      app.patch('/todoCollection/:id', async (req, res) => {
        try {
          console.log("hitting")
          const { id } = req.params;
          const { title, description, priority, deadline } = req.body;
      
          const filter = { _id: new ObjectId(id) };
          const updateDoc = {
            $set: {
              title,
              description,
              priority,
              deadline
            }
          };
      
          const result = await todoCollection.updateOne(filter, updateDoc);
      
          res.json(result);
        } catch (error) {
          console.error('Error updating todo item:', error);
          res.status(500).json({ error: 'Server error' });
        }
      });




      app.post('/todoCollection', async(req,res)=>{
        const todoItem=req.body
        const result =await todoCollection.insertOne(todoItem)
        res.send(result)
      })

      app.delete('/todoCollection/:id',async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }
        const result = await todoCollection.deleteOne(query);
        res.send(result);
      })

// onProgress Collection
app.get('/onProgressCollection', async (req, res) => {
  try {
    const email=req.query.email
    const query={email:email}
    const result = await onProgressCollection.find(query).toArray();
    res.status(200).send(result);
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    res.status(500).send({ error: 'Failed to fetch tasks' });
  }
});
app.patch('/onProgressCollection/:id', async (req, res) => {
  try {
    console.log("hitting")
    const { id } = req.params;
    const { title, description, priority, deadline } = req.body;

    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: {
        title,
        description,
        priority,
        deadline
      }
    };

    const result = await onProgressCollection.updateOne(filter, updateDoc);

    res.json(result);
  } catch (error) {
    console.error('Error updating todo item:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
app.post('/onProgressCollection', async(req,res)=>{
  const onProgressItem=req.body
  const result =await onProgressCollection.insertOne(onProgressItem)
  res.send(result)
})
app.delete('/onProgressCollection/:id',async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }
  const result = await onProgressCollection.deleteOne(query);
  res.send(result);
})


//done List
app.get('/doneCollection', async (req, res) => {
  try {
    const email=req.query.email
    const query={email:email}
    const result = await doneCollection.find(query).toArray();
    res.status(200).send(result);
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    res.status(500).send({ error: 'Failed to fetch tasks' });
  }
});

app.post('/doneCollection', async(req,res)=>{
  const onProgressItem=req.body
  const result =await doneCollection.insertOne(onProgressItem)
  res.send(result)
})


app.patch('/doneCollection/:id', async (req, res) => {
  try {
   
    const { id } = req.params;
    const { title, description, priority, deadline } = req.body;

    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: {
        title,
        description,
        priority,
        deadline
      }
    };

    const result = await doneCollection.updateOne(filter, updateDoc);

    res.json(result);
  } catch (error) {
    console.error('Error updating todo item:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
app.delete('/doneCollection/:id',async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }
  const result = await doneCollection.deleteOne(query);
  res.send(result);
})






    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);










app.get('/',(req,res)=>{

    res.send('working')
})

app.listen(port,()=>{
    console.log(`Listening port", ${port}`)
})