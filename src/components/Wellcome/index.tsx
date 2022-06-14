import { useEffect, useState } from "react";
import { useLocalState } from "../../hooks/useLocalState";

import { getRandomItem } from "../../utils/Random";

import * as C from "./style";

import Title from "../Title";

import messages from "../../services/dailyMessages.json";
import monthName from "../../services/month.json";

type DailyMessageType = { author: string, message: string, updatedAt: number }

const getRandomMessage = () : DailyMessageType => {
    const message = getRandomItem(messages);
    return { author: message.author, message: message.message, updatedAt: Date.now() }
}
const getTitle = () => {
    const dateRef = new Date();
    let day = dateRef.getDate();
    let year = dateRef.getFullYear(); 

    // saudação 
    let salutation;
    if(dateRef.getHours() >= 19) salutation = "Boa noite";
    if(dateRef.getHours() >= 12) salutation = "Boa tarde";
    if(dateRef.getHours() < 12) salutation = "Bom dia";
    //mes
    let mounth = monthName[dateRef.getMonth()];
    return `${salutation}, hoje é dia ${day} de ${mounth} de ${year}.`;
}

const Wellcome = () => {
    // TITULO ---------------------------------------------------------------------------------
    const [titleMessage, setTitleMessage] = useState<string>("");
    // atualiza o titulo com a informacoes atuais
    
    useEffect(()=>{
        setTitleMessage(getTitle());
        // atualiza o titulo a cada hora
        setInterval(() => setTitleMessage(getTitle()), (1000 * 60));
    }, [])
    // MENSAGEM DO DIA ------------------------------------------------------------------------
    const {
        state: dailyMessage,
        setState: setDailyMessage
    } = useLocalState<DailyMessageType>("dailyMessage", {} as DailyMessageType);

    // pega uma mensagem aleatoria no messages.json se passou 1 dia desde a ultima atualização
    useEffect(()=>{
        if(dailyMessage.updatedAt !== undefined){
            // diferenca em milisegundos da data atual ate a ultima a atualização de mensagem
            const timeDiff = Math.abs(Date.now() - dailyMessage.updatedAt);
            // conversao da diferenca para dias 
            const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
            // se for um numero maior que 0 significa que tem mais de 1 dia desde a ultima mensagem entao atualiza ela
            if(dayDiff > 0) setDailyMessage(getRandomMessage());
            return;
        }
        setDailyMessage(getRandomMessage());
    }, [dailyMessage]);
    
    return(
        <>
            <Title title={titleMessage} align="center"/>
            <C.MessageContainer>
                <C.Message>Frase motivacional: <br />"{dailyMessage.message}"</C.Message>
                <C.Author>{dailyMessage.author}</C.Author>
            </C.MessageContainer>
        </>
    )
}
export default Wellcome;