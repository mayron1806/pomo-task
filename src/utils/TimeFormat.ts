const convertToNumberFormat = (minutes: string | number, seconds: string | number): number => {
    if (typeof(minutes) === "string") minutes = parseInt(minutes);
    if (typeof(seconds) === "string") seconds = parseInt(seconds);
    return (minutes * 60) + seconds;
}
const convertToMinutesFormat = (value: string | number): string =>{
    if(typeof(value) === "string") value = parseInt(value);
    const minutes = ("00" + Math.floor(value / 60)).slice(-2);
    const seconds = ("00" + Math.floor(value % 60)).slice(-2);
    return `${minutes}:${seconds}`;
}
const addZeroLeft = (value: string | number) : string => ("00" + value.toString()).slice(-2);
const getMinutes = (value: number | string) => {
    if (typeof(value) === "string") value = parseInt(value); 
    return addZeroLeft(Math.floor(value / 60));
}
const getSeconds = (value: number | string) => {
    if(typeof(value) === "string") value = parseInt(value); 
    return addZeroLeft(Math.floor(value % 60));
}

export {
    convertToMinutesFormat,
    convertToNumberFormat,
    getMinutes,
    getSeconds,
    addZeroLeft
}