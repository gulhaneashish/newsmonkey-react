import React, { Component } from 'react'

export default class itemnewcomponent extends Component {
  render() {
    let { title, description, imageUrl, newsUrl,author, date,source } = this.props;
    return (
      <div>
            <div className="card my-2" >
              <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}>
                {source}</span>
                 <img src={imageUrl ? imageUrl : "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iXDoQuNZnrzc/v0/1200x800.jpg"} className="card-img-top" alt="..." />
                 <div className="card-body">
                 <h5 className="card-title">{title} </h5>
                 <p className="card-text">{description}...</p>
                 <p className="card-text"><small className="text-muted">By {author? author : "Unknown"} on {new Date(date).toDateString()}</small></p>
                 <a href={newsUrl}  className="btn btn-primary" target="_blank" rel="noopener noreferrer">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}
