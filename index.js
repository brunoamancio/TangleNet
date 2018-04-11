var iri = com.iota.iri;

var Callable = iri.service.CallableRequest;
var Response = iri.service.dto.IXIResponse;

var Hash = iri.model.Hash;
var Bundle = iri.controllers.BundleViewModel;

function viewImplementation(request) {
    var bundleHash = new Hash("CWYSLZWQEJHKAN9EYNGQBF9ZHNCVCTOZWUHFKCOEZNLYW9YSIKG9ZEULZKEIJHW9FBPQCCRWHYGCVEEOX");

    return Response.create({
        content: "dummy html content",
        bundleHashes: Bundle.load(IOTA.tangle, bundleHash).getHashes()
    });
}

API.put("view", new Callable({ call: viewImplementation }));