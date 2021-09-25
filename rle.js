let fs = require('fs');
let arg = process.argv;
let inText;
let i = 0, n = 1;
let answerString = '';

fs.readFile(arg[3], (err, data) => {
	if (err){
		console.error(err);
		return;
	}
	inText = data.toString();
	if (arg[2] == 'code'){
		while (i < inText.length){
			while (inText.charAt(i) == inText.charAt(i + n)){
				n++;
			}
			i += n - 1;
			while (n > 255){
				answerString += '#' + String.fromCharCode(255) + inText.charAt(i);
				n -= 255
			}
			if (n > 3 || inText.charAt(i) == '#'){
				answerString += '#' + String.fromCharCode(n) + inText.charAt(i);
			} else {
				answerString += inText.charAt(i).repeat(n);
			}
			i++;
		}
	} else if (arg[2] == 'decode'){
		while (i < inText.length){
			if (inText.charAt(i) == '#'){
				answerString += inText.charAt(i + 2).repeat(inText.charAt(i + 1).charCodeAt(0));
				i += 3;
			} else {
				answerString += inText.charAt(i);
				i++;
			}
		}
	}
	fs.writeFile(arg[4], answerString, (err) => {
            if (err){
                console.err(err);
                return;
            }
	});
    console.log('The file has been saved!');
});