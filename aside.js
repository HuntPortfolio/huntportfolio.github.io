$(document).ready(function()
{
	$(window).resize(refreshAsides);

	// Image loading is asynch, update whenever
	// a new image is loaded.
	$('img').load(function()
	{
		refreshAsides();
	});

	// If the browser supports the new font loader API, use it.
	if (document.fontLoader)
	{
		document.fontLoader.notifyWhenFontsReady(function()
		{
			refreshAsides();
		});
	}

	// Uhh, just try again after a delay.
	window.setTimeout(refreshAsides, 200);

	refreshAsides();
});

function refreshAsides()
{
	// Ignore them if they're inline.
	if ($(document).width() < 800) return;

	// Vertically position the asides next to the span they annotate
	$("aside").each(function()
	{
		var aside = $(this);

		// Find the span with the same name
		var name = aside.attr("name");
		var span = $("span[name='" + name + "']");
		if (span == null)
		{
			window.console.log("Could not find span for '" + name + "'");
			return;
		}

		aside.offset({top: span.position().top - 3});
	});
}