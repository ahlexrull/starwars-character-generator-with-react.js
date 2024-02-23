import logo from './logo.svg';
import './App.css';
import React from 'react';

const baseUrl = 'https://raw.githubusercontent.com/akabab/starwars-api/master/';

class FilmItemRow extends React.Component{
  render(){
    return (
      <li>
        <a href={this.props.url}>{this.props.url}</a>
      </li>
    )
  }
}

class StarWars extends React.Component{
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
    const path = `api/id/${randomNumber}.json`;

    const starwarsCharacterData = await fetch(baseUrl+path)
      .then(response => response.json());

    this.setState({
      name: starwarsCharacterData.name,
      height: starwarsCharacterData.height,
      homeworld: starwarsCharacterData.homeworld,
      imageUrl: starwarsCharacterData.image,
      loadedCharacter: true
    })
  }

  render() {
    const movies = this.state.films.map((url, i ) => {
      return <FilmItemRow key={i} url={url} />
    })

    return (
     <div>
      <div className = 'content'>
        {
          this.state.loadedCharacter && 
            <div>
              <img id='portrait' src={this.state.imageUrl}/>
              <h1>{ this.state.name}</h1>
              <p>{this.state.height} m</p>
              <p>Homeworld: {this.state.homeworld}</p>
              <ul>
                {movies}
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
      <div className="bg-img" style={{backgroundImage: `url(${this.state.imageUrl})`}}></div>
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
