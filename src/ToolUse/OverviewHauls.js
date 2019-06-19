let here = document.location.toString();
if (here.includes('screen=overview_villages') && here.includes('mode=commands')) {
    TwCheese.actions.promptCommandHauls();
}
else {
    alert('To use this, you must be on the commands overview. It\'s recommended to use the \'return\' filter, since outgoing troops don\'t carry resources :)');
}