import React, { useEffect, useState } from "react";
import api from "../../api/kasboek";
import { createCSVfromJSON } from "../../functions/handlecsv";

import { Fab, GetAppIcon } from "../../modules/material";
import TableTemplate from "../template/table/TableTemplate";
import Filter from "../kasboek_screen/Filter";

const headCells = [
  { id: "datum", numeric: false, disablePadding: true, label: "datum" },
  { id: "totaal", numeric: true, disablePadding: false, label: "omzet" },
  {
    id: "cheque_delhaize",
    numeric: true,
    disablePadding: false,
    label: "cheque delhaize",
  },
  {
    id: "tegoebon",
    numeric: true,
    disablePadding: false,
    label: "tegoedbon",
  },
  {
    id: "publiciteitsbon",
    numeric: true,
    disablePadding: false,
    label: "publiciteitsbon",
  },
  {
    id: "leeggoedbon",
    numeric: true,
    disablePadding: false,
    label: "leeggoedbon",
  },
  {
    id: "bancontact",
    numeric: true,
    disablePadding: false,
    label: "bancontact",
  },
  {
    id: "op_krediet",
    numeric: true,
    disablePadding: false,
    label: "op krediet",
  },
  {
    id: "andere",
    numeric: true,
    disablePadding: false,
    label: "andere",
  },
  {
    id: "amex",
    numeric: true,
    disablePadding: false,
    label: "amex",
  },

  {
    id: "visa",
    numeric: true,
    disablePadding: false,
    label: "visa",
  },
  {
    id: "mastercard",
    numeric: true,
    disablePadding: false,
    label: "mastercard",
  },
  {
    id: "maestro",
    numeric: true,
    disablePadding: false,
    label: "maestro",
  },
  {
    id: "visa_electron",
    numeric: true,
    disablePadding: false,
    label: "visa electron",
  },
  {
    id: "payfair",
    numeric: true,
    disablePadding: false,
    label: "payfair",
  },
  {
    id: "sodexo",
    numeric: true,
    disablePadding: false,
    label: "sodexo",
  },
  {
    id: "accordenred",
    numeric: true,
    disablePadding: false,
    label: "accordenred",
  },
  {
    id: "som_totaal",
    numeric: true,
    disablePadding: false,
    label: "totaal",
  },
  {
    id: "verschil",
    numeric: true,
    disablePadding: false,
    label: "verschil",
  },
];

const today = new Date();
const oneMonthBeforeToday = new Date().setMonth(today.getMonth() - 1);

export default function Kasboek() {
  const [filterValues, setFilterValues] = useState({
    startDate: oneMonthBeforeToday,
    endDate: today,
  });
  const [fullkasboek, setFullKasboek] = useState([]);
  const [filteredkasboek, setFilteredKasboek] = useState([]);

  useEffect(async () => {
    const rijen = await api.getKasboek();
    rijen.map((rij) => {
      rij.dateTypeDate = convertToDateType(rij);
      return rij;
    });
    setFilteredKasboek(rijen.filter(filterDates));
    setFullKasboek(rijen);
    return () => {};
  }, []);

  useEffect(() => {
    setFilteredKasboek(fullkasboek.filter(filterDates));
    return () => {};
  }, [filterValues]);

  //#region Date Functions

  const convertToDateType = (rij) => {
    const dateParts = rij.datum.split(" ")[1].split("/");
    return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  };

  var date_diff_indays = function (dt1, dt2) {
    if (typeof dt1 !== Date) {
      dt1 = new Date(dt1);
    }
    if (typeof dt2 !== Date) {
      dt2 = new Date(dt2);
    }
    return Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  };

  const filterDates = ({ dateTypeDate }) => {
    return (
      date_diff_indays(dateTypeDate, filterValues.endDate) >= 0 &&
      date_diff_indays(dateTypeDate, filterValues.startDate) <= 0
    );
  };

  const sortRowOnDate = (A, B) => {
    const newestFirst = false;
    A = Number(A.dateTypeDate);
    B = Number(B.dateTypeDate);
    if (A < B) {
      return newestFirst ? 1 : -1;
    }
    if (A > B) {
      return newestFirst ? -1 : 1;
    }
    return 0;
  };

  //#endregion Date Functions

  const handleDownload = () => {
    const rowsToExport = filteredkasboek
      .filter(
        ({ dateTypeDate }) =>
          dateTypeDate < filterValues.endDate &&
          dateTypeDate > filterValues.startDate
      )
      .sort(sortRowOnDate);
    const allowedColumns = headCells.map(({ id }) => id);
    createCSVfromJSON(rowsToExport, allowedColumns);
  };

  return (
    <div>
      <Filter filterValues={filterValues} setFilterValues={setFilterValues}>
        <Fab
          color="primary"
          size="small"
          variant="extended"
          onClick={handleDownload}
        >
          <GetAppIcon />
          download kasboek
        </Fab>
      </Filter>
      <TableTemplate
        rows={filteredkasboek}
        setRows={setFilteredKasboek}
        orderbyColumn="datum"
        tableName="kas"
        headCells={headCells}
      ></TableTemplate>
    </div>
  );
}
