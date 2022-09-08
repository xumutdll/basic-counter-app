import { render } from "@testing-library/react";
import React, { Component } from "react";
import "./App.css";
import Counters from "./components/counters";
import NavBar from "./components/navbar";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 1 },
      { id: 3, value: 4 },
      { id: 4, value: 0 },
    ],
  };

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    // In order to not the change the state directly,
    // we create this copy of counters[index]
    counters[index].value++;
    return this.setState({ counters });
  };

  handleAddToALL = () => {
    const counters = [...this.state.counters];
    for (let index in counters) {
      counters[index].value++;
    }
    return this.setState({ counters });
  };

  handleNewCounter = () => {
    const counters = [...this.state.counters];
    counters.push({ id: counters.length + 1, value: 0 });

    return this.setState({ counters });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          totalCounters={this.state.counters.filter((c) => c.value > 0).length}
        />
        <main className="container">
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
            onAddToAll={this.handleAddToALL}
            onNewCounter={this.handleNewCounter}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
