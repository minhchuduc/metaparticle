(function() {
    var makeName = function(service) {
        return service.join(".");
    };

    module.exports.makeName = makeName;

    module.exports.makeGUID = function() {
        return Math.floor(Math.random() * 100000).toString(16);
    };

    module.exports.findServiceName = function(guid, services) {
        for (var key in services) {
            var name = recursiveFindServiceName(services[key], [], guid);
            if (name && name.length > 0) {
                return name;
            }
        }
        return null;
    };

    var recursiveFindServiceName = function(service, prefix, guid) {
        if (!service) {
            return null;
        }
        prefix.push(service.name);
        if (service.guid == guid) {
            return makeName(prefix);
        }
        if (service.subservices) {
            for (var key in service.subservices) {
                var name = recursiveFindServiceName(service.subservices[key], prefix, guid);
                if (name && name.length > 0) {
                    return name;
                }
            }
            prefix.pop();
        }
        return null;
    };
}());
