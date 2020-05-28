function ImageShortage(props){
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
          <div className="card">
              <header className="card-header"><p className="card-header-title has-text-centered">{props.title}</p></header>
              <div className="card-content">
                  <p className="has-text-centered">
                    {props.message} &nbsp;
                    <a target="blank" href="https://en.gravatar.com/gravatars/new">{props.linkText}</a>
                  </p>
              </div>
              <div className="card-footer"><a className="card-footer-item" href="/calendar#">Retry</a></div>
          </div>
      </div>
  </div>
  )
}

export default ImageShortage;
