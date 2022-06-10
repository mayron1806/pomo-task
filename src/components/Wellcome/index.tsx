import * as C from "./style";

import Title from "../Title";
import messages from "../../services/dailyMessages.json";
import monthName from "../../services/month.json";
import { useLocalState } from "../../hooks/useLocalState";
import { useEffect, useState } from "react";
import { getRandomItem } from "../../utils/Random";

type dailyMessageType = {
    author: string,
    message: string,
    updatedAt: number
}
const Wellcome = () => {
    // TITULO ---------------------------------------------------------------------------------
    const [titleMessage, setTitleMessage] = useState<string>("");
    // atualiza o titulo com a informacoes atuais
    const updateTitle = ()=>{
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
        setTitleMessage(`${salutation}, hoje é dia ${day} de ${mounth} de ${year}.`);
    }
    useEffect(()=>{
        updateTitle();
        setInterval(() => {
            updateTitle();
        }, (1000 * 60))
    }, [])
    // MENSAGEM DO DIA ------------------------------------------------------------------------
    const {
        state: dailyMessage,
        setState: setDailyMessage
    } = useLocalState<dailyMessageType>("dailyMessage", {} as dailyMessageType);
    // pega uma mensagem aleatoria no messages.json
    const getRandomMessage = ()=>{
        const message = getRandomItem(messages);
        
        setDailyMessage({
            author: message.author,
            message: message.message,
            updatedAt: Date.now()
        })
    }
    useEffect(()=>{
        if(dailyMessage.updatedAt !== undefined){
            // diferenca em milisegundos da data atual ate a ultima a atualização de mensagem
            const timeDiff = Math.abs(Date.now() - dailyMessage.updatedAt);
            // conversao da diferenca para dias 
            const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
            if(dayDiff > 0){
                getRandomMessage();
            }
            return;
        }
        getRandomMessage();
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