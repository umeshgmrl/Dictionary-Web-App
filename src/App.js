import React, { Component } from "react";
const API_URL = "https://vocabulary.now.sh"

class App extends Component {
  state = {
    words: null,
    word: null,
    loading: false,
    search: "",
  };
  fetchWords = e => {
    if (!e.target.value) return;
    fetch(`${API_URL}/words/${e.target.value}`)
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.setState({
            words: res.data
          });
        }
      });
  };

  fetchWord = word => {
    this.setState({
      loading: true
    });

    fetch(`${API_URL}/word/${word}`)
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.setState({
            word: {
              name: word,
              explanation: res.data,
            },
            words: null,
            loading: false
          });
        }
      });
  };

  handleInputChange = (e) => {
    if (!e.target.value) return;
    this.setState({
      search: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    const { words, word, loading } = this.state;
    return (
      <div className="container">
        <header>
          <h2>Dictionary</h2>
        </header>
        <main>
        <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.fetchWords} placeholder="search..." autoFocus />
            {words && (
          <ul>
            {words.map((word, id) => (
              <li
                key={id}
                onClick={() => {
                  this.fetchWord(word.name);
                }}
              >
                <strong>{word.name}: </strong>
                {word.description}
              </li>
            ))}
          </ul>
        )}
          </form>
        </main>
        {word && (
          <div className="word-wrapper">
            <h1>{word.name}</h1>
            <p className="explanation">{word.explanation}</p>
          </div>
        )}
        
        {
          loading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        }
        
      </div>
    );
  }
}

export default App;
