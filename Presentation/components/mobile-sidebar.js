import { useSelector, useDispatch } from "react-redux";
import { deleteIcon, handleFileUpload } from "../../Common/helpers";
import actionTypes from "../actions/action-types";

function MobileSidebar() {
  const { menu, selectedIcon } = useSelector((state) => state);
  const dispatch = useDispatch();
  const closeMenu = () => {
    dispatch({
      type: actionTypes.CLOSE_MENU,
    });
  };
  return (
    <div className={menu && menu.visible ? "mobile-sidebar" : "is-hidden"}>
      <input type="hidden" name="selectedIcon" value={selectedIcon.url} />
      <input type="hidden" name="imageUrl" id="imageUrl" />
      <article className="panel">
        <div className="panel-block">
          <figure className="image is-64x64">
            <img className="is-square" src={selectedIcon.url} />
          </figure>
        </div>
        <a className="panel-block" onClick={deleteIcon}>
          DELETE
        </a>
        <a onClick={handleFileUpload} className="panel-block" href="#">
          UPLOAD
        </a>
        <a className="panel-block" onClick={closeMenu}>
          CLOSE
        </a>
      </article>
    </div>
  );
}

export default MobileSidebar;
