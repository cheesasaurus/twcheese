if (game_data.screen === 'overview_villages' && game_data.mode === 'commands') {
    TwCheese.actions.promptCommandHauls();
}
else {
    alert('To use this, you must be on the commands overview. It\'s recommended to use the \'return\' filter, since outgoing troops don\'t carry resources :)');
}