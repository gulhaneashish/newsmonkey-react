
import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import NewsComponent from './components/Newscomponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";
export default class App extends Component {
   pageSize = 5;
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress });
  }
   render() {
  return (
    <div className="App">
      <Router>
      <NavBar />
        <LoadingBar
        color="#f11946"
        progress={this.state.progress}
        //onLoaderFinished={() => setProgress(0)}
      />
      <Routes> 
        <Route exact path="/" element={<NewsComponent setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="us" category="general" />} />
        <Route exact path="/business" element={<NewsComponent setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="us" category="business" />} />
        <Route exact path="/entertainment" element={<NewsComponent setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="us" category="entertainment" />} />
        <Route exact path="/science" element={<NewsComponent setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="us" category="science" />} />
        <Route exact path="/health" element={<NewsComponent setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="us" category="health" />} />
        <Route exact path="/sports" element={<NewsComponent setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="us" category="sports" />} />
        <Route exact path="/technology" element={<NewsComponent setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="us" category="technology" />} />
        </Routes>
      </Router>
    </div>
  );
}
}

