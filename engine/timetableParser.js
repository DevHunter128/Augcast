var readline = require ('readline');
var fs = require ('fs');

const SECONDS_IN_HOURS = 3600;
const SECONDS_IN_MINUTES = 60;

module.exports.parseTimetable = function (timetablePath) {

    let timeArray = [];

    const rl = readline.createInterface({
        input: fs.createReadStream(timetablePath)
    });

    rl.on ('line', function (line) {
        let tokens = line.split (':');

        let hours = parseInt(tokens[1]);
        let minutes = parseInt(tokens[2]);
        let seconds = parseInt(tokens[3]);

        let timeInSeconds = hours * SECONDS_IN_HOURS +
                            minutes * SECONDS_IN_MINUTES +
                            seconds;

        timeArray.push (timeInSeconds);

    })

    rl.on ('close', function () {
        return timeArray;
    });
}

//parseTimetable ('ocr_output/cse100-a-0/timetable.txt');
