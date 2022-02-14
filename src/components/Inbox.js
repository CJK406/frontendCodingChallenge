import React, { Component } from "react";
import { RepositoryHtml } from "./templates/RepositoryHtml.js";
import { TabsHtml } from "./templates/TabsHtml.js";

export class Inbox extends Component {
  constructor(props) {
    super(props);
    this.doFavorite = this.doFavorite.bind(this);
    this.state = {
      repositories: [],
      favorites: [],
      filter_string:'',
    };
  }
  componentDidMount(){
    this.doGetFavorites();
    this.doGetRepositores();
  }
  doGetFavorites(){
    let favorites = localStorage.getItem('favorite_repositories');
    favorites = favorites===null ? [] : JSON.parse(favorites);
    this.setState({
      favorites:favorites
    })
  }
  doGetRepositores(){
    fetch("https://api.github.com/search/repositories?q=created:%3E2017-01-10&sort=stars&order=desc")
      .then(res => res.json())
      .then(
        (result) => {
          let repositories = result.items;
          repositories.forEach(repository => {
            let index = this.state.favorites.findIndex( f => f.svn_url == repository.svn_url  )
            if(index >=0)
              repository.is_favorite=true
            else
              repository.is_favorite=false;
            if(repository.language===null)
              repository.language="";
          });
          this.setState({
            repositories: repositories
          });
        },
        (error) => {
          console.log(error )
        }
      )
  }
  doRemoveFavorite( svn_url) {
    let repositories = [...this.state.repositories];
    let favorites = [...this.state.favorites];
    favorites = favorites.filter(function( obj ) {
        return obj.svn_url !== svn_url;
    });
    let index = repositories.findIndex( f => f.svn_url == svn_url  )
    repositories[index].is_favorite=false;
    localStorage.setItem('favorite_repositories', JSON.stringify(favorites));
    this.setState({
      favorites:favorites,
      repositories:repositories
    });
  }
  doSearch(value){
    let repositories = [...this.state.repositories];
    repositories = repositories.filter(function( obj ) {
        let object= obj.language===null ? '' : obj.language.toLowerCase();
        return object.includes(value.toLowerCase());
    });
    this.setState({
      filter_string : value
    })
  }
  doFavorite(id,is_favorite,svn_url){
    let repositories = [...this.state.repositories];
    let favorites = [...this.state.favorites];
    if(is_favorite)
     this.doRemoveFavorite(svn_url)
    else  {
      repositories[id].is_favorite=true
      favorites.push(repositories[id]);
      localStorage.setItem('favorite_repositories', JSON.stringify(favorites));
      this.setState({
        favorites:favorites,
        repositories:repositories
      });
    }
  }
  render() {
    return (
      <div>
        <main className="px-2 flex-fill">
          <div className="row">
            <div className="col-12 px-4 d-flex flex-column">
              <div className="row">
                <div className="col-lg-3 col-md-4 py-3">
                  <TabsHtml parent={this} />
                </div>
                <div className="col-md py-3 tab-content">
                  <div className="d-flex flex-sm-row flex-column py-1 mb-1">
                    <label className="mr-2">Language:</label>
                    <input className="form-control"
                      onChange={(e) => this.doSearch(e.target.value)}
                    ></input>
                  </div>
                  <div id="repositories" className="tab-pane active">
                    <RepositoryHtml parent={this} type="repository" />
                  </div>
                  <div id="favorite" className="tab-pane">
                    <RepositoryHtml parent={this} type="favorite" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Inbox;
