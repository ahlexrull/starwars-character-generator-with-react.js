import logo from './logo.svg';
import './App.css';
import React from 'react';

const baseUrl = 'https://swapi.dev/';

class StarWars extends React.Component {
  constructor() {
    super();
    this.state = {
      name: null,
      height: null,
      homeworld: null,
      films: [],
      loadedCharacter: false,
    }
  }

  async getNewCharacter() {
    const randomNumber = Math.round(Math.random() * 82 );
    const path = `api/people/${randomNumber}`;

    const starwarsCharacterData = await fetch(baseUrl+path)
      .then(response => response.json());

    const starwarsCharacterHomeworld = await fetch(starwarsCharacterData.homeworld)
      .then(response => response.json());

    const starwarsCharacterFilms = await Promise.all(
      starwarsCharacterData.films.map( filmUrl => {
        return fetch(filmUrl)
          .then(response => response.json())
          .then(data => {
            return data.title;
          })
      })
    );

    console.log(starwarsCharacterFilms);

    this.setState({
      name: starwarsCharacterData.name,
      height: starwarsCharacterData.height,
      homeworld: starwarsCharacterHomeworld.name,
      films: starwarsCharacterFilms,
      loadedCharacter: true
    })
    console.log( `State set for ${this.state.name}!`);
  }

  render() {
    return (
     <div>
      {
        this.state.loadedCharacter && 
          <div>
            <h1>{ this.state.name}</h1>
            <p>{this.state.height}</p>
            <p>Homeworld: {this.state.homeworld}</p>
            <ul>
              {
                this.state.films.map( film => {
                  return <li>{this.state.films}</li>;
                })
              }
            </ul>
          </div>
      }
      <button 
        type="button" 
        className="btn" 
        onClick={() => this.getNewCharacter()} 
      >
        Randomize Character
      </button>
     </div>
    )
  }
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <StarWars />
      </header>
    </div>
  );
}

export default App;
