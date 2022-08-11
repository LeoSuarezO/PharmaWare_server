import 'babel-polyfill'
const db = require("../database");
const supertest = require("supertest");
const { app, server } = require("../index");

const api = supertest(app);

let admin_token;
let user_token;

describe("DB Connection", () => {
  it("Verify DB status avaliable", async () => {
    const validate = (await db.query("SHOW TABLES")) != null;
    expect(validate).toBe(true);
  });
});

describe("DB Query Test", () => {
  it("User Query", async () => {
    const validate = (await db.query("SELECT * FROM PRODUCTOS")) != null;
    expect(validate).toBe(true);
  });
});

describe("Authentication Test", () => {
  it("Obtain token", async () => {
    const res = await api.post("/auth/login").send({
      username: "admin",
      password: "admin",
    });
    expect(res.status).toBe(200);
  });
});

describe("Api Inventory Test", () => {
  it("Obtain Products", async () => {
    const data = await api.get("/inventory/products");
    let products = data != null;
    expect(products).toBe(true);
  });

  afterAll(async () => {
    await server.close()
  });
});
