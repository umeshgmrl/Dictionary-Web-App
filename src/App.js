import React, { Component } from "react";

class App extends Component {
  state = {
    words: null,
    word: null,
    loading: false
  };
  fetchWords = e => {
    if (!e.target.value) return;
    fetch(`http://35.200.150.228:7778/words/${e.target.value}`)
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.setState({
            words: res.data.slice(0, 7)
          });
        }
      });
  };

  fetchWord = word => {
    this.setState({
      loading: true
    });

    fetch(`http://35.200.150.228:7778/word/${word}`)
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
  render() {
    const { words, word, loading } = this.state;
    return (
      <div className="container">
        <header>
          <h2>Dictionary</h2>
          <form>
            <input type="text" onChange={this.fetchWords} placeholder="search..." />
          </form>
        </header>
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
