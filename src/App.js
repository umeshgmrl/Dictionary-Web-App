import React, { Component } from "react";
const API_URL = "https://vocabulary.now.sh";

class App extends Component {
  state = {
    words: [],
    word: null,
    loading: false,
    keyDownCount: -1,
  };

  componentDidMount() {
    window.onkeyup = (e) => {
      if (
        e.key === "ArrowDown" &&
        this.state.keyDownCount < this.state.words.length - 1
      ) {
        this.setState({
          keyDownCount: this.state.keyDownCount + 1,
        });
      }
      if (e.key === "ArrowUp" && this.state.keyDownCount > 0) {
        this.setState({
          keyDownCount: this.state.keyDownCount - 1,
        });
      }
    };
  }

  fetchWords = (e) => {
    if (!e.target.value) return;
    window
      .fetch(`${API_URL}/words/${e.target.value}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          this.setState({
            words: res.data,
          });
        }
        this.setState({
          keyDownCount: -1,
        });
      });
  };

  fetchWord = (word) => {
    this.setState({
      loading: true,
    });

    window
      .fetch(`${API_URL}/word/${word}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          this.setState({
            word: {
              name: word,
              explanation: res.data,
            },
            words: [],
            loading: false,
            keyDownCount: -1,
          });
        }
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.keyDownCount > -1) {
      this.fetchWord(this.state.words[this.state.keyDownCount].name);
    }
  };

  render() {
    const { words, word, loading } = this.state;
    return (
      <div className="container">
        <header>
          <h2>Dictionary</h2>
        </header>
        <main>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              onChange={this.fetchWords}
              placeholder="search..."
              autoFocus
            />
            {
              <ul>
                {words.map((word, id) => (
                  <li
                    key={id}
                    className={id === this.state.keyDownCount ? "bg-gray" : ""}
                    onClick={() => {
                      this.fetchWord(word.name);
                    }}
                  >
                    <strong>{word.name}: </strong>
                    {word.description}
                  </li>
                ))}
              </ul>
            }
          </form>
          {word && (
          <div className="word-wrapper">
            <h1>{word.name}</h1>
            <p className="explanation">{word.explanation}</p>
          </div>
        )}

        {loading && (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        </main>
        <footer>
          <a href="https://github.com/umeshgmrl/Dictionary-Web-App" target="_blank" rel="noopener noreferrer" className="source-link">Source</a>
        </footer>
      </div>
    );
  }
}

export default App;
