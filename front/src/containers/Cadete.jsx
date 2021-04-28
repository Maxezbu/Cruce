import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CadeteOrders from "../components/Cadete/CadeteOrders";
import { fetchMe } from "../state/users";

export default function Cadete() {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <div>
      {user && user.id && !user.admin ? (
        <CadeteOrders />
      ) : (
        <img
          style={{ maxWidth: "100%" }}
          src="https://images.assetsdelivery.com/compings_v2/lkeskinen/lkeskinen1610/lkeskinen161000200.jpg"
          alt="403"
        />
      )}
    </div>
  );
}
