var particle = require('spark');
var elasticsearch = require('elasticsearch');

var host = null;
if (process.env.ELASTICSEARCH_PORT_9200_TCP_ADDR) {
	// Build ElasticSearch host from linked container
	host = process.env.ELASTICSEARCH_PORT_9200_TCP_ADDR + ':' + process.env.ELASTICSEARCH_PORT_9200_TCP_PORT;
} else if (process.env.ELASTICSEARCH_HOST) {
	host = process.env.ELASTICSEARCH_HOST;
} else {
	console.error('Unable to connect to ElasticSearch... Exiting...');
	process.exit(1);
}
var client = new elasticsearch.Client({
  host: host
});

var index = process.env.ELASTICSEARCH_INDEX || 'particle';

if (process.env.BASE_URL) {
	particle.baseUrl = process.env.BASE_URL;
}
particle.login({accessToken: process.env.ACCESS_TOKEN});
particle.getEventStream(false, 'mine', function onMineEvent(event) {
	if (!event) {
		console.log('??? Got empty event');
		return;
	}
	try {
		event.data = JSON.parse(event.data);
	} catch(e) {
		event.data = {
			raw: event.data
		};
	}
	var type = event.name;
	delete event.name;
	client.index({
		body: event,
		index: index,
		type: type
	}, function onError(error) {
		if (error) {
			console.error('!!!', error);
		}
	});
});
console.log('--> Listening for events...');
