import { Component } from 'react'
import Itemnewcomponent from './Itemnewcomponent';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export default class newscomponent extends Component {
  
static defaultProps = {
  pageSize: 8, 
  country: "us",
  category: "business" 
}

static propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
}
  constructor(props) {
    super(props); 
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    } 
    document.title = `${this.props.category} - News Monkey`;
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // async updated(){
  //   const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e7fb364bd33c45c2b986b384580fb3a6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //    const data= await fetch(url);
  //   const parsedData = await data.json();
   
  //   this.setState({
  //     page: this.page - 1,
  //     articles: parsedData.articles,
  //   });
  // }

  async componentDidMount(){
    
    this.props.setProgress(10);
    const url=`http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e7fb364bd33c45c2b986b384580fb3a6&page=1&pageSize=${this.props.pageSize}`;
    const data= await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
    
    this.props.setProgress(100);
    // this.updated();
  }

  handlePreviouespage = async () => {
     const url=`http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e7fb364bd33c45c2b986b384580fb3a6&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
     const data= await fetch(url);
    const parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.page - 1,
      articles: parsedData.articles,
    });
    // this.setState({
    //   page: this.state.page - 1,
    //    });
    //    this.updated();
  }
  handleNextpage = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
   
    }else {
     const url=`http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e7fb364bd33c45c2b986b384580fb3a6&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
     const data= await fetch(url);
    const parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
    });
    // this.setState({
    //   page: this.state.page + 1,
    // });
    // this.updated();
  }
  }
  fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    // setTimeout(() => {
    //   this.setState({
    //     items: this.state.items.concat(Array.from({ length: 20 }))
    //   });
    // }, 1500);
    this.setState({ page: this.state.page + 1 });
       const url=`http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e7fb364bd33c45c2b986b384580fb3a6&page=1&pageSize=${this.props.pageSize}`;
    const data= await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };
  render() {
    
    return (
      <>
      <div className="container my-3 ">
        <h1>Latest News : {this.capitalizeFirstLetter(this.props.category)}</h1>
         <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4>Loading...</h4>}
        > 
        <div className="container">
        <div className="row">
        { this.state.articles.map((element,index) => {        
         return <div className="col-12 col-sm-6 col-md-4 mb-4-md-4 " key={`${element.url}-${element.publishedAt}-${index}`}>
            <Itemnewcomponent title= {element.title ? element.title.slice(0,20) : " "} description={element.description ? element.description.slice(0,45):" "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
      </div>
      {/* <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center my-3 gap-2">
        <button type="button" disabled={this.state.page<=1}  className="btn btn-dark" onClick={this.handlePreviouespage}>&larr;Previous page</button>
        <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextpage}>Next Page &rarr;</button>
      </div> */}
      </>
    )
  }
}
//https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=e7fb364bd33c45c2b986b384580fb3a6&page=1&pageSize=${this.props.pageSize}
//https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e7fb364bd33c45c2b986b384580fb3a6