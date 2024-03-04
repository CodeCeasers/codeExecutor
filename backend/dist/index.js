"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const gemini_1 = require("./config/gemini");
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.json({
        msg: "on /"
    });
});
app.post('/api/code', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body.code);
    yield (0, gemini_1.runChat)(body.code);
}));
app.listen(4000, () => console.log("Listening on Port 4000"));
