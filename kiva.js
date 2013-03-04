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

    // @todo Probably need to revisit this code
    // @hack to get around jshint (https://github.com/jshint/jshint/issues/525)
    var Fn = Function;
    
    
    /**
     *
     * @constructor
     */
    kiva.Object = function () {};
    
    
    /**
     * Creates a new Constructor function that "inherits" from "this".
     *
     * @param {Object} props
     * @return {Object}
     */
    kiva.Object.extend = function (props) {
    	var Func = function (){}
        , Child = props && props.name
    		? new Fn ('return function ' + props.name + ' () {}')()
    		: function () {};
    
        Func.prototype = this.prototype;
        Child.prototype = new Func();
    
        $.extend(Child.prototype, props);
        $.extend(Child, this);
    
        Child.__proto__ = this.prototype;
        Child.__super__ = this;
    
    	return Child;
    };
    
    
    /**
     * Creates a new object that inherits from "this"
     *
     * @param args
     */
    kiva.Object.create = function (args) {
    	// @todo again, this if for jshint...
    	var This = this;
    	var newObj = new This();
    
    	return $.extend(newObj, args);
    };

    kiva.Request = kiva.Object.extend({
    
    	name: 'Request'
    	, kivaSrc: kiva.kivaSrc
    	, zipSrc: kiva.zipSrc
    	, content: {}
        , _status: ''
    
    
    	, buildUrl: function (args) {
    		var ids, action, entity, params
    		, url = [this.kivaSrc, this.name.toLowerCase()];
    
    		if (args) {
    			if ($.isArray(args)) {
    				ids = args;
    			} else if (typeof args == 'number') {
    				ids = [args];
    			} else {
    				ids = args.ids;
    				action = args.action;
                    entity = args.entity;
    			}
    
    			if (ids && !$.isArray(ids)) {
    				throw 'Error: "ids" must be an array';
    			}
    
    			if (action) {
    				if (ids) {
    					url.push(ids[0]);
    				}
    
    				url.push(action);
    			} else if (ids) {
    				ids = ids.join(',');
    				url.push(ids);
    			}
    
                if (entity) {
                    url.push(entity);
                }
    		}
    
    		return url.join('/') + '.json';
    	}
    
    
    	/**
    	 *
    	 * @param {String} status
    	 * @param {Object} [data]
    	 */
    	, status: function (status, data) {
    		if (status && (this._status != status)) {
    			this._status = status;
    		}
    
    		return this._status;
    	}
    
    
    	/**
    	 * Loads data onto the Entity
    	 *
    	 * @param {Object} data
    	 */
    	, load: function (data) {
    		this.content = $.extend(this.content, data);
    		this.status('loaded', data);
    	}
    
    
    	/**
    	 *
    	 * @param ids
    	 * @returns {kiva.Request}
    	 */
    	, fetch: function (args) {
    		var _this = this
            , params = args.params || {};
    
    		this.status('fetching');
    		this.jqXhr = $.getJSON(this.buildUrl(args), params)
    				.progress(function () {
    					_this.status('progress')
    				})
    				.fail(function () {
    					_this.status('failed');
    				})
    				.done(function (response) {
    					_this.load(response[_this.name.toLowerCase()])
    				});
    
    		return this;
    	}
    });

    kiva.Lenders = kiva.Request.extend({
    	name: 'Lenders'
    });
    kiva.Loans = kiva.Request.extend({
    	name: 'Loans'
    });
    kiva.Teams = kiva.Request.extend({
        name: 'Teams'
    });
}(jQuery, this));
