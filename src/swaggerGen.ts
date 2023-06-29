const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Projeto FullStack, Módulo 6 - Group23-t14",
    description: "Motors Shop - Group23-t14-felipe",
    version: "1.0.0"
  },
  schemes: ["http"]
};

const outputFile = "./src/routes/swagger.output.json";

const endpointsFiles = ["./src/app.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    require("./src/app.ts");
  })
  .catch((err) => {
    console.error(err);
  });
