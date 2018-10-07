// src\app\pages\admin\event-form\event-form.service.ts

import { Injectable } from '@angular/core';

@Injectable()
export class EventFormService {
  validationMessages: any;
  // Set up errors object
  formErrors = {
    gender: '',
    title: '',
    otherTitle: '',
    forename: '',
    surname: '',
    otherNames: '',
    otherForename: '',
    otherSurname: '',
    mothersMaiden: '',   
    birthDate: '',
    countryOfBirth: '',
    townOfBirth: '',
    nationality: '',
    hasUKNINO: '',
    NINO: '',
    hasPassport: '',
    passportNo: '',
    passportCountry : '',
    hasDrivingLicence : '',
    drivingLicence: '',
    licenceCountry: '',
    ElectricitySupplierNumber : '',
    NatEntCardNo: '',
    IsNICAvailable : '',
    NICNumber : '',
    NICCountryOfIssue: '', 
    PVGSchemeID : '',
    EmailAddress : '',
    EveningPhoneNumber : '', 
    DaytimePhoneNumber : '',
    currResidentFrom  : '', 
    currAddrLine1  : '', 
    currAddrLine2  : '', 
    currAddrTown  : '', 
    currAddrCounty  : '', 
    currAddrPostCode  : '', 
    currAddrCountry  : '',
    otherDetails : ''
  };

  // Min/maxlength validation
  textMin = 3;
  titleMax = 36;
  genderMax = 10;
  locMax = 200;
  dateMax = 10;
  phoneMin = 10;
  timeMax = 8;
  forenameMax = 64;
  nameMin = 2;
  surnameMax = 32;
  descMax = 2000;
  otherTitleMax = 20;
  leckyMax = 21;
  natEntMax = 16;
  phoneMax = 15;
  addressMax = 32;
  postCodeMax = 8;
  // Formats
  dateFormat = 'dd/MM/yyyy';
  timeFormat = 'h:mm AM/PM';

