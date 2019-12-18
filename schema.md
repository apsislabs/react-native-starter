game: # describes the meta-data for displaying the game in the store, library, or other places.
{
    "id": "kjdflkj",
    "title": "How to Host a Murder",
    "short_description": "A dinner party game for eight! So much fun, it's almost criminal!",
    "long_description": "..."

    "players": [8, 8],
    "publisher": "Decipher Inc.",
    "price": "blah",
    "iap_key": "foo",

    "media": {
        "cover": URL,
        "artwork": [URL]
    },

    "meta": {
        "authors": "customer author names",
        "series": "The Tragical Mystery Tour",
        "episode": 13,
        
        "item_number": 135
    }
}

game_contents: # describes the rules for what happens in a particular game. Chapters, Clues, Characters, etc.
{
    "id": "kjdflkj",
}

game_state: # Describes the events of a single-playthrough, who the host is, who is playing which character, where in the game we currently are, etc.
{

}

game_ownership: # Describes the ownership
{
    "id": "kjdflkj",
    "owned": true,
    "source": "ios" | "android" | "direct",
    "gift_copies": 2,
}