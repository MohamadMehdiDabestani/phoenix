import { Fragment, useEffect, useState } from "react";
import MenuItemCildren from "./MenuItemCildren";
import { list } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenuDashboard } from "../../redux/action/Actions";
const MenuItem = () => {
  const open = useSelector((state) => state.menuDashboard);
  const [active, setActive] = useState("");
  const dispatch = useDispatch();
  const handleExpand = () => {
    console.log("location.pathname", location.pathname);
    list.map((el) => {
      let cehck = el.routes.split(",").find((e) => e === location.pathname);
      if (cehck) {
        setActive(el.id);
      }
    });
  };
  useEffect(() => {
    if (open) {
      handleExpand();
    } else {
      setActive("");
    }
  }, [open]);
  const handleClick = (id) => {
    setActive(id);
    dispatch(toggleMenuDashboard(true));
  };
  return (
    <Fragment>
      {list.map((el, i) => (
        <MenuItemCildren
          el={el}
          key={i}
          expand={active}
          onClick={() => handleClick(el.id)}
        />
      ))}
    </Fragment>
  );
};

export default MenuItem;
