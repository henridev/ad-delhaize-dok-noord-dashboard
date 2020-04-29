import React, { useEffect, useState } from "react";
import api from "../../api/kasboek";
import LineGraph from "../graphs/LineGraph";
import ProgressSpinner from "../template/ProgressSpinner";

export default function Kasboek() {
  const [kasboek, setKasboek] = useState([]);
  useEffect(() => {
    api
      .getKasboek()
      .then(res => {
        const rijen = res
          .map(rij => {
            return rij;
          })
          .sort(orderByDate);

        console.log("rijen", rijen);
        setKasboek(rijen);
      })
      .catch(err => console.log(err));
    return () => {};
  }, []);

  const orderByDate = (A, B) => {
    A = A.datum;
    B = B.datum;
    const datePartsA = A.split(" ")[1].split("/");
    const datePartsB = B.split(" ")[1].split("/");
    // month is 0-based, that's why we need dataParts[1] - 1
    A = new Date(+datePartsA[2], datePartsA[1] - 1, +datePartsA[0]);
    B = new Date(+datePartsB[2], datePartsB[1] - 1, +datePartsB[0]);
    A = Number(A);
    B = Number(B);
    if (A < B) {
      return -1;
    }
    if (A > B) {
      return 1;
    }
    return 0;
  };

  if (kasboek.length < 1) {
    return <ProgressSpinner></ProgressSpinner>;
  }
  return (
    <div>
      <LineGraph data={kasboek} />
    </div>
  );
}
