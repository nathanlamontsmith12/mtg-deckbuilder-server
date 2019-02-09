# Magic The Gathering Deckbuilder 

## Express Backend

This app is powered by the excellent [Magic the Gathering API](https://docs.magicthegathering.io/) maintained by Andrew Backes. 

For information regarding the frontend (React), visit [this github page](https://github.com/)


## User Story 

### Does Not Require Account  
* User can search the MTG database by card name as well as set, cardtype, and format. These results can then be filtered by color and converted mana cost. (Does not require log in)
* User can view details on any card result. (Does not require log in)

### Requires Account 
* User can save cards to their personal card pool 
* User can view and sort cards in their card pool 
* User can add notes and pre-set card tags to their cards 
* User can create groups of cards called "decks"
* User has full CRUD on their decks 
* User can add cards to and remove cards from their decks 
* User can add notes and pre-set deck tags to their decks 
* User can remove cards from their card pool (which will also remove the card from any of the user's decks that contain it) 


## Wireframes 

Also available in the "wireframes" directory.

[Overview](docs/wireframes/00-birds-eye.png)


## Models 

### User
```
username: String,
password: String,
cardpool: [Card.schema],
decks: [Deck.schema],
faveCards: [String], // * 
hideCards: [String], // ** 
admin: {type: Boolean, default: false},
registered: Date
```
Notes: 
```
// * Array of card IDs
// ** Array of card IDs to keep in the user's cardpool, but remove from view 
```

### Card 
```
data: {type: Object, required: true} 
ctags: [String], // * 
ownerId: {type: String, required: true} // **
decks: [{deckId: String, copies: Number}],
fave: {type: Boolean, default: false}
hide: {type: Boolean, default: false}
```
Notes: 
```
// * Array of the tags for cards ("ctags") that a user has added to this card
// ** ID of the user in whose cardpool this card lives
```

### Deck
```
name: {type: String, required: true}
ownerId: {type: String, required: true}
description_short: String,
description_long: String,
dtags: [String], // *
cards: [{Cards.schema, copies: Number}],
```
Notes:
```
// * Array of the tags for decks ("dtags") that a user has added to this card
```

## API Documentation 

The server accesses information about cards through the Magic the Gathering API: https://docs.magicthegathering.io/ 

The data is returned from the following API endpoints, after which it is filtered by user-selected search options and processed for display.

Some brief game notes are included where necessary for those unfamiliar with the card game Magic: The Gathering (MTG).

These are the methods employed in consuming this API for the purposes of this deckbuilder app. However, the API is powerful and supports additional means of searching, which are well-documented on their [website](https://docs.magicthegathering.io/).

### Sets, Card Types, and Formats 

A list of the sets, card types, and formats to which individual cards belong can be obtained from API endpoints.

#### Get list of all sets  
```
https://api.magicthegathering.io/v1/sets
```
Cards are released in batches. These batches are called "sets" and have a unique name; many sets  have a distinctive theme and flavor, and sometimes add new abilities and features that are showcased in the set that introduces them. 

#### Get list of all card types
```
https://api.magicthegathering.io/v1/types
```
Every card has a particular type, such as "creature," "land", or "artifact." Cards of a particular type share certain gameplay mechanics. Moreover, some cards have effects that can only target specific types. (A card may say, "Destroy target creature," for instance.)

#### Get list of all formats 
```
https://api.magicthegathering.io/v1/formats
``` 
In competitive play there are different formats that dictate what cards are legal. Even outside of tournaments, in casual play, it is not uncommon for players to design decks with a certain format in mind, as it helps maintain game balance. 


### Searching for Cards 

#### Get cards by Id
```
https://api.magicthegathering.io/v1/cards/:cardId
```
Find the card by the database ID and "multiverse" ID, the latter being a unique number for each card on Wizard of The Coast's website [Gatherer](http://gatherer.wizards.com/Pages/Default.aspx). Note that a few cards not available on Gatherer are nonetheless in the API database, so a small fraction of cards searchable via this API lack a multiverse ID. 

#### Get cards by name 
```
https://api.magicthegathering.io/v1/cards?name=*
```
The API will return cards that have a name containing the query string. 

#### Get cards by set 
```
https://api.magicthegathering.io/v1/cards?set=*
```
Returns cards based on the set the card belongs to. This parameter should be the "set ID." The full list of sets accessable by this API is available to the user on the frontend as a dropdown menu. 

#### Get cards by cardtype
```
https://api.magicthegathering.io/v1/cards?type=*
```
Returns cards belonging to the specified type. The full list of cardtypes searchable using this API is available to the user on the frontend as a dropdown menu. 

#### Get cards by format 
```
https://api.magicthegathering.io/v1/cards?gameFormat=*
``` 
Returns cards that are legal in the specified format. The full list of formats recognized by this API is available to the user on the frontend as a dropdown menu. 

#### Get cards by converted mana cost (CMC)
```
https://api.magicthegathering.io/v1/cards?cmc=*
```
"Mana" works as the currency of MTG. While some cards do not require mana to play, the vast majority have a mana cost associated with them. This cost must be paid for the player to use the card. The converted mana cost is the total "mana price," regardless of color. This parameter must be a number. 

#### Get cards by color 
```
https://api.magicthegathering.io/v1/cards?color=*
```
Cards may be colorless, but most are associated with one or more of five colors: Blue, Black, White, Red, and Green. This data is stored as an array, as cards may belong to more than one color group. Multicolored cards will be included in the results to a search that queried at least one color group to which they belong. One can target a specific multicolor combination by setting this parameter equal to the colors they want, separated by commas. For instance, 
```
https://api.magicthegathering.io/v1/cards?color=White,Red
``` 


### Sorting and Combining 

#### Sorting Results  

The results can be sent already sorted by the API according to any field. This handy functionality is provided by the orderBy parameter:  
```
https://api.magicthegathering.io/v1/cards?name=angel&orderBy=toughness
```

The request can also specify page (default: 1) and pageSize (default 100) in order to target data deeper or earlier in the returned dataset: 
```
https://api.magicthegathering.io/v1/cards?page=50&pageSize=50
```

#### Combining Parameters 

All of the /cards parameters can be combined using "or" –– "and" logic by using a single pipe (|) for "or" and ampersand (&) for "and". 



## Special Thanks 

To [Andrew Backes](https://andrewbackes.com/), who currently maintains the [MTG API](https://magicthegathering.io/#) that powers this app. 