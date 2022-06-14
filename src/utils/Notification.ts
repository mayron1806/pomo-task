const getNotificationPermision = () => {
    if(!("Notification" in window)){
        alert("Este navegador infelizmente não suporta notificações tente usar outro para melhor experiência.");
        return;
    }
    if(Notification.permission !== "granted" && Notification.permission !== "denied"){
        Notification.requestPermission();
    }
}
const canNotify = (): boolean => {
    if(Notification.permission === "granted") return true;
    return false;
}
export {
    getNotificationPermision,
    canNotify
}