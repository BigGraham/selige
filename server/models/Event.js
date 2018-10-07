// server\models\event.js
/*
 |--------------------------------------
 | Event Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  gender: { type: String, required: true },
  title: { type: String, required: true },
  otherTitle: { type: String, required: true },
  forename: { type: String, required: true },
  surname: { type: String, required: true },
  otherNames: { type: Boolean, required: true },
  otherForename: { type: String, required: true },
  otherSurname: { type: String, required: true },
  mothersMaiden: { type: String, required: true },
  birthDate : { type: Date, required: true },
  countryOfBirth : { type: String, required: true },
  townOfBirth : { type: String, required: true },
  nationality : { type: String, required: true },
  hasUKNINO : { type: Boolean, required: true },
  NINO : { type: String, required: false },
  hasPassport: { type: Boolean, required: true },
  passportNo: { type: String, required: false },
  passportCountry: { type: String, required: false },
  hasDrivingLicence : { type: Boolean, required: true },
  drivingLicence: { type: String, required: false },
  licenceCountry: { type: String, required: false },
  ElectricitySupplierNumber : { type: String, required: false },
  NatEntCardNo: { type: String, required: false },
  IsNICAvailable : { type: Boolean, required: true },
  NICNumber: { type: String, required: false }, 
  NICCountryOfIssue: { type: String, required: false }, 
  PVGSchemeID: { type: String, required: false }, 
  EmailAddress: { type: String, required: false }, 
  EveningPhoneNumber: { type: String, required: false }, 
  DaytimePhoneNumber: { type: String, required: false }, 
  currResidentFrom: { type: Date, required: true }, 
  currAddrLine1 : { type: String, required: true }, 
  currAddrLine2 : { type: String, required: false }, 
  currAddrTown : { type: String, required: true }, 
  currAddrCounty : { type: String, required: false }, 
  currAddrPostCode : { type: String, required: false }, 
  currAddrCountry : { type: String, required: false },
  otherDetails : { type: String, required: false },
  created_date: { type: Date, default: Date.now },
  applicationNo : { type: String, required: false },
  caseRefNo : { type: String, required: false },
  indicativeNotice : { type: String, required: false }
});

module.exports = mongoose.model('CheckApps', eventSchema, 'CheckApps');
