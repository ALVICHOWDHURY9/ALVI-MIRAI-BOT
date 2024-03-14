module.exports.config = {
	name: "mathematics",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "kudos",
	description: "",
	commandCategory: "Study, learn more, learn forever",
	cooldowns: 0
};

module.exports.run = ({ event, api }) => api.sendMessage(`  Constant Consciousness

1/ Square of 1 sum: (a + b)² = a² + 2ab + b² = (a − b)² + 4ab

2/ Square of 1 difference: (a − b)² = a² - 2ab + b² = (a + b)² − 4ab

3/ Difference 2 squared: a² − b² = (a − b)(a + b)

4/ The cube of 1 sum: (a + b)³ = a³ + 3a²b + 3ab² + b³

5/ The cube of 1 difference: (a − b)³ = a³ − 3a²b + 3ab² − b³

6/ Sum of 2 cubes: a³ + b³ = (a + b)(a² − ab + b²) = (a + b)³ − 3a²b − 3ab² = (a + b)³ − 3ab(a + b)

7/ Difference of 2 cubes: a³ − b³ = (a − b)(a² + ab + b²) = (a − b)3 + 3a²b − 3ab² = (a − b)3 + 3ab(a − b)

Related systems

1/ (a + b + c)³ = a³ + b³ + c³ + 3(a + b)(b + c)(a + c)

2/ a³ + b³ + c³ − 3abc = (a + b + c)(a² + b² + c² − ab − bc − ac)

3/ (a − b − c)² = a² + b² + c² - 2ab + 2bc − 2ac

4/ (a + b + c)² = a² + b² + c² + 2ab + 2bc + 2ac

5/ (a + b − c)² = a² + b² + c² + 2ab − 2bc − 2ac`, event.threadID, event.messageID);