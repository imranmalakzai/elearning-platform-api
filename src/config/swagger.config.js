import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Learning Platform API",
      version: "1.0.0",
      description:
        "REST API for an E-Learning Platform with authentication, courses, lessons, quizzes, and roles",
      contact: {
        name: "Imran Malakzai",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/api/",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/**/*.js"], // 👈 very important
};

export const swaggerSpec = swaggerJSDoc(options);
