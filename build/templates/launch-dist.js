// Don't use jQuery to append the script element! for some reason it adds its own cachebusting string to the src every time.
// $.getScript is supposed to do this. but pretty sure just appending a script isn't supposed to do that.
// maybe cause its an old version of jquery?
// maybe the game monkey patches it?
// who knows. but using HtmlElement.appendChild works as expected
$('head')[0].appendChild($('<script>').attr('src', '___DIST_URL___?___DIST_HASH___')[0]);