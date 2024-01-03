const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const authRoutes = require('./routes/auth')
const noteRoutes = require('./routes/note')

PORT = process.env.PORT || 8000;
dotenv.config();

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: " Note-Taking API",
			version: "1.0.0",
			description: "A simple Express Note-Taking API",
		},
		servers: [
			{
				url: `http://localhost:${PORT}`,
			},
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/docs',swaggerUI.serve,swaggerUI.setup(specs))

app.use('/note',noteRoutes);
app.use('/',authRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
.catch((err) => {
    console.log(err);
  });
