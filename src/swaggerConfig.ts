const swaggerOptions = {
  definition: {
	openapi: "3.0.0",
	info: {
	  title: "Your API Title",
	  version: "1.0.0",
	  description: "Your API Description",
	},
	servers: [
	  {
		url: "http://localhost:3000",
	  },
	],
  },
  apis: ['./src/docs/*.yaml'],
};

export default swaggerOptions;
