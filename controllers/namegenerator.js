var WordPOS = require('wordpos'),
    wordpos = new WordPOS();

module.exports = {
    getNames: function () {

        const names = [];

        generateName(wordpos.randAdjective(), wordpos.randNoun());
        generateName(wordpos.randAdjective(), wordpos.randNoun());
        generateName(wordpos.randAdjective(), wordpos.randNoun());
        generateName(wordpos.randAdjective(), wordpos.randNoun());
        generateName(wordpos.randAdjective(), wordpos.randNoun());

        setTimeout(() => {
            console.log(names);
            return names;
        }, 1000);

        function generateName(promise1, promise2) {
            Promise.all([promise1, promise2]).then(function (values) {

                var string1 = values[0].toString();
                var stringOne = string1[0].toUpperCase() +
                    string1.slice(1);

                var string2 = values[1].toString();
                var stringTwo = string2[0].toUpperCase() +
                    string2.slice(1);

                var output = stringOne + stringTwo + (Math.floor(Math.random() * 100));
                names.push(output);
            });
        };
    }
};