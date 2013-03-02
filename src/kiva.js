(function ($, global) {
    var  version = 1
    , kivaApiVersion = 1
    , zipApiVersion = 1
    , kivaHost = 'api.kivaws.org'
    , zipHost = 'zip.kiva.org'

    , kivaPath = '/v'
    , zipPath = '/v';

    global.kiva = {
        ver: version
        , kVer: kivaApiVersion
        , zVer: zipApiVersion
        , kivaSrc: 'http://' + kivaHost + kivaPath + kivaApiVersion
        , zipSrc: 'http://' + zipHost + zipPath + zipApiVersion
    };

    //= src/Object.js
    //= src/Request.js
    //= src/Requests/Loans.js
    //= src/Requests/Lenders.js
    //= src/Requests/Teams.js
}(jQuery, this));
