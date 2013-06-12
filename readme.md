# Kiva jQuery API

A jQuery wrapper to handle basic requests to the Kiva API.

## The API

kiva.js provides request objects for easy fetching of objects from Kiva's API.

Here are some examples:

```
var loans;

// Fetch Loans
loans = kiva.Loans.create();
loans.fetch(46382);

// Or
loans = kiva.Loans.create();
loans.fetch([46382, 3829]);

// Or
loans = kiva.Loans.create();
loans.fetch({ids: [46382, 3829]});
```

You can also pass options to your request:
```
// Specify an "action"
loans = kiva.Loans.create();
loans.fetch({action: 'newest'}); // will add "/newest.json" to your url

// Specify some query parameters
loans = kiva.Loans.create();
loans.fetch({ids: [46382, 3829], params: {test: 1}}); // will add ?test=1 to your query string

// Specify a nested entity/model
loans = kiva.Loans.create();
loans.fetch({ids: [3829], entity: 'lenders'}); // returns lenders for loan endpoint
```

## Building kiva-objects.js

You can just use the kiva.js or kiva.min.js files in this directory. If you want to develop kiva-objects.js further you need to edit the files in the src/ folder, then use rigger to build it:
```
> npm install -g rigger
> rig src/kiva.js kiva/js	
