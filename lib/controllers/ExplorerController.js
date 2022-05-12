const ExplorerService = require("../services/ExplorerService");
const FizzbuzzService = require("../services/FizzbuzzService");
const Reader = require("../utils/reader");
require("dotenv").config();
class ExplorerController{
    static getExplorersByMission(mission){
        const explorers = Reader.readJsonFile("explorers.json");
        return ExplorerService.filterByMission(explorers, mission);
    }

    static applyFizzbuzz(score){
        return FizzbuzzService.applyValidationInNumber(score);
    }

    static getExplorersUsernamesByMission(mission){
        const explorers = Reader.readJsonFile("explorers.json");
        return ExplorerService.getExplorersUsernamesByMission(explorers, mission);
    }

    static getExplorersAmonutByMission(mission){
        const explorers = Reader.readJsonFile("explorers.json");
        return ExplorerService.getAmountOfExplorersByMission(explorers, mission);
    }

    static getExplorersStacks(mission){
        const explorers = Reader.readJsonFile("explorers.json");
        return ExplorerService.getExplorersStacks(explorers, mission);
    }

    static getNames(mission){
        const username = ExplorerController.getExplorersUsernamesByMission(mission);
        const usernames = username.toString().replace(/\,/g, "\n");
        return usernames;
    }

    static FizzBuzzBot(){
        const token = process.env.TOKEN;
        const TelegramBot = require("node-telegram-bot-api");
        const bot = new TelegramBot(token, {polling: true});
        try{
            bot.onText((/\/echo (.+)/, (msg, match) =>{
                const chatId = msg.chat.id;
                const resp = match[1];
                bot.sendMessage(chatId, resp);
            }));
            bot.on("message", (msg) => {
                const chatId = msg.chat.id;
                const numberToApplyFb = parseInt(msg.text);
        
                if(!isNaN(numberToApplyFb)){
                    const fizzbuzzTrick = ExplorerController.applyFizzbuzz(numberToApplyFb);
                    const responseBot = `Tu número es: ${numberToApplyFb}. Validación: ${fizzbuzzTrick}`;
                    return bot.sendMessage(chatId, responseBot);
                } else if (isNaN){
                    const mission = msg.text.toLowerCase();
                    if(mission === "node" || mission === "java"){
                        const username = ExplorerController.getNames(mission);
                        const responseBot = `Misión: ${mission}.\n Explorers: ${username}`;
                        return bot.sendMessage(chatId, responseBot);
                    }
                    else {
                        return bot.sendMessage(chatId, "Misión no válida. Usa: node / java");
                    }
                }
            }); 

        } catch(e){
            console.log(e.message);
        }   
    }
}

module.exports = ExplorerController;
