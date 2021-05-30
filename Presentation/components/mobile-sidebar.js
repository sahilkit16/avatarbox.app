import { useSelector } from "react-redux";

function MobileSidebar() {
  const { menu, selectedIcon } = useSelector((state) => state);
  return (
    <div className={menu && menu.visible ? "mobile-sidebar" : "is-hidden"}>
      <article className="panel">
        <div className="panel-block">
          <figure className="image is-64x64">
            <img className="is-square" src={selectedIcon && selectedIcon.url} />
          </figure>
        </div>
        <a className="panel-block">DELETE</a>
        <a
          className="panel-block"
          href="http://localhost:5000/my-avatars/upload.html"
        >
          UPLOAD
        </a>
        <a className="panel-block">CLOSE</a>
      </article>
    </div>
  );
}

export default MobileSidebar;
