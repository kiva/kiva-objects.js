# Kiva jQuery API

A jQuery wrapper to handle basic requests to the Kiva API.

## Development

You will need the following to lint and unit test your changes.

* install [Nodejs](http://nodejs.org/)
* install [jsHint](http://www.jshint.com/)
* install [Jasmine](http://pivotal.github.com/jasmine/)

The following are some useful tools:

* install [npm](https://npmjs.org/)
* install [Grunt](http://gruntjs.com/)
* install [grunt-dox](https://github.com/punkave/grunt-dox)
* install [PhantomJs](http://phantomjs.org/)
* install [grunt-jasmine-runner](https://github.com/jasmine-contrib/grunt-jasmine-runner)

### Testing & building your changes

If you have all the recommended modules you can just run the following in the command line to test your changes:
(see grunt.js for the configuration options)

```
grunt
```

If everything come up "green", then you know you can check it in.

Often times it's usefull to run tests in an actual browser:

```
grunt jasmine-server
```

If you want to do a full build, run:

```
grunt build
```


## The public API

http://build.kiva.org/api

 JournalEntries
 GET /journal_entries/:id/comments
 GET /journal_entries/search

 Lenders
 GET /lenders/:lender_ids
 GET /lenders/:lender_id/loans
 GET /lenders/:lender_id/teams
 GET /lenders/newest
 GET /lenders/search

 LendingActions
 GET /lending_actions/recent

 Loans
 GET /loans/:ids
 GET /loans/:id/journal_entries
 GET /loans/:id/lenders
 GET /loans/:id/updates
 GET /loans/newest
 GET /loans/search

 Methods
 GET /methods
 GET /methods/:ids

 Partners
 GET /partners

 Releases
 GET /releases/api/current

 Teams
 GET /teams/:ids
 GET /teams/:id/lenders
 GET /teams/:id/loans
 GET /teams/search
 GET /teams/using_shortname/:shortnames

 Templates
 GET /templates/images
