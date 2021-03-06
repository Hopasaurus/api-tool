
const sampleSwagger = `{
  "swagger": "2.0",
  "info": {
    "title": "Sample API",
    "description": "API description in Markdown.",
    "version": "1.0.0",
    "contact": { "email": "email@example.com" },
    "x-tag-info": "example x-tag-info",
    "x-tag-path": "examplt x-tag-path"
  },
  "host": "api.example.com",
  "basePath": "/v1",
  "tags": [
    {
      "name": "sample",
      "description": "sample tag",
      "externalDocs": {
        "description": "external docs description",
        "url": "http://example.com"
      }
    }
  ],
  "schemes": [
    "https"
  ],
  "paths": {
    "/users": {
      "get": {
        "x-tag-path": "sample x-tag-path",
        "x-tag-info": "sample x-tag-info",
        "tags": ["sample"],
        "operationId": "getUsers",
        "summary": "Returns a list of users.",
        "description": "Optional extended description in Markdown.",
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "405": {
            "description": "invalid code"
          },
          "418": {
            "description": "tea time"
          }
        }
      }
    }
  }
}`;

export default sampleSwagger;