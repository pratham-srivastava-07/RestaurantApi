"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = require("./router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1", router_1.router);
app.get('/', (req, res) => {
    res.send("hello");
});
app.listen(3000, () => {
    console.log("Server started");
});
