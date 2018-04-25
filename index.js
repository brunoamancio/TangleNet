var iri = com.iota.iri;

var Callable = iri.service.CallableRequest;
var Response = iri.service.dto.IXIResponse;

var Hash = iri.model.Hash;
var BundleValidator = iri.BundleValidator;
var Transaction = iri.controllers.TransactionViewModel;
var Converter = iri.utils.Converter;

function viewImplementation(request) {

    var transactionHash = new Hash("BUUFWGXQYVHQNEDRHWLMRYWWKRGIJ9FDGQL9AA9XNSKYYPHJDIRBMJNQNGNUJXHMB9UYSQCDDJEJA9999");
    var transactionList = BundleValidator.validate(IOTA.tangle, transactionHash);

    var firstTransaction = transactionList[0];

    print("firstTransaction",firstTransaction);
    print("firstTransaction[0]",firstTransaction[0]);

    //var message = firstTransaction.stream().map(function (tx) { return Converter.trytes(tx.getSignature())}).toArray()

    var trytes = Converter.trytes(firstTransaction[0].getSignature());
    var html_content = fromTrytes(trytes);

    var response = { content_type: "text/html",
                     content: html_content };

    return Response.create(response);
}

//
//  Trytes to bytes
//  2 Trytes == 1 Byte
//  We assume that the trytes are a JSON encoded object thus for our encoding:
//    First character = {
//    Last character = }
//    Everything after that is 9's padding
//
function fromTrytes(inputTrytes) {

    // If input is not a string, return null
    if ( typeof inputTrytes !== 'string' ) return null

    // If input length is odd, return null
    if ( inputTrytes.length % 2 ) {
      // quickfix
      inputTrytes+= "9"
    }

    var TRYTE_VALUES = "9ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var outputString = "";

    for (var i = 0; i < inputTrytes.length; i += 2) {
        // get a trytes pair
        var trytes = inputTrytes[i] + inputTrytes[i + 1];

        var firstValue = TRYTE_VALUES.indexOf(trytes[0]);
        var secondValue = TRYTE_VALUES.indexOf(trytes[1]);

        var decimalValue = firstValue + secondValue * 27;
        if(decimalValue === 0) continue; // Null character
        if(decimalValue == 10) continue; // New line character

        var character = String.fromCharCode(decimalValue);

        outputString += character;
    }

    return outputString;
}

API.put("view", new Callable({ call: viewImplementation }));
