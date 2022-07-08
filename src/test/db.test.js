const { expectCt } = require("helmet");
const db = require("../database");

describe("DB Connection", () => {
  it("Verify DB status avaliable", async () => {
    const validate = (await db.query("SHOW TABLES")) != null;
    expect(validate).toBe(true);
  });
});
