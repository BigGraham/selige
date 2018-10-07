// src\app\pages\admin\event-form\event-form.component.ts

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from './../../../core/api.service';
import { AuthService } from './../../../auth/auth.service';
import { EventModel, FormEventModel } from './../../../core/models/event.model';
import { DatePipe } from '@angular/common';
import { dateValidator } from './../../../core/forms/date.validator';
import { dateRangeValidator } from './../../../core/forms/date-range.validator';
import { DATE_REGEX, TIME_REGEX, stringsToDate, TITLE_REGEX, NAME_REGEX, POSTCODE_REGEX, UKNINO_REGEX, PHONE_REGEX, EMAIL_REGEX, VALID_CHARS_REGEX, ALPHANUMERIC_REGEX, NUMERIC_REGEX, NIC_REGEX} from './../../../core/forms/formUtils.factory';
import { EventFormService } from './event-form.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  providers: [ EventFormService ]
})
export class EventFormComponent implements OnInit, OnDestroy {
  @Input() event: EventModel;
  isEdit: boolean;
  // FormBuilder form
  eventForm: FormGroup;
  datesGroup: AbstractControl;
  // Model storing initial form values
  formEvent: FormEventModel;
  // Form validation and disabled logic
  formErrors: any;
  formChangeSub: Subscription;
  // Form submission
  submitEventObj: EventModel;
  submitEventSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;
  genders = ['', 'Male', 'Female'];
  titles = ['', 'Mr', 'Mrs', 'Ms', 'Miss', 'Other'];
  countries = ['','United Kingdom', 'Afghanistan', 'Albania', 'Algeria', 'Angola', 'Anguilla', 'Antigua and Barbuda',
            'Argentina', 'Armenia', 'Ascension', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain',
            'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan',
            'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Antarctic Territory',
            'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso',
            'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands',
            'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo',
            'Congo , Democratic Republic', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark',
            'Djibouti', 'Dominica, Commonwealth of', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt',
            'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Fiji',
            'Finland', 'France', 'Gabon', 'Gambia, The Republic of', 'Georgia', 'Germany', 'Ghana',
            'Gibraltar', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy See', 'Honduras',
            'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
            'Ivory Coast ,Cote d\'Ivoire,',
            'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, DPR ,North Korea',
            'Korea, Republic of ,South Korea', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia',
            'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
            'Macao', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta',
            'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Mongolia', 'Montenegro',
            'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands',
            'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan',
            'Palestine National Authority', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines',
            'Pitcairn Islands', 'Poland', 'Portugal', 'Qatar ,State of ', 'Romania', 'Russian Federation',
            'Rwanda', 'Saint Christopher kitts & Nevis', 'Saint Helena', 'Saint Lucia', 'Saint Vincent and Grenadines',
            'Samoa', 'Sao Tome and Principe', 'Saudi Arabia', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore',
            'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia & South Sandwich',
            'South Sudan', 'Spain, Kingdom of', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden',
            'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga',
            'Trinidad and Tobago', 'Tristan da Cunha', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands',
            'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United States', 'Uruguay', 'Uzbekistan',
            'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'];
  
