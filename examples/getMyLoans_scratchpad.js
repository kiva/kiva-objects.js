(function () {

	var userId = 58499;
	var kiva = {};


//	var Loans = kiva.Object().extend()

	var Loans = kiva.Loans('getAll', {
		load: function () {

		}

		, save: function () {

		}

		, ready: function () {

		}
	});

	var loanId;


	var loans = kiva.Loans({
		get: function () {
			// gets the stuff from the server
		}

		, refresh: function () {

		}


		, ready: function (data) {
			// stuff to do after the stuff comes back
			var fundraisingLoans = kiva.Loans(data);

			fundraisingLoans.where({userId: myUserId});
		}

	});


	loans.ready(function () {

	});


	// Why is this called "Loans" when we are only getting one?
	var aLoan = kiva.Loans({id: loanId});

	var aLoanShortcut = kiva.Loans(loanId);


	kiva.User(userId);

	kiva.Teams(teamId);

	kiva.Teams('.83930')


	var myTeam = kiva.Teams({userId: userId, teamName: teamName}).first();

	var myTeamId = myTeam.id;

	var myLoansForMyTeam = kiva.Loans({userId: userId, teamId: teamId});

	var teamId = 79290;
	var myLoansbyMyTeam = myLoans.where({teamId: teamId});

	var myMostRecentLoan = myLoans.sortBy('transactionDate').first();

	var myLast10Loans = myLoans.sortBy('transactionDate').slice(0, 10);


	var aUser = kiva.User(userId);
//	aUser

}());


// object spitter outer - singleton
// "fetch by" a shortcut method that does all the typical calls in one fell swoop