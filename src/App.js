import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    words: null,
  }
  fetchWords = e => {
    fetch(`https://www.vocabulary.com/dictionary/autocomplete?search=${e.target.value}`)
      .then(res => res.text())
      .then(data => {
        let div = document.createElement('div');
        div.innerHTML = data;
        const words = div.innerText.split('\n').filter(Boolean).map(wordData => {
          let wordArray = wordData.split(' ');
          return {
            name: wordArray.shift(),
            description: wordArray.join(' ')
          }
        });
        this.setState({
          words
        }, () => {
          div = null;
        })
      })
  }

  fetchWord = word => {
    fetch(`https://www.vocabulary.com/dictionary/definition.ajax?search=${word}&lang=en`)
      .then(res => res.text())
      .then(data => {
        let div = document.createElement('div');
        console.log(data);
      }) 
  }
  render() {
    const { words } = this.state;
    return (
      <div className="App">
        <h1>Dictionary</h1>
        <input type="text" onChange={this.fetchWords} />
        {
          words && <ul>
            {
              words.map((word, id)=> <li key={id} onClick={() => {this.fetchWord(word.name)}}><strong>{word.name}: </strong>{word.description}</li>)
            }
          </ul>
        }
      </div>
    );
  }
}

export default App;
