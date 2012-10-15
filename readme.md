# Kiva jQuery API

A jQuery wrapper to handle basic requests to the Kiva API.

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
