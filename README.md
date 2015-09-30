# Particle events to ElasticSearch feeder

## Usage
[![Deploy to Tutum](https://s.tutum.co/deploy-to-tutum.svg)](https://dashboard.tutum.co/stack/deploy/)

Or run on your own Docker:

```
$ docker run -e ACCESS_TOKEN=<PARTICLE_TOKEN> -e ELASTICSEARCH_HOST=<ES_HOST> suda/particle-elasticsearch
```

Image can be also linked to ElasticSearch container:

```
$ docker run -e ACCESS_TOKEN=<PARTICLE_TOKEN> --link elasticsearch suda/particle-elasticsearch
```

## Docker env variables
* `ACCESS_TOKEN` - [Particle access token](https://docs.particle.io/reference/api/#authentication)
* `ELASTICSEARCH_HOST` - _optional_ ElasticSearch host
* `ELASTICSEARCH_INDEX` - _optional_ ElasticSearch index name (default: `particle`)
