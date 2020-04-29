import React, { useEffect, useState } from "react";
import api from "../../api/orders";

import TableTemplate from "../template/table/TableTemplate";

const headCells = [
  { id: "firstName", numeric: false, disablePadding: true, label: "voornaam" },
  { id: "lastName", numeric: false, disablePadding: true, label: "achternaam" },
  { id: "price", numeric: true, disablePadding: false, label: "te betalen" },
  {
    id: "pickupDate",
    numeric: true,
    disablePadding: false,
    label: "afhaaldatum"
  },
  {
    id: "pickupTime",
    numeric: true,
    disablePadding: false,
    label: "afhaaltijdstip"
  },
  {
    id: "timeOrder",
    numeric: true,
    disablePadding: false,
    label: "bestellingtijdstip"
  },
  { id: "details", numeric: true, disablePadding: false, label: "details" }
];

export default function Orders(props) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    api.getOrders().then(bestelling => setOrders(bestelling));
  }, []);

  return (
    <div>
      <TableTemplate
        rows={orders}
        setRows={setOrders}
        headCells={headCells}
        orderbyColumn="tijdstip afhalen"
        tableName="orders"
      ></TableTemplate>
    </div>
  );
}
