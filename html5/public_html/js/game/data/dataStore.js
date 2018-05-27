/* == START FILE ========================================================= */
// DATA STORE
var DataStore = function (parent) {
	var that = {
		jsonDataOther: null,
		jsonDataPers1: null,
		jsonDataPers2: null,
		jsonDataPers3: null,

		showData: function () {
			console.log(parent);
			console.log('initialization', parent.initialization);
			console.log('mapPlanets', parent.initialization.mapPlanets);
			console.log('mapMessage', parent.initialization.mapMessage);
			console.log('levels', parent.initialization.levels);
			console.log('commandUser', parent.initialization.commandUser);
			console.log('commandAI', parent.initialization.commandAI);
			console.log('personages', parent.initialization.personages);
			console.log('planets', parent.initialization.planets);
			console.log('score:',
				parent.initialization.userExperiencePoints,
				parent.initialization.userTotalPointsPlayerTournament,
				parent.initialization.userlTotalPointsPlayerLevel,
				parent.initialization.userExperiencePointsAI,
				parent.initialization.userTotalBattle);
			console.log('config', parent.config);
			console.log('game over', parent.gameOver);
		},

		getData: function () {
			VK.api('storage.get', { keys: 'swh_data_other, swh_data_pers1, swh_data_pers2, swh_data_pers3' }, parent.onVkDataGet, parent.onVkDataGet);
		},

		setData: function () {
			// json for other
			that.jsonDataOther = '{';
			that.jsonDataOther += '"gameover": '+ parent.gameOver.toString() + ',';
			that.jsonDataOther += '"side": "' + parent.config.side + '",';
			that.jsonDataOther += '"levels_planets": {';
			for (var value in parent.initialization.levels) {
				that.jsonDataOther += '"' + value + '": ["'
					+ parent.initialization.levels[value].name + '", "'
					+ parent.initialization.planets[value].status + '"]';
				if (value !== 'Jakku') that.jsonDataOther += ','
			}
			that.jsonDataOther += '},';
			that.jsonDataOther += '"commandUser": [' +
				'"' + parent.initialization.commandUser.personage1 + '",' +
				'"' + parent.initialization.commandUser.personage2 + '",' +
				'"' + parent.initialization.commandUser.personage3 + '"' +
				'],';
			that.jsonDataOther += '"commandAI": [' +
				'"' + parent.initialization.commandAI.personage1 + '",' +
				'"' + parent.initialization.commandAI.personage2 + '",' +
				'"' + parent.initialization.commandAI.personage3 + '"' +
				'],';
			that.jsonDataOther += '"userExperiencePoints": ' + parent.initialization.userExperiencePoints + ',';
			that.jsonDataOther += '"userTotalPointsPlayerTournament": ' + parent.initialization.userTotalPointsPlayerTournament + ',';
			that.jsonDataOther += '"userlTotalPointsPlayerLevel": ' + parent.initialization.userlTotalPointsPlayerLevel + ',';
			that.jsonDataOther += '"userExperiencePointsAI": ' + parent.initialization.userExperiencePointsAI + ',';
			that.jsonDataOther += '"userTotalBattle": ' + parent.initialization.userTotalBattle + '';
			that.jsonDataOther += '}';

			//console.log('JSON', that.jsonDataOther);

			//json for personages
			that.jsonDataPers1 = '{';
			that.jsonDataPers2 = '{';
			that.jsonDataPers3 = '{';
			var i = 0;
			for (var pers in parent.initialization.personages) {
				if (i <= 30) {
					that.jsonDataPers1 += '"' + pers + '": [' 
						+ parent.initialization.personages[pers].command.toString() + ','
						+ parent.initialization.personages[pers].hitAttack1 + ','
						+ parent.initialization.personages[pers].hitAttack2 + ','
						+ parent.initialization.personages[pers].hitAttack3 + ','
						+ parent.initialization.personages[pers].hitAttack4 + ','
						+ parent.initialization.personages[pers].hitAttack5 + ','
						+ parent.initialization.personages[pers].hitDefense1 + ','
						+ parent.initialization.personages[pers].hitDefense2 + ','
						+ parent.initialization.personages[pers].hitDefense3 + ','
						+ parent.initialization.personages[pers].hitDefense4 + ','
						+ parent.initialization.personages[pers].hitDefense5 + ','
						+ '"' + parent.initialization.personages[pers].life + '",'
						+ '"' + parent.initialization.personages[pers].status + '"]';
					if (i < 30) that.jsonDataPers1 += ',';
				} else if (i <= 60) {
					that.jsonDataPers2 += '"' + pers + '": [' 
						+ parent.initialization.personages[pers].command.toString() + ','
						+ parent.initialization.personages[pers].hitAttack1 + ','
						+ parent.initialization.personages[pers].hitAttack2 + ','
						+ parent.initialization.personages[pers].hitAttack3 + ','
						+ parent.initialization.personages[pers].hitAttack4 + ','
						+ parent.initialization.personages[pers].hitAttack5 + ','
						+ parent.initialization.personages[pers].hitDefense1 + ','
						+ parent.initialization.personages[pers].hitDefense2 + ','
						+ parent.initialization.personages[pers].hitDefense3 + ','
						+ parent.initialization.personages[pers].hitDefense4 + ','
						+ parent.initialization.personages[pers].hitDefense5 + ','
						+ '"' + parent.initialization.personages[pers].life + '",'
						+ '"' + parent.initialization.personages[pers].status + '"]';
					if (i < 60) that.jsonDataPers2 += ',';
				} else if (i <= 90) {
					that.jsonDataPers3 += '"' + pers + '": [' 
						+ parent.initialization.personages[pers].command.toString() + ','
						+ parent.initialization.personages[pers].hitAttack1 + ','
						+ parent.initialization.personages[pers].hitAttack2 + ','
						+ parent.initialization.personages[pers].hitAttack3 + ','
						+ parent.initialization.personages[pers].hitAttack4 + ','
						+ parent.initialization.personages[pers].hitAttack5 + ','
						+ parent.initialization.personages[pers].hitDefense1 + ','
						+ parent.initialization.personages[pers].hitDefense2 + ','
						+ parent.initialization.personages[pers].hitDefense3 + ','
						+ parent.initialization.personages[pers].hitDefense4 + ','
						+ parent.initialization.personages[pers].hitDefense5 + ','
						+ '"' + parent.initialization.personages[pers].life + '",'
						+ '"' + parent.initialization.personages[pers].status + '"]';
					if (pers !== "yoda") that.jsonDataPers3 += ',';
				}
				i++
			}
			that.jsonDataPers1 += '}';
			that.jsonDataPers2 += '}';
			that.jsonDataPers3 += '}';

			//console.log('JSON-1', that.jsonDataPers1);
			//console.log('JSON-2', that.jsonDataPers2);
			//console.log('JSON-3', that.jsonDataPers3);

			// Save data in VK
			VK.api('storage.set', { key: 'swh_data_other', value: that.jsonDataOther, global: 0 }, that.onVkDataSet, that.onVkDataSet);
			VK.api('storage.set', { key: 'swh_data_pers1', value: that.jsonDataPers1, global: 0 }, that.onVkDataSet, that.onVkDataSet);
			VK.api('storage.set', { key: 'swh_data_pers2', value: that.jsonDataPers2, global: 0 }, that.onVkDataSet, that.onVkDataSet);
			VK.api('storage.set', { key: 'swh_data_pers3', value: that.jsonDataPers3, global: 0 }, that.onVkDataSet, that.onVkDataSet);
		},

		onVkDataSet: function (response) {
			//console.log('VK SET DATA:', response);
		}
	}
	return that;
}
/* == END FILE ========================================================== */