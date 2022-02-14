import React from "react";
export const RepositoryHtml = ({ parent,type }) => {
  let repositories = type==="repository" ? parent.state.repositories : parent.state.favorites;
  return (
      <ul className="list-group py-2">
        
        {repositories && repositories.length > 0
          ? repositories.filter((x)=> x.language.toLowerCase().includes(parent.state.filter_string.toLowerCase()))
          .map((item, idx) => 
          (
              <li
                key={idx}
                className="list-group-item list-group-item-action d-block py-1"
              >
                <summary className="row">
                  <div className="col-2 px-0 order-last d-none d-sm-block align-self-center text-right">
                    <a
                      className="text-secondary px-md-1"
                      title="favorites"
                      onClick={() => parent.doFavorite(idx,item.is_favorite, item.svn_url)}
                    >
                      <span className={(type==="repository" ? "fa fa-star " : "fa fa-trash ") + (item.is_favorite ? "active" : "")} />
                    </a>
                  </div>
                  <div
                    className="col-10 py-2 "
                  >
                    <p className="full_name ">
                        {item.full_name}
                    </p>
                    <p className="description mb-1">
                        {item.description}
                    </p>
                    <p className="link mb-1">
                        <a href={item.svn_url} target="_blank">{item.svn_url}</a>
                    </p>
                    <p className="stargazers_count mb-1">
                        {item.stargazers_count}
                    </p>
                    <p className="created_at mb-1">
                        {item.created_at}
                    </p>
                  </div>
                </summary>
              </li> 
            ))
          : null}
      </ul>
  );
};

export default RepositoryHtml;
