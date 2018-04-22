var iri = com.iota.iri;

var Callable = iri.service.CallableRequest;
var Response = iri.service.dto.IXIResponse;

var Hash = iri.model.Hash;
var Bundle = iri.controllers.BundleViewModel;
var BundleValidator = iri.BundleValidator;
var Transaction = iri.controllers.TransactionViewModel;
var Converter = iri.utils.Converter;

function viewImplementation(request) {
    var bundleHash = new Hash("CWYSLZWQEJHKAN9EYNGQBF9ZHNCVCTOZWUHFKCOEZNLYW9YSIKG9ZEULZKEIJHW9FBPQCCRWHYGCVEEOX");
    var bundleHashes = Bundle.load(IOTA.tangle, bundleHash).getHashes()

    var transactionHash = new Hash("BUUFWGXQYVHQNEDRHWLMRYWWKRGIJ9FDGQL9AA9XNSKYYPHJDIRBMJNQNGNUJXHMB9UYSQCDDJEJA9999");
    var transactionList = BundleValidator.validate(IOTA.tangle, transactionHash)

    var firstTransaction = transactionList[0];

    print("firstTransaction",firstTransaction)
    print("firstTransaction[0]",firstTransaction[0])

    var message = firstTransaction.stream().map(function (tx) { return Converter.trytes(tx.getSignature())}).toArray()
    print("message", message)

    return Response.create({
        content: "dummy html content",
        bundleHashes: bundleHashes,
        message: message
    });
}

API.put("view", new Callable({ call: viewImplementation }));