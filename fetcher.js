const request = require('request');
const fs = require('node:fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const inputs = process.argv.slice(2);
console.log(inputs);

request(inputs[0], (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  if (inputs[1]) {
    rl.question("File path already exists. To overwrite enter 'Y' ", (answer) => {
      if (answer === 'Y') {
        fs.writeFile(inputs[1], body, err => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Downloaded and saved ${body.length} bytes to ${inputs[1]}`);
          }
        });
      }
    });
  }
});

