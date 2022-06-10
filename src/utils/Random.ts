const getRandomItem = <T>(array: T[]): T => {
    const lenght = array.length;
    const randomIndex = Math.floor(Math.random() * lenght);
    return array[randomIndex];
}
export {
    getRandomItem
}