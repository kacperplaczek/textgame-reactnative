export const calculateRemainingTime = (endTime: number) => {
    const now = Math.floor(Date.now() / 1000);
    return endTime - now;
};
