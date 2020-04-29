import { KasBoekRow } from "../models/KasBoekRij";
import XLSX from "xlsx";
const HEADERS = [
  "datum",
  "totaal",
  "cheque_delhaize",
  "tegoebon",
  "publiciteitsbon",
  "leeggoedbon",
  "bancontact",
  "op_krediet",
  "andere",
  "amex",
  "visa",
  "mastercard",
  "maestro",
  "visa_electron",
  "payfair",
  "sodexo",
  "accordenred",
  "som_totaal",
  "verschil"
];

export function creatJSONfromCSV(file) {
  const kasboekrij = new KasBoekRow(file);
  return kasboekrij.allInfo;
}

export function createCSVfromJSON(data, allowedColumns) {
  const FilteredData = filterData(data, allowedColumns);

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(FilteredData, {
    header: HEADERS
  });
  XLSX.utils.book_append_sheet(wb, ws, "sheet1");
  const xlsFile = XLSX.writeFile(
    wb,
    `csvdownload_${new Date().toLocaleDateString()}.xlsx`
  );
}

const filterData = (data, allowedColumns) => {
  return data.map(rij => {
    const valuesFiltered = {};
    Object.entries(rij).forEach(([key, value]) => {
      if (allowedColumns.includes(key)) {
        if (value < 1) {
          value = 0;
        }
        valuesFiltered[key] = value;
      }
    });
    return valuesFiltered;
  });
};
