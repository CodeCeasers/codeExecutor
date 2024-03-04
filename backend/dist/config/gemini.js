"use strict";
// node --version # Should be >= 18
// npm install @google/generative-ai
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runChat = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, } = require("@google/generative-ai");
const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.GEMINI_API_KEY;
function runChat(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
        const generationConfig = {
            temperature: 0,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        };
        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];
        const chat = model.startChat({
            generationConfig,
            safetySettings,
            history: [],
        });
        const result = yield chat.sendMessage(`Dont give output in markdown.
    You are a compiler and you just have to give output of the code, if there is any error then show the error:
    ${query}`);
        const response = result.response;
        console.log(response.text());
    });
}
exports.runChat = runChat;
