const convertToNumberFormat = (value: string | number): number => {
    if (typeof(value) === "number") value = value.toString();
    const min_sec = value.split(":");
    const minutes = parseInt(min_sec[0]) * 60;
    const seconds = parseInt(min_sec[1]);
    return minutes + seconds;
}
const convertToMinutesFormat = (value: string | number): string =>{
    if(typeof(value) === "string") value = parseInt(value);
    const minutes = ("00" + Math.floor(value / 60)).slice(-2);
    const seconds = ("00" + Math.floor(value % 60)).slice(-2);
    return `${minutes}:${seconds}`;
}
const getMinutes = (value: number | string) => {
    if (typeof(value) === "string") value = parseInt(value); 
    return value / 60;
}
const getSeconds = (value: number | string) => {
    if(typeof(value) === "string") value = parseInt(value); 
    return value % 60;
}
const addZeroLeft = (value: string | number) : string => ("00" + value.toString()).slice(-2);
export {
    convertToMinutesFormat,
    convertToNumberFormat,
    getMinutes,
    getSeconds,
    addZeroLeft
}