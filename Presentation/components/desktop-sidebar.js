import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../actions/action-types";
import classNames from "classnames";

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
      <div id="menu-icon">
        <figure className="image is-250x250">
          <img
            className="is-square"
            src={`${selectedIcon && selectedIcon.url}`}
          />
        </figure>
      </div>
      <ul className="menu-list">
        <li>
          <a href="#">DELETE</a>
        </li>
        <li>
          <a href="#">UPLOAD</a>
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