  nationalites = ['','British','Afghan','Albanian','Algerian','American','Andorran','Angolan','Anguillan','Argentine','Armenian','Australian','Austrian','Azerbaijani',
'Bahamian','Bahraini','Bangladeshi','Barbadian','Belarusian','Belgian','Belizean','Beninese','Bermudian','Bhutanese','Bolivian','Botswanan',
'Brazilian','British Virgin Islander','Bruneian','Bulgarian','Burkinan','Burmese','Burundian','Cambodian','Cameroonian','Canadian',
'Cape Verdean','Cayman Islander','Central African','Chadian','Chilean','Chinese','Citizen of Antigua and Barbuda','Citizen of Bosnia and Herzegovina',
'Citizen of Guinea-Bissau','Citizen of Kiribati','Citizen of Seychelles','Citizen of the Dominican Republic','Citizen of Vanuatu ','Colombian',
'Comoran','Congolese (Congo)','Congolese (DRC)','Cook Islander','Costa Rican','Croatian','Cuban','Cymraes','Cymro','Cypriot','Czech','Danish',
'Djiboutian','Dominican','Dutch','East Timorese','Ecuadorean','Egyptian','Emirati','English','Equatorial Guinean','Eritrean','Estonian','Ethiopian',
'Faroese','Fijian','Filipino','Finnish','French','Gabonese','Gambian','Georgian','German','Ghanaian','Gibraltarian','Greek','Greenlandic',
'Grenadian','Guamanian','Guatemalan','Guinean','Guyanese','Haitian','Honduran','Hong Konger','Hungarian','Icelandic','Indian','Indonesian',
'Iranian','Iraqi','Irish','Israeli','Italian','Ivorian','Jamaican','Japanese','Jordanian','Kazakh','Kenyan','Kittitian','Kosovan','Kuwaiti',
'Kyrgyz','Lao','Latvian','Lebanese','Liberian','Libyan','Liechtenstein citizen','Lithuanian','Luxembourger','Macanese','Macedonian','Malagasy',
'Malawian','Malaysian','Maldivian','Malian','Maltese','Marshallese','Martiniquais','Mauritanian','Mauritian','Mexican','Micronesian','Moldovan',
'Monegasque','Mongolian','Montenegrin','Montserratian','Moroccan','Mosotho','Mozambican','Namibian','Nauruan','Nepalese','New Zealander','Nicaraguan',
'Nigerian','Nigerien','Niuean','North Korean','Northern Irish','Norwegian','Omani','Pakistani','Palauan','Palestinian','Panamanian','Papua New Guinean',
'Paraguayan','Peruvian','Pitcairn Islander','Polish','Portuguese','Prydeinig','Puerto Rican','Qatari','Romanian','Russian','Rwandan','Salvadorean',
'Sammarinese','Samoan','Sao Tomean','Saudi Arabian','Scottish','Senegalese','Serbian','Sierra Leonean','Singaporean','Slovak','Slovenian','Solomon Islander',
'Somali','South African','South Korean','South Sudanese','Spanish','Sri Lankan','St Helenian','St Lucian','Stateless','Sudanese','Surinamese','Swazi',
'Swedish','Swiss','Syrian','Taiwanese','Tajik','Tanzanian','Thai','Togolese','Tongan','Trinidadian','Tristanian','Tunisian','Turkish','Turkmen',
'Turks and Caicos Islander','Tuvaluan','Ugandan','Ukrainian','Uruguayan','Uzbek','Vatican citizen','Venezuelan','Vietnamese','Vincentian','Wallisian',
'Welsh','Yemeni','Zambian','Zimbabwean'];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private api: ApiService,
    private datePipe: DatePipe,
    public ef: EventFormService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formErrors = this.ef.formErrors;
    this.isEdit = !!this.event;
    this.submitBtnText = this.isEdit ? 'Update Application' : 'Create Application';
    // Set initial form data
    this.formEvent = this._setFormEvent();
    // Use FormBuilder to construct the form
    this._buildForm();
  }



  private _setFormEvent() {
    if (!this.isEdit) {
      // If creating a new event, create new
      // FormEventModel with default null data
      return new FormEventModel(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null, null, null, null, null, null, null, null, null,null,null);
    } else {
      // If editing existing event, create new
      // FormEventModel from existing data
      // Transform datetimes:
      // https://angular.io/api/common/DatePipe
      // _shortDate: 1/7/2017
      // 'shortTime': 12:05 PM
      const _shortDate = 'dd/MM/yyyy';
      return new FormEventModel(
        this.event.gender,
        this.event.title,
        this.event.otherTitle,
        this.event.forename,
        this.event.surname,
        this.event.otherNames,
        this.event.otherForename,
        this.event.otherSurname,
        this.event.mothersMaiden,
        this.datePipe.transform(this.event.birthDate, _shortDate),
        this.event.countryOfBirth,
        this.event.townOfBirth,
        this.event.nationality,  
        this.event.hasUKNINO,
        this.event.NINO,
        this.event.hasPassport,
        this.event.passportNo,
        this.event.passportCountry,
        this.event.hasDrivingLicence,
        this.event.drivingLicence,
        this.event.licenceCountry,
        this.event.ElectricitySupplierNumber,
        this.event.NatEntCardNo,
        this.event.IsNICAvailable, 
        this.event.NICNumber, 
        this.event.NICCountryOfIssue, 
        this.event.PVGSchemeID, 
        this.event.EmailAddress, 
        this.event.EveningPhoneNumber, 
        this.event.DaytimePhoneNumber,
        this.datePipe.transform(this.event.currResidentFrom, _shortDate),
        this.event.currAddrLine1,
        this.event.currAddrLine2,
        this.event.currAddrTown,
        this.event.currAddrCounty,
        this.event.currAddrPostCode,
        this.event.currAddrCountry,
        this.event.otherDetails,
        this.auth.userProfile.name

      );
    }
  }

  private _buildForm() {
    this.eventForm = this.fb.group({
      gender: [this.formEvent.gender, [
        Validators.required,
        //Validators.minLength(this.ef.textMin),
       // Validators.maxLength(this.ef.genderMax)
      ]],
      title: [this.formEvent.title, [
        Validators.required,
        //Validators.minLength(this.ef.textMin),
        //Validators.maxLength(this.ef.titleMax)
      ]],
      otherTitle: [this.formEvent.otherTitle, [
        //Validators.required,
        //Validators.minLength(this.ef.textMin),
        Validators.maxLength(this.ef.otherTitleMax),
        Validators.pattern(TITLE_REGEX)
      ]],
      forename: [this.formEvent.forename, [
        Validators.required,
        Validators.minLength(this.ef.nameMin),
        Validators.maxLength(this.ef.forenameMax),
        Validators.pattern(NAME_REGEX)
      ]],
      surname: [this.formEvent.surname, [
        Validators.required,
        Validators.minLength(this.ef.nameMin),
        Validators.maxLength(this.ef.surnameMax),
        Validators.pattern(NAME_REGEX)
      ]],
      otherNames: [this.formEvent.otherNames,
        Validators.required
      ],
      otherForename: [this.formEvent.otherForename, [
        Validators.required,
        Validators.minLength(this.ef.nameMin),
        Validators.maxLength(this.ef.forenameMax),
        Validators.pattern(NAME_REGEX)
      ]],
      otherSurname: [this.formEvent.otherSurname, [
        Validators.required,
        Validators.minLength(this.ef.nameMin),
        Validators.maxLength(this.ef.surnameMax),
        Validators.pattern(NAME_REGEX)
      ]],
      mothersMaiden: [this.formEvent.mothersMaiden, [
        Validators.required,
        Validators.minLength(this.ef.nameMin),
        Validators.maxLength(this.ef.surnameMax),
        Validators.pattern(NAME_REGEX)
      ]],
      birthDate: [this.formEvent.birthDate, [
        Validators.required,
        Validators.maxLength(this.ef.dateMax),
        Validators.pattern(DATE_REGEX)
      ]],
      countryOfBirth: [this.formEvent.countryOfBirth, [
        Validators.required,
        //Validators.minLength(this.ef.nameMin),
        //Validators.maxLength(this.ef.surnameMax)
       // Validators.pattern(NAME_REGEX)
      ]],
      townOfBirth: [this.formEvent.townOfBirth, [
        Validators.required,
        Validators.minLength(this.ef.nameMin),
        Validators.maxLength(this.ef.surnameMax),
        Validators.pattern(NAME_REGEX)
      ]],
      nationality: [this.formEvent.nationality, [
        Validators.required,
        Validators.minLength(this.ef.nameMin),
        Validators.maxLength(this.ef.surnameMax),
        Validators.pattern(NAME_REGEX)
          ]],
      hasUKNINO: [this.formEvent.hasUKNINO,
        Validators.required
      ],
      NINO: [this.formEvent.NINO, [
        Validators.required,
        Validators.pattern(UKNINO_REGEX)
      ]],  
      hasPassport: [this.formEvent.hasPassport,
        Validators.required
      ],
      passportNo: [this.formEvent.passportNo, [
        Validators.required,
        Validators.minLength(this.ef.nameMin),
        Validators.maxLength(this.ef.surnameMax),
        Validators.pattern(ALPHANUMERIC_REGEX)
      ]],      
      passportCountry: [this.formEvent.passportCountry, [
        Validators.required,
        Validators.minLength(this.ef.nameMin),
        Validators.maxLength(this.ef.surnameMax),
        Validators.pattern(NAME_REGEX)
      ]], 
      hasDrivingLicence: [this.formEvent.hasDrivingLicence,
        Validators.required
      ],
      drivingLicence: [this.formEvent.drivingLicence, [
        Validators.required,
        Validators.minLength(this.ef.nameMin),
        Validators.maxLength(this.ef.surnameMax),
        Validators.pattern(ALPHANUMERIC_REGEX)
      ]],      
      licenceCountry: [this.formEvent.licenceCountry, [
        Validators.required,
        Validators.minLength(this.ef.nameMin),
        Validators.maxLength(this.ef.surnameMax),
        Validators.pattern(NAME_REGEX)
      ]], 
      ElectricitySupplierNumber: [this.formEvent.ElectricitySupplierNumber, [
        Validators.pattern(NUMERIC_REGEX)
      ]], 
      NatEntCardNo: [this.formEvent.NatEntCardNo, [
        Validators.pattern(NUMERIC_REGEX)
      ]],
      IsNICAvailable: [this.formEvent.IsNICAvailable,
        Validators.required
      ],
      NICNumber: [this.formEvent.NICNumber, [
        Validators.minLength(this.ef.nameMin),
        Validators.maxLength(this.ef.surnameMax),
        Validators.pattern(NIC_REGEX)
      ]],
      NICCountryOfIssue: [this.formEvent.NICCountryOfIssue, [
        Validators.minLength(this.ef.nameMin),
        Validators.maxLength(this.ef.surnameMax),
        Validators.pattern(NAME_REGEX)
      ]],
      PVGSchemeID: [this.formEvent.PVGSchemeID, [
        Validators.minLength(this.ef.nameMin),
        Validators.maxLength(this.ef.natEntMax),
        Validators.pattern(NUMERIC_REGEX)
      ]],
      EmailAddress: [this.formEvent.EmailAddress, [
        Validators.minLength(this.ef.nameMin),
        Validators.maxLength(this.ef.forenameMax),
        Validators.pattern(EMAIL_REGEX)
      ]],
      EveningPhoneNumber: [this.formEvent.EveningPhoneNumber, [
        Validators.required,
        Validators.minLength(this.ef.phoneMin),
        Validators.maxLength(this.ef.phoneMax),
        Validators.pattern(PHONE_REGEX)
      ]],
      DaytimePhoneNumber: [this.formEvent.DaytimePhoneNumber, [
        Validators.minLength(this.ef.phoneMin),
        Validators.maxLength(this.ef.phoneMax),
        Validators.pattern(PHONE_REGEX)
      ]],
        currResidentFrom: [this.formEvent.currResidentFrom, [
        Validators.required,
        Validators.maxLength(this.ef.dateMax),
        Validators.pattern(DATE_REGEX)
      ]],
        currAddrLine1: [this.formEvent.currAddrLine1, [
        Validators.required,
        Validators.minLength(this.ef.nameMin),
        Validators.maxLength(this.ef.addressMax),
        Validators.pattern(VALID_CHARS_REGEX)
      ]],  
        currAddrLine2: [this.formEvent.currAddrLine2, [
        Validators.minLength(this.ef.nameMin),
        Validators.maxLength(this.ef.addressMax),
        Validators.pattern(VALID_CHARS_REGEX)
      ]], 
        currAddrTown: [this.formEvent.currAddrTown, [
        Validators.required,
        Validators.minLength(this.ef.nameMin),
        Validators.maxLength(this.ef.addressMax),
        Validators.pattern(VALID_CHARS_REGEX)
      ]], 
        currAddrCounty: [this.formEvent.currAddrCounty, [
        Validators.minLength(this.ef.nameMin),
        Validators.maxLength(this.ef.addressMax),
        Validators.pattern(VALID_CHARS_REGEX)
      ]],
        currAddrPostCode: [this.formEvent.currAddrPostCode, [
        Validators.minLength(this.ef.nameMin),
        Validators.maxLength(this.ef.postCodeMax),
        Validators.pattern(POSTCODE_REGEX)
      ]],  
        currAddrCountry: [this.formEvent.currAddrCountry, [
        Validators.minLength(this.ef.nameMin),
        Validators.maxLength(this.ef.addressMax),
        Validators.pattern(VALID_CHARS_REGEX)
      ]],  
        otherDetails: [this.formEvent.otherDetails, [
        Validators.minLength(this.ef.nameMin),
        Validators.maxLength(this.ef.descMax),
        Validators.pattern(VALID_CHARS_REGEX)
      ]]

    });
    // Set local property to eventForm datesGroup control
    this.datesGroup = this.eventForm.get('datesGroup');

    // Subscribe to form value changes
    this.formChangeSub = this.eventForm
      .valueChanges
      .subscribe(data => this._onValueChanged());

    // If edit: mark fields dirty to trigger immediate
    // validation in case editing an event that is no
    // longer valid (for example, an event in the past)
    if (this.isEdit) {
      const _markDirty = group => {
        for (const i in group.controls) {
          if (group.controls.hasOwnProperty(i)) {
            group.controls[i].markAsDirty();
          }
        }
      };
      _markDirty(this.eventForm);
    }

    this._onValueChanged();
  }

  private _onValueChanged() {
    if (!this.eventForm) { return; }
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        const messages = this.ef.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            errorsObj[field] += messages[key] + '<br>';
          }
        }
      }
    };

    // Check validation and set errors
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        if (field !== 'datesGroup') {
          // Set errors for fields not inside datesGroup
          // Clear previous error message (if any)
          this.formErrors[field] = '';
          _setErrMsgs(this.eventForm.get(field), this.formErrors, field);
        } else {
          // Set errors for fields inside datesGroup
          const datesGroupErrors = this.formErrors['datesGroup'];
          for (const dateField in datesGroupErrors) {
            if (datesGroupErrors.hasOwnProperty(dateField)) {
              // Clear previous error message (if any)
              datesGroupErrors[dateField] = '';
              _setErrMsgs(this.datesGroup.get(dateField), datesGroupErrors, dateField);
            }
          }
        }
      }
    }
  }

  private _getSubmitObj() {
    // Convert form startDate/startTime and endDate/endTime
    // to JS dates and populate a new EventModel for submission
    return new EventModel(
      this.eventForm.get('gender').value,
      this.eventForm.get('title').value,
      this.eventForm.get('otherTitle').value,
      this.eventForm.get('forename').value,
      this.eventForm.get('surname').value,
      this.eventForm.get('otherNames').value,
      this.eventForm.get('otherForename').value,
      this.eventForm.get('otherSurname').value,
      this.eventForm.get('mothersMaiden').value,    
      this.eventForm.get('birthDate').value,
      this.eventForm.get('countryOfBirth').value, 
      this.eventForm.get('townOfBirth').value, 
      this.eventForm.get('nationality').value, 
      this.eventForm.get('hasUKNINO').value, 
      this.eventForm.get('NINO').value, 
      this.eventForm.get('hasPassport').value, 
      this.eventForm.get('passportNo').value, 
      this.eventForm.get('passportCountry').value, 
      this.eventForm.get('hasDrivingLicence').value, 
      this.eventForm.get('drivingLicence').value, 
      this.eventForm.get('licenceCountry').value, 
      this.eventForm.get('ElectricitySupplierNumber').value,
      this.eventForm.get('NatEntCardNo').value,
      this.eventForm.get('IsNICAvailable').value,
      this.eventForm.get('NICNumber').value,
      this.eventForm.get('NICCountryOfIssue').value, 
      this.eventForm.get('PVGSchemeID').value,
      this.eventForm.get('EmailAddress').value,
      this.eventForm.get('EveningPhoneNumber').value,
      this.eventForm.get('DaytimePhoneNumber').value,
      this.eventForm.get('currResidentFrom').value,
      this.eventForm.get('currAddrLine1').value,
      this.eventForm.get('currAddrLine2').value,
      this.eventForm.get('currAddrTown').value,
      this.eventForm.get('currAddrCounty').value,
      this.eventForm.get('currAddrPostCode').value,
      this.eventForm.get('currAddrCountry').value,
      this.eventForm.get('otherDetails').value,
       this.auth.userProfile.name,
      this.event ? this.event._id : null
    );
  }



  onSubmit() {
    this.submitting = true;
    this.submitEventObj = this._getSubmitObj();

    if (!this.isEdit) {
      this.submitEventSub = this.api
        .postEvent$(this.submitEventObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    } else {
      this.submitEventSub = this.api
        .editEvent$(this.event._id, this.submitEventObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    }
  }

  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    // Redirect to event detail
    this.router.navigate(['/event', res._id]);
  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  resetForm() {
    this.eventForm.reset();
  }

  ngOnDestroy() {
    if (this.submitEventSub) {
      this.submitEventSub.unsubscribe();
    }
    this.formChangeSub.unsubscribe();
  }

}
