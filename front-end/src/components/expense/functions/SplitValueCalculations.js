export function equallyCalculatedValue(totalAmt, splitUsers) {
    const calculatedValues = totalAmt / splitUsers.length;
    return calculatedValues;
}

export function unequallyCalculatedValues(totalAmt, inputValue, splitType, totalShares) {
    let calculatedValue = 0;
    if (splitType == 'P') {
        calculatedValue = splitByPercentage(totalAmt, inputValue);
    }

    if (splitType == 'U') {
        calculatedValue = splitByAmount(inputValue);
    }

    if (splitType == 'S') {
        calculatedValue = splitByShares(totalAmt, inputValue, totalShares);
    }
    return calculatedValue;
}

export function splitByPercentage(totalAmt, inputValue) {
    return totalAmt * (inputValue / 100);
}

export function splitByAmount(inputValue) {
    return inputValue;
}

export function splitByShares(totalAmt, inputValue, totalShares) {
    return totalAmt * (inputValue / totalShares) || 0;
}
