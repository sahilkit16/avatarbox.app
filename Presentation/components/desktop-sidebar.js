import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../actions/action-types";
import classNames from "classnames";
import { deleteIcon, handleFileUpload } from "../../Common/helpers";

function DesktopSidebar() {
  const { menu, selectedIcon } = useSelector((state) => state);
  const dispatch = useDispatch();
  const closeMenu = () => {
    dispatch({
      type: actionTypes.CLOSE_MENU,
    });
  };
  return (
    <aside
      className={classNames("has-text-centered", "desktop-sidebar", {
        "is-hidden": !menu || !menu.visible,
      })}
    >
      <div className="menu-icon">
        <img src={`${selectedIcon && selectedIcon.url}`} />
      </div>
      <ul className="menu-list">
        <li>
          <a onClick={deleteIcon}>DELETE</a>
        </li>
        <li>
          <a onClick={handleFileUpload} href="#">UPLOAD</a>
        </li>
        <li>
          <a className="panel-block" onClick={closeMenu}>
            CLOSE
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default DesktopSidebar;
