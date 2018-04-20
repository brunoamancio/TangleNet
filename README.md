# TangleNet
IOTA IXI Module to read web content from the Tangle

## Setup

Setup a local full node and run it
```
https://github.com/iotaledger/iri
```

Download the actual database
```
http://db.iota.partners/IOTA.partners-mainnetdb.tar.gz
```
This is a service, which provides you always the actual database. You don’t need a synced iri with neighbors, just download the database again.

Clone this repo in your ixi directory ( iri/target/ixi )
```
git clone https://github.com/brunoamancio/TangleNet
```
That's it. The iri should load the ixi module automaticly.

You should see this in the iri log
```
[main] INFO  com.iota.iri.IXI - Searching: ixi/TangleNet
[main] INFO  com.iota.iri.IXI - Loading module: TangleNet
[main] INFO  com.iota.iri.IXI - Starting script: ixi/TangleNet/index.js
TangleNet extension started...
```

## How to use
Use curl:
```
curl http://localhost:14265/ -X POST -H "Content-Type: application/json" -H "X-IOTA-API-Version: 1" -d "{'command': 'TangleNet.view'}"
```

## Examples

Hello World BundleHash:
```
CWYSLZWQEJHKAN9EYNGQBF9ZHNCVCTOZWUHFKCOEZNLYW9YSIKG9ZEULZKEIJHW9FBPQCCRWHYGCVEEOX
```
Preview:
https://thetangle.org/bundle/CWYSLZWQEJHKAN9EYNGQBF9ZHNCVCTOZWUHFKCOEZNLYW9YSIKG9ZEULZKEIJHW9FBPQCCRWHYGCVEEOX
