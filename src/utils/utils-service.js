function toFixedDecimal(value) {
    return value.valueOf().toFixed(2) / 1;
}

function toRupeeFormat(value) {
    return toFixedDecimal(value).toLocaleString('en', 'INR');
}


export default {toRupeeFormat, toFixedDecimal};