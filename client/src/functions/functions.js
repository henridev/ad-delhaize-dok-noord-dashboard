const tableheadMap = {
  omzet: "totaal",
  "cheque delhaize": "cheque_delhaize",
  "op krediet": "op_krediet",
  totaal: "som_totaal"
};

function descendingComparator(a, b, orderBy) {
  if (!orderBy) {
    return;
  }
  let compA = a[orderBy];
  let compB = b[orderBy];
  orderBy = checkMapping(orderBy);
  if (
    orderBy.toLowerCase().includes("date") ||
    orderBy.toLowerCase().includes("time") ||
    orderBy.toLowerCase().includes("datum")
  ) {
    console.log("a", a);
    const { dateA, dateB } = convertDateTime(compA, compB, orderBy);
    compA = dateA;
    compB = dateB;
    console.log("compA", compA);
  }
  if (compA < compB) {
    return -1;
  }
  if (compA > compB) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  console.log("getComparator", orderBy);
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const createIngredientsString = ingredients =>
  ingredients.map(
    (ingredient, i) => ingredient + (ingredients.length - 1 === i ? "" : " | ")
  );

function readableDate(isoString) {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.getMonth();
  const uur = date.getHours();
  const minuten = date.getMinutes();
  return `op ${day}/${month} om ${uur}:${minuten}`;
}

function filterOutIds(orders, orderids) {
  const new_orders = orders.filter(({ id }) => !orderids.includes(id));
  console.log(new_orders, "new_orders");
  return new_orders;
}

function convertDateTime(A, B, orderBy) {
  if (orderBy === "pickupDate") {
    A = new Date(
      A.split("/")
        .map(el => (el.length < 2 ? "0" + el : el))
        .join("-")
    );
    B = new Date(
      B.split("/")
        .map(el => (el.length < 2 ? "0" + el : el))
        .join("-")
    );
  }
  if (orderBy === "datum") {
    const datePartsA = A.split(" ")[1].split("/");
    const datePartsB = B.split(" ")[1].split("/");
    console.log("datePartsA", datePartsA);
    // month is 0-based, that's why we need dataParts[1] - 1
    A = new Date(+datePartsA[2], datePartsA[1] - 1, +datePartsA[0]);
    B = new Date(+datePartsB[2], datePartsB[1] - 1, +datePartsB[0]);
  }
  if (orderBy === "pickupTime") {
    A = A.replace(":", "");
    B = B.replace(":", "");
  }
  return { dateA: Number(A), dateB: Number(B) };
}

function checkMapping(orderBy) {
  if (tableheadMap[orderBy]) {
    return tableheadMap[orderBy];
  } else {
    return orderBy;
  }
}

module.exports = {
  stableSort,
  getComparator,
  createIngredientsString,
  readableDate,
  filterOutIds
};
