const colors = {
    default:"\x1b[0m",
    red:"\x1b[31m",
    green:"\x1b[32m",
    yellow:"\x1b[33m",
    blue:"\x1b[34m",
    magenta:"\x1b[35m",
    cyan:"\x1b[36m",
    white:"\x1b[37m",
    bgRed:"\x1b[41m",
    bgGreen:"\x1b[42m",
    bgYellow:"\x1b[43m",
    bgBlue:"\x1b[44m",
    bgMagenta:"\x1b[45m",
    bgCyan:"\x1b[46m",
    bgWhite:"\x1b[47m",
    bold:"\x1b[1m",
    italic:"\x1b[3m",
    underline:"\x1b[4m",
    blink:"\x1b[5m",
    reverse:"\x1b[7m",
    hidden:"\x1b[8m",
    line:"\x1b[2m"
}
const color = (...cmd) => {
    const color = cmd[0];
    const text = cmd.slice(1);
    return colors[color]+text+colors.default;
}
module.exports = color;