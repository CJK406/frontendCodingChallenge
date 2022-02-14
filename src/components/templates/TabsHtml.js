import React from "react";

export const TabsHtml = ({parent}) => {
  return (
    <ul className="list-group sticky-top sticky-offset">
    <div className="nav nav-pills py-2 flex-md-column justify-content-center">
      <a
        href={{ void: 0 }}
        className="nav-link active"
        title="Repositories"
        data-toggle="tab"
        data-target="#repositories"
      >
        <span className="d-none d-md-inline"><span className="fa fa-github"></span> Repositories</span>
        <span
          className="badge badge-pill badge-dark small font-weight-light ml-1"
          title="Unread"
        >
          {
            parent.state.repositories.length
          }
        </span>
      </a>
      <a
        href={{ void: 0 }}
        className="nav-link"
        title="Favorites"
        data-toggle="tab"
        data-target="#favorite"
      >
        <span className="d-none d-md-inline"><span className="fa fa-star"></span>Favorites</span>
        <span
          className="badge badge-pill badge-dark small font-weight-light ml-1"
          title="Favorites"
        >
          {parent.state.favorites.length}
        </span>
      </a>
    </div>
  </ul>
  );
};

export default TabsHtml;
