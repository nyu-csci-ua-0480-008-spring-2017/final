# Tic Tac Two

## Overview
Regular Tic-Tac-Toe is boring. The stategy has been clearly outlined and for many, is now rather intuitive. If you know how to play, going first at worst results in a tie, and going second at best ends in a tie. Thats no fun!.

Tic Tac Two take the rules and the basics of this timeless game and give it new life! Instead of playing on a 3x3 board, you place on 9 3x3 boards that create a 9x9 board. Here's the twist though, you aren't playing 9 games sequentially, you are playing 9 games in parallel!!! WOOOW! When one player playes a move in a box, their opponent can only play their next move in the same board that corresponds to the move that was just played. For example, if player one plays their move in the top left board in the top right spot, then their opponent must make their next move in the top right board.


## Data Model
The application will store Users and Games

1) Users will have login info to track their match histories (i.e. win/loss ratio, past opponents)
2) The game boards states will be saved on a db as well. This game state will include data such as who goes first, the player names, and a board state held as a 1-D array with 81 spaces.

```javascript
{
  username: "XXXtoefanaticXXX",
  opponent: "Owen F------ Wilson"
  hash: // a password hash,
  PlayerX: // A player name
  boardState: // Array of size 81 filled with 1/0 or true/false
  currentlyInGame: true
}
```

```javascript
Game object:
{
  user1: // a reference to a User Object
  user2: // a reference to a User Object
  PlayerX: a reference to a User Object
  CurrentTurn: a reference to a User Object
  ID: // Game ID number
  boardState: // Array of size 81 filled with 1/0 or true/false
  createdAt: // timestamp
}

User object:
{
  username: "XXXtoefanaticXXX",
  hash: // a password hash,
  previousOpponents: {name:"Owen F------ Wilson", wins: 10, losses: 0},
  currentlyInGame: true
  matches: // an array of Game objects
}
```

## [Link to Commented First Draft Schema](db.js) 

## Wireframes

![pages](documentation/Wireframe.pdf)

## Site map

![pages](documentation/Sitemap.pdf)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can join a que to be placed into a game with someone else that is in que.
4. as a user, I can play moves when it is my turn
5. as a user, I can check my match statistics
6. as a user, I can forfeit a match that I no longer want to play and return to the homepage (with my user db info altered to show a loss).

## Research Topics
* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
    * Passport.js
* (3 points) Spit up the components of my page using React.js
    * Main purpose is to create the interactive board in JS and display it cleanly.

8 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit_)


## [Link to Initial Main Project File](app.js) 