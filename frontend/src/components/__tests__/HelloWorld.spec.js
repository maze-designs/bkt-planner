"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("@cypress/vue");
const HelloWorld_vue_1 = __importDefault(require("../HelloWorld.vue"));
describe("HelloWorld", () => {
    it("playground", () => {
        (0, vue_1.mount)(HelloWorld_vue_1.default, { props: { msg: "Hello Cypress" } });
    });
    it("renders properly", () => {
        (0, vue_1.mount)(HelloWorld_vue_1.default, { props: { msg: "Hello Cypress" } });
        cy.get("h1").should("contain", "Hello Cypress");
    });
});
//# sourceMappingURL=HelloWorld.spec.js.map