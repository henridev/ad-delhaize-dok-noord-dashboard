export const KasBoekRow = class {
  constructor(file) {
    this.file = file;
    this.datum = file[0][0];
    this.datum_dateformat = new Date(file[0][0].split(" ")[1]);
    this.verkoopJSON = {};
    const rijen = file.slice(2, 28);
    rijen.forEach(rij => {
      const waarde = rij[2];
      const naam = rij[0]
        .toLowerCase()
        .replace(/ /g, "_")
        .replace(/\./g, "");
      this.verkoopJSON[naam] = waarde;
    });
    console.log(this.verkoopJSON, "verkoop");
  }

  get andere_totaal() {
    return (
      this.verkoopJSON.cheq_spec +
      this.verkoopJSON.tegoedbon +
      this.verkoopJSON.ecocheques +
      this.verkoopJSON.terugbet_lotto +
      this.verkoopJSON.maaltijdcheque
    );
  }

  get publiciteitsbon_totaal() {
    return (
      this.verkoopJSON.bon_pub_dll +
      this.verkoopJSON.bon_pub_lev +
      this.verkoopJSON.publiciteitsbon
    );
  }

  get som_totaal() {
    return (
      this.verkoopJSON.cheque_delhaize +
      this.verkoopJSON.tegoedbon +
      this.verkoopJSON.leeggoedbon +
      this.verkoopJSON.bancontact +
      this.verkoopJSON.op_krediet +
      this.kaarten.amex +
      this.kaarten.visa +
      this.kaarten.mastercard +
      this.kaarten.maestro +
      this.kaarten.visa_electron +
      this.maaltijdcheque.payfair +
      this.maaltijdcheque.sodexo +
      this.maaltijdcheque.accordenred +
      this.andere_totaal +
      this.publiciteitsbon_totaal
    );
  }

  get kaarten() {
    return {
      amex: this.file[28][7],
      visa: this.file[28][15],
      mastercard: this.file[28][23],
      maestro: this.file[28][32],
      visa_electron: this.file[28][40]
    };
  }

  get maaltijdcheque() {
    return {
      sodexo: this.file[28][105],
      payfair: this.file[28][79],
      accordenred: this.file[28][130]
    };
  }

  get verschil() {
    return (
      this.verkoopJSON.totaal -
      this.verkoopJSON.afronding -
      (this.verkoopJSON.cash + this.som_totaal)
    );
  }

  get allInfo() {
    return {
      datum: this.datum,
      datum_dateformat: this.datum_dateformat,
      cash: this.verkoopJSON.cash,
      cheq_spec: this.verkoopJSON.cheq_spec,
      maaltijdcheque: this.verkoopJSON.maaltijdcheque,
      cheque_delhaize: this.verkoopJSON.cheque_delhaize,
      tegoebon: this.verkoopJSON.tegoedbon,
      bon_pub_dll: this.verkoopJSON.bon_pub_dll,
      bon_pub_lev: this.verkoopJSON.bon_pub_lev,
      publiciteitsbon: this.verkoopJSON.publiciteitsbon,
      leeggoedbon: this.verkoopJSON.leeggoedbon,
      ecocheques: this.verkoopJSON.ecocheques,
      mobile: this.verkoopJSON.mobile,
      online_betaling: this.verkoopJSON.online_betaling,
      bancontact: this.verkoopJSON.bancontact,
      elec_maaltcheq: this.verkoopJSON.elec_maaltcheq,
      terugbet_lotto: this.verkoopJSON.terugbet_lotto,
      kredietkaart: this.verkoopJSON.kredietkaart,
      op_krediet: this.verkoopJSON.op_krediet,
      andere: this.verkoopJSON.andere,
      promo: this.verkoopJSON.promo,
      kadobon: this.verkoopJSON.kadobon,
      elec_ecocheques: this.verkoopJSON.elec_ecocheques,
      elec_cadeau: this.verkoopJSON.elec_cadeau,
      afronding: this.verkoopJSON.afronding,
      totaal_lade: this.verkoopJSON.totaal_lade,
      tegoedbon_crea: this.verkoopJSON.tegoedbon_crea,
      totaal: this.verkoopJSON.totaal,
      amex: this.kaarten.amex,
      visa: this.kaarten.visa,
      mastercard: this.kaarten.mastercard,
      maestro: this.kaarten.maestro,
      visa_electron: this.kaarten.visa_electron,
      payfair: this.maaltijdcheque.payfair,
      sodexo: this.maaltijdcheque.sodexo,
      accordenred: this.maaltijdcheque.accordenred,
      andere_totaal: this.andere_totaal,
      som_totaal: this.som_totaal,
      verschil: this.verschil
    };
  }

  get tableInfo() {
    return {
      cheque_delhaize: this.verkoopJSON.cheque_delhaize,
      tegoedbon: this.verkoopJSON.tegoedbon,
      publiciteitsbon_totaal: this.publiciteitsbon_totaal,
      leeggoedbon: this.verkoopJSON.leeggoedbon,
      bancontact: this.verkoopJSON.bancontact,
      op_krediet: this.verkoopJSON.op_krediet,
      andere_totaal: this.andere_totaal,
      amex: this.kaarten.amex,
      visa: this.kaarten.visa,
      mastercard: this.kaarten.mastercard,
      maestro: this.kaarten.maestro,
      visa_electron: this.kaarten.visa_electron,
      payfair: this.maaltijdcheque.payfair,
      sodexo: this.maaltijdcheque.sodexo,
      accordenred: this.maaltijdcheque.accordenred,
      som_totaal: this.som_totaal,
      verschil: this.verschil,
      cash: this.verkoopJSON.cash
    };
  }
};
