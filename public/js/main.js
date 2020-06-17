(function ($) {

	"use strict";

	var fullHeight = function () {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function () {
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').toggleClass('active');
	});

})(jQuery);
$(document).ready(function () {
	// Activate tooltip
	$('[data-toggle="tooltip"]').tooltip();

	// Select/Deselect checkboxes
	var checkbox = $('table tbody input[type="checkbox"]');
	$("#selectAll").click(function () {
		if (this.checked) {
			checkbox.each(function () {
				this.checked = true;
			});
		} else {
			checkbox.each(function () {
				this.checked = false;
			});
		}
	});
	checkbox.click(function () {
		if (!this.checked) {
			$("#selectAll").prop("checked", false);
		}
	});
});
$(".edit").click(function () {
	var $row = $(this).closest("tr");
	$('input[name="nom"]').val($(".nom", $row).text());
	$('input[name="email"]').val($(".email", $row).text());
	$('input[name="adresse"]').val($(".adresse", $row).text());
	$('input[name="telephone"]').val($(".telephone", $row).text());
  });

  $(".edit").click(function () {
	var $row = $(this).closest("tr");
	$('input[name="filiere"]').val($(".filiere", $row).text());
	$('input[name="coordonnateur"]').val($(".coordonnateur", $row).text());
	
  });

  
  $(".logout_btn").click(function (e) {
	
	e.preventDefault();
	$.ajax({
		type: "POST",
		url: "http://localhost:5000/users/logout",
		
		success: function (result) {
			
			
			 window.location='http://localhost:5000';
				
				  
			
		}
			
	});
	
	
});