  constructor() {
    this.validationMessages = {
      gender: {
        required: `Gender is <strong>required</strong>.`,
        //minlength: `Gender must be ${this.textMin} characters or more.`,
        //maxlength: `Gender must be ${this.titleMax} characters or less.`
      },
      title: {
        required: `Title is <strong>required</strong>.`,
        //minlength: `Title must be ${this.textMin} characters or more.`,
        //maxlength: `Title must be ${this.titleMax} characters or less.`
      },
      otherTitle: {
        //required: `Title is <strong>required</strong>.`,
        //minlength: `Title must be ${this.textMin} characters or more.`,
        maxlength: `Other Title must be ${this.otherTitleMax} characters or less.`,
        pattern:  `Valid characters for this field are: aA to zZ, space and full stop.`
      },
      forename: {
        required: `Forename is <strong>required</strong>.`,
        minlength: `Forename must be ${this.nameMin} characters or more.`,
        maxlength: `Forename must be ${this.forenameMax} characters or less.`,
        pattern:  `Valid characters for this field are: aA to zZ, 0 to 9, space, apostrophe, full stop and hyphen.`
      },   
      surname: {
        required: `Surname is <strong>required</strong>.`,
        minlength: `Surname must be ${this.nameMin} characters or more.`,
        maxlength: `Surname must be ${this.forenameMax} characters or less.`,
        pattern:  `Valid characters for this field are: aA to zZ, 0 to 9, space, apostrophe, full stop and hyphen.`
      },
      otherForename: {
        required: `Other Forename is <strong>required</strong>.`,
        minlength: `Other Forename must be ${this.nameMin} characters or more.`,
        maxlength: `Other Forename must be ${this.forenameMax} characters or less.`,
        pattern:  `Valid characters for this field are: aA to zZ, 0 to 9, space, apostrophe, full stop and hyphen.`
      },   
      otherSurname: {
        required: `Other Surname is <strong>required</strong>.`,
        minlength: `Other Surname must be ${this.nameMin} characters or more.`,
        maxlength: `Other Surname must be ${this.forenameMax} characters or less.`,
        pattern:  `Valid characters for this field are: aA to zZ, 0 to 9, space, apostrophe, full stop and hyphen.`
      },  
      mothersMaiden: {
        required: `Mothers Maiden name is <strong>required</strong>.`,
        minlength: `Mothers Maiden name must be ${this.nameMin} characters or more.`,
        maxlength: `Mothers Maiden name must be ${this.forenameMax} characters or less.`,
        pattern:  `Valid characters for this field are: aA to zZ, 0 to 9, space, apostrophe, full stop and hyphen.`
      },   
      birthDate: {
        required: `Birth date is <strong>required</strong>.`,
        minlength: `Birth date must be ${this.nameMin} characters or more.`,
        maxlength: `Birth date must be ${this.forenameMax} characters or less.`,
        pattern: `Birth date must be in the format <strong>${this.dateFormat}</strong>.`,
      },   
      countryOfBirth: {
        required: `Country of Birth is <strong>required</strong>.`,
        minlength: `Country of Birth must be ${this.nameMin} characters or more.`,
        maxlength: `Country of Birth must be ${this.forenameMax} characters or less.`,
        pattern:  `Valid characters for this field are: aA to zZ, 0 to 9, space, apostrophe, full stop and hyphen.`
      }, 
      townOfBirth: {
        required: `Town of Birth is <strong>required</strong>.`,
        minlength: `Town of Birth must be ${this.nameMin} characters or more.`,
        maxlength: `Town of Birth must be ${this.forenameMax} characters or less.`,
        pattern:  `Valid characters for this field are: aA to zZ, 0 to 9, space, apostrophe, full stop and hyphen.`
      }, 
      nationality: {
        required: `Nationality is <strong>required</strong>.`,
        minlength: `Nationality must be ${this.nameMin} characters or more.`,
        maxlength: `Nationality must be ${this.forenameMax} characters or less.`,
        pattern:  `Valid characters for this field are: aA to zZ, 0 to 9, space, apostrophe, full stop and hyphen.`
      },      
      otherNames: {
        required: `You must specify whether you have been known by other names.`
      }, 
      hasUKNINO: {
        required: `You must specify whether you have a UK National Insurance Number.`
      }, 
      NINO: {    
        required: `You must provide a valid National Insurance Number.`,   
        pattern:  `Please provide a valid National Insurance Number.`
      },  
      hasPassport: {
        required: `You must specify whether you have a Passport.`
      }, 
      passportNo: {
        required: `Passport Number is <strong>required</strong>.`,
        minlength: `Passport Number must be ${this.nameMin} characters or more.`,
        maxlength: `Passport Number must be ${this.forenameMax} characters or less.`,
        pattern:  `Valid characters for this field are: aA to zZ, 0 to 9, space, apostrophe, full stop and hyphen.`
      }, 
      passportCountry: {
        required: `Passport country of origin is <strong>required</strong>.`,
        minlength: `Passport country of origin must be ${this.nameMin} characters or more.`,
        maxlength: `Passport country of origin must be ${this.forenameMax} characters or less.`,
        pattern:  `Valid characters for this field are: aA to zZ, 0 to 9, space, apostrophe, full stop and hyphen.`
      },       
      hasDrivingLicence: {
        required: `You must specify whether you have a driving licence.`
      }, 
      drivingLicence: {
        required: `Driving licence is <strong>required</strong>.`,
        minlength: `Driving licence must be ${this.nameMin} characters or more.`,
        maxlength: `Driving licence must be ${this.forenameMax} characters or less.`,
        pattern:  `Valid characters for this field are: aA to zZ, 0 to 9, space, apostrophe, full stop and hyphen.`
      }, 
      licenceCountry: {
        required: `Driving licence of origin is <strong>required</strong>.`,
        minlength: `Driving licenceof origin must be ${this.nameMin} characters or more.`,
        maxlength: `Driving licence of origin must be ${this.forenameMax} characters or less.`,
        pattern:  `Valid characters for this field are: aA to zZ, 0 to 9, space, apostrophe, full stop and hyphen.`
      },  
      ElectricitySupplierNumber: {
        pattern:  `Valid characters for this field are: aA to zZ, 0 to 9, space, apostrophe, full stop and hyphen.`
      },
      NatEntCardNo: {
        pattern:  `Valid characters for this field are: aA to zZ, 0 to 9, space, apostrophe, full stop and hyphen.`
      }, 
      IsNICAvailable: {
        required: `You must specify whether you have a driving licence.`
      },
      NICNumber: {
        minlength: `National ID Card Number must be ${this.nameMin} characters or more.`,
        maxlength: `National ID Card Number must be ${this.surnameMax} characters or less.`,
        pattern:  `Valid characters for this field are: aA to zZ, 0 to 9, space, apostrophe, full stop and hyphen.`
      }, 
      NICCountryOfIssue: {
        minlength: `National ID card country of origin must be ${this.nameMin} characters or more.`,
        maxlength: `National ID card country of origin must be ${this.surnameMax} characters or less.`,
        pattern:  `Valid characters for this field are: aA to zZ, 0 to 9, space, apostrophe, full stop and hyphen.`
      }, 
      PVGSchemeID: {
        minlength: `PVG Scheme ID must be ${this.nameMin} characters or more.`,
        maxlength: `PVG Scheme ID must be ${this.natEntMax} characters or less.`,
        pattern:  `Valid characters for this field are:  0 to 9.`
      }, 
      EmailAddress: {
        pattern:  `Please provide a valid email address.`
      }, 
      EveningPhoneNumber: {
        minlength: `Evening telephone number must be ${this.phoneMin} characters or more.`,
        maxlength: `Evening telephone number must be ${this.phoneMax} characters or less.`,
        pattern:  `Valid characters for this field are:  0 to 9.`
      }, 
      DaytimePhoneNumber: {
        minlength: `Day time telephone number must be ${this.phoneMin} characters or more.`,
        maxlength: `Day time  telephone number must be ${this.phoneMax} characters or less.`,
        pattern:  `Valid characters for this field are:  0 to 9.`
      },
      currResidentFrom: {
        required: `Resident from date is <strong>required</strong>.`,
        minlength: `Resident from date must be ${this.nameMin} characters or more.`,
        maxlength: `Resident from date must be ${this.forenameMax} characters or less.`,
        pattern: `Resident from date must be in the format <strong>${this.dateFormat}</strong>.`,
      },  
      currAddrLine1: {
        required: `Current Address line 1 is <strong>required</strong>.`,
        minlength: `Current Address line 1 must be ${this.nameMin} characters or more.`,
        maxlength: `Current Address line 1 must be ${this.addressMax} characters or less.`,
        pattern:  `Valid characters for this field are: aA to zZ, 0 to 9, space, apostrophe, full stop and hyphen.`
      }, 
      currAddrLine2: {
        minlength: `Current Address line 2 must be ${this.nameMin} characters or more.`,
        maxlength: `Current Address line 2 must be ${this.addressMax} characters or less.`,
        pattern:  `Valid characters for this field are: aA to zZ, 0 to 9, space, apostrophe, full stop and hyphen.`
      },       
      currAddrTown: {
        required: `Current Address Town is <strong>required</strong>.`,
        minlength: `Current Address Town must be ${this.nameMin} characters or more.`,
        maxlength: `Current Address Town must be ${this.addressMax} characters or less.`,
        pattern:  `Valid characters for this field are: aA to zZ, 0 to 9, space, apostrophe, full stop and hyphen.`
      },
      currAddrCounty: {
        minlength: `Current Address County must be ${this.nameMin} characters or more.`,
        maxlength: `Current Address County must be ${this.addressMax} characters or less.`,
        pattern:  `Valid characters for this field are: aA to zZ, 0 to 9, space, apostrophe, full stop and hyphen.`
      }, 
      currAddrPostCode: {
        minlength: `Current Address Postcode must be ${this.nameMin} characters or more.`,
        maxlength: `Current Address Postcode must be ${this.postCodeMax} characters or less.`,
        pattern:  `The postcode must confirm with UK postcode format, leave blank if the address is non UK.`
      }, 
      currAddrCountry: {
        minlength: `Current Address Country must be ${this.nameMin} characters or more.`,
        maxlength: `Current Address Country must be ${this.addressMax} characters or less.`,
        pattern:  `Valid characters for this field are: aA to zZ, 0 to 9, space, apostrophe, full stop and hyphen.`
      }, 
      otherDetails: {
        minlength: `Other details must be ${this.nameMin} characters or more.`,
        maxlength: `Other details  must be ${this.descMax} characters or less.`,
        pattern:  `Valid characters for this field are: aA to zZ, 0 to 9, space, apostrophe, full stop and hyphen.`
      }
    };
  }





}
