const random = (digit: number, min: number = 0, max: number = Math.pow(10, digit) - 1): number => {
    if (digit <= 0 || !Number.isInteger(digit) || min >= max) {
        throw new Error('Invalid arguments. Please provide a positive integer for digit, and ensure min < max.');
    }
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

    // Ensure the generated number has the specified number of digits
    const randomNumberString = randomNumber.toString();
    if (randomNumberString.length < digit) {
        // Pad with leading zeros if necessary
        return parseInt('0'.repeat(digit - randomNumberString.length) + randomNumberString);
    }
    return randomNumber;
};
export default random;
