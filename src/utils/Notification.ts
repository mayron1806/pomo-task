const getNotificationPermision = ()=>{
    if(!("Notification" in window)){
        alert("Este navegador infelizmente não suporta notificações tente usar outro para melhor experiência.");
        return;
    }
    if(Notification.permission !== "granted" && Notification.permission !== "denied"){
        Notification.requestPermission();
    }
}
const sendNotification = (title: string, body?: string, icon?: string) => {
    if(Notification.permission === "granted"){
        const options : NotificationOptions = {
            icon: icon,
            body: body
        }   
        new Notification(title, options);
    }
}

export {
    getNotificationPermision,
    sendNotification
}