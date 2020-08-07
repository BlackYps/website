require('dotenv').config();

let request = require('request');
let fs = require('fs');


module.exports.run = function run() {
    console.log(moment().format("DD-MM-YYYY - HH:mm:ss")  + ' - Updating leaderboards...');
    try{
        request(process.env.API_URL + '/leaderboards/global', function (error, response, body) {
            if (error || response.statusCode > 210){
                console.log(moment().format("DD-MM-YYYY - HH:mm:ss")  + ' - There was an issue while fetching leaderboards 1v1:');
                console.error(error);
                if (response) console.trace(response.statusCode);
                return;
            }
            
            let entries = JSON.parse(body);

            let csvArray = [];

            for(let i = 0; i < entries.data.length; i++) {
                let entry = entries.data[i];

                let data = {
                    label: entry.attributes.name,
                    value: {id: entry.id, page: Math.ceil((i + 1) / 100)}
                };

                csvArray.push(data);
            }

            fs.writeFile("members/global.json", JSON.stringify(csvArray), function(error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(moment().format("DD-MM-YYYY - HH:mm:ss")  + ' - User file created successfully for global.');
                }
            });
        });

        request(process.env.API_URL + '/leaderboards/ladder1v1', function (error, response, body) {
            if (error || response.statusCode > 210){
                console.log(moment().format("DD-MM-YYYY - HH:mm:ss")  + ' - There was an issue while fetching leaderboards 1v1:');
                console.error(error);
                if (response) console.trace(response.statusCode);
                return;
            }

            let entries = JSON.parse(body);

            let csvArray = [];

            for (let i = 0; i < entries.data.length; i++) {
                let entry = entries.data[i];

                let data = {
                    label: entry.attributes.name,
                    value: {id: entry.id, page: Math.ceil((i + 1) / 100)}
                };

                csvArray.push(data);
            }

            fs.writeFile("members/1v1.json", JSON.stringify(csvArray), function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(moment().format("DD-MM-YYYY - HH:mm:ss")  + ' - User file created successfully for 1v1.');
                }
            });

            processTopFivePlayers(entries);
        });
    }
    catch(e){
        console.log(moment().format("DD-MM-YYYY - HH:mm:ss")  + ' - An error occured while extracting leaderboards:');
        console.log(e);
    }
};

function processTopFivePlayers(users) {
	let topFive = [];

	for(var i = 0; i < Math.min(users.length, 5); i++) {
		let user = users.data[i];

		let data = {
			name: user.attributes.name,
			rank: user.attributes.mean
		};

		topFive.push(data);
	}

	fs.writeFile("members/top5.json", JSON.stringify(topFive), function(error) {
		if (error) {
			console.log(error);
		} else {
			console.log(moment().format("DD-MM-YYYY - HH:mm:ss")  + ' - User file created successfully for top five.');
		}
	});
}
