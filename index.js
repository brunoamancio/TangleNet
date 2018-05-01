var iri = com.iota.iri;

var Callable = iri.service.CallableRequest;
var Response = iri.service.dto.IXIResponse;

var Hash = iri.model.Hash;
var BundleValidator = iri.BundleValidator;
var Transaction = iri.controllers.TransactionViewModel;
var Converter = iri.utils.Converter;

function viewImplementation(request) {
    var transactionHashString = request.get("tail");
    if(!transactionHashString){
        return Response.create(getEmptyContent());
    }

    var transactionHash = new Hash(transactionHashString);
    var transactionListParent = BundleValidator.validate(IOTA.tangle, transactionHash);
    var trytes = "";
    
    print("hash: " + transactionHash.toString());
    for (var i = 0; i < transactionListParent.size(); i++) {
        print("aa1");
        var transactionList = transactionListParent[i];
        print("aa2");
        for (var j = 0; j < transactionList.size(); j++) {
            var partialTrytes = Converter.trytes(transactionList[j].getSignature());
            print("signature :" + partialTrytes);
            trytes += partialTrytes;
        }
    }
    print("size: " + transactionListParent.size());
    print("trytes: " + trytes);

    var response = trytes ? { contentType : "text/html",
                              content: fromTrytes(trytes)
                            }
                          : getEmptyContent();
    return Response.create(response);
}

function getEmptyContent(){
    return { contentType: "text/html",
             content : "<!DOCTYPE html><html><header><title>TangleNet - No content found</title></header><body><div><b>No content</b> - Tail hasn't been defined or found.</div></body></html>"
    };
}

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
