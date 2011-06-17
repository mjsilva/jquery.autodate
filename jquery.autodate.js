/*
 * Automatically expand a date input (1.0)
 * by Manuel Joao Silva (www.manueljoaosilva.com)
 * mail@manueljoaosilva.com
 *
 * USAGE:
 * $("#foo").autodate();
 *
 * EXAMPLES:
 * 01 - expands to: {current year}-{current month}-01
 * 0102 - expands to: {current year}-02-01
 * 010212 - expands to: 2012-02-01
 * 010251 - expands to: 1951-02-01
 * 01022051 - expands to: 2051-02-01
 *
 * note 1: if user only inputs two digits in year if it's less than 50 expands to the future,
 *         if it's more than 50 expands to the past.
 *
 * note 2: only non numerica chars are wiped, that mean if user inputs something like 02-01 that
 *         will exand to {current year}-01-02.
 *
 *
 * DEPENDENCIES: This script requires jQuery to work.  Download jQuery at http://jquery.com
 *
 * -------------------------------------------------------------------------------------------
 * 
 * Copyright (C) 2011 by Manuel Joao Silva (http://manueljoaosilva.com)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

(function($)
{

	$.fn.autodate = function()
	{

		this.each(function()
		{
			// get todays' date
			var todaysDate = new Date();
			var currMonth = todaysDate.getMonth();
			var currYear = todaysDate.getFullYear();


			$(this).bind('blur', function()
			{

				var returnDate;
				var inputMonth;
				var inputDay;
				var inputYear;

				// if user doesn't have input we are out of here
				var userInput = $(this).val().replace(/[^0-9']/g, '');
				if (!userInput)
				{
					$(this).val("");
					return;
				}

				// get user input length
				var inputLength = userInput.length;

				// in case the user only inputs the day
				if (inputLength < 3)
				{
					if (!validDay(userInput))
					{
						alert("Data Invalida");
						focusField($(this));
						return;
					}

					// user only inputed the days
					returnDate = new Date(currYear, currMonth, userInput);
					setDate($(this), returnDate);
				}
				else if (inputLength < 5)
				{
					inputDay = userInput.substr(0, 2);

					if (!validDay(inputDay))
					{
						alert("Data Invalida");
						focusField($(this));
						return;
					}

					inputMonth = userInput.substr(2);

					if (!validMonth(inputMonth))
					{
						alert("Data Invalida");
						return;
					}

					// in javascript months begin at 0 (WHYYYY!!)
					inputMonth = inputMonth - 1;

					// user only inputed the days
					returnDate = new Date(currYear, inputMonth, inputDay);
					setDate($(this), returnDate);

				}
				else if (inputLength < 9)
				{
					inputDay = userInput.substr(0, 2);

					inputMonth = userInput.substr(2, 2);
					inputMonth = inputMonth - 1;

					inputYear = userInput.substr(4);
					inputYear = getClosestYear(inputYear);

					returnDate = new Date(inputYear, inputMonth, inputDay);
					setDate($(this), returnDate);

				}

			});

			// Helper functions
			var validDay = function(input)
			{
				return (parseInt(input, 10) > 0 && parseInt(input, 10) <= 31);
			};

			var validMonth = function(input)
			{
				return (parseInt(input, 10) > 0 && parseInt(input, 10) <= 12);
			};

			var setDate = function(element, dateObj)
			{
				element.val(dateObj.toString('yyyy-MM-dd'));
			};

			var getClosestYear = function(input)
			{

				input = parseInt(input, 10);

				// get years' input length
				//cast it to string first, javascript doesn't do length on int
				var r = input.toString();
				var inputLength = r.length;

				if (inputLength < 2 || inputLength === 3 || inputLength > 4)
				{
					return false;
				}
				else if (inputLength === 2)
				{
					var myCurrYear = currYear;
					if (input > 50) myCurrYear = currYear - 100;

					//cast to string so we can use substr
					myCurrYear = myCurrYear.toString();
					return myCurrYear.substr(0, 2) + input;
				}
				else if (inputLength === 4)
				{
					return input;
				}


			};

			var focusField = function(field)
			{
				setTimeout(function()
				{
					field.focus();
					field.select();
				}, 0);
			};

		});

		// allow jQuery chaining
		return this;

	};

})(jQuery);
