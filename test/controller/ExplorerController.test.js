const ExplorerController = require("../../lib/controllers/ExplorerController");

describe("Test para ExplorerController", ()=>{
    test("Requerimiento 1. Mostrar una lista de nombres filtrados por misión", ()=>{
        const names = ExplorerController.getNames("node");
        expect(names).toMatch(/ajolonauta4/);
    });
});