# TangleNet
IOTA IXI Module to read web content from the Tangle

TangleNet on IOTA Ecosystem: https://ecosystem.iota.org/projects/tanglenet

## Setup

Setup a local fullnode and run it
```
https://github.com/iotaledger/iri
```
PS.: A few changes required on IRI are on their way. For now you need to use my iri branch
```
https://github.com/brunoamancio/iri
```

Sync the vanilla way or download the database
```
http://db.iota.partners/IOTA.partners-mainnetdb.tar.gz
```
For testing purposes only: if you download the database you don’t need to keep synced, as long as your test transactions are available in the database you have downloaded.

Clone this repo in your IXI directory (/ixi which, per default, is in the same folder as your iri-*.jar)
```
git clone https://github.com/brunoamancio/TangleNet
```
That's it. The IRI should load the IXI module automatically.

You should see this in the IRI log
```
[main] INFO  com.iota.iri.IXI - Searching: ixi/TangleNet
[main] INFO  com.iota.iri.IXI - Loading module: TangleNet
[main] INFO  com.iota.iri.IXI - Starting script: ixi/TangleNet/index.js
TangleNet extension started...
```

## How to use
Option 1 - Use curl:
```
curl http://localhost:14265/ -X POST -H "Content-Type: application/json" -H "X-IOTA-API-Version: 1" -d "{'command': 'TangleNet.view', 'tail' : ''}"
```
Option 2 - Use your browser:
http://localhost:14265/?command=TangleNet.view&tail=

The tail parameter is the hash of the transaction with index 0 in the bundle with the web content.

## Examples

Hello World transaction:
```
BUUFWGXQYVHQNEDRHWLMRYWWKRGIJ9FDGQL9AA9XNSKYYPHJDIRBMJNQNGNUJXHMB9UYSQCDDJEJA9999
```
Preview:
https://thetangle.org/transaction/BUUFWGXQYVHQNEDRHWLMRYWWKRGIJ9FDGQL9AA9XNSKYYPHJDIRBMJNQNGNUJXHMB9UYSQCDDJEJA9999

This transaction will NOT work after a snapshot, since transactions are removed. You must send your own transaction to the tangle and consume it.
