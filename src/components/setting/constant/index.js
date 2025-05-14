export const TAB_CONTROLS = [
  { label: 'Verify Profile', value: 'profile' },
  { label: 'Email', value: 'email' },
  { label: 'Verification', value:'verification'},
  // { label: 'Two Factor', value: 'twoFactor' },
  { label: 'Password', value: 'password' },
  { label: 'Avatar', value: 'avatar' },
  // { label: 'Preferences', value: 'preferences' },
  // { label: 'Ignored Users', value: 'ignoredUsers' },
  //   { label: 'Verify', value: 'verify' },
  { label: 'Bonus Drop', value: 'bonusDrop' },
  { label:'Document Verification', value:'verify'},
  { label: 'Self Exclusion', value: 'responsibleGambling' },
];

export const BASIC_INFO_FORM_CONTROLS = [
  {
    name: 'username',
    label: 'User Name',
    type: 'input',
    placeholder: 'Enter Username',
    required: 'This field is required',
  },
  {
    name: 'firstName',
    label: 'First Name',
    type: 'input',
    placeholder: 'First Name',
    required: 'This field is required',
    // width: '300px',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'input',
    placeholder: 'Last name',
    required: 'This field is required',
    // width: '300px',
  },
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'date',
    placeholder: 'Date of Birth',
    required: 'This field is required',
    // width: '400px',
  },
  // {
  //   name: 'country',
  //   label: 'Country',
  //   type: 'select',
  //   placeholder: 'Country',
  //   // required: 'This field is required',
  //   // width: '300px',
  //   options: [
  //     { label: 'India', value: 'india' },
  //     { label: 'United States', value: 'united states' },
  //     { label: 'Canada', value: 'canada' },
  //   ],
  // },
  {
    name: 'stateCode',
    label: 'State',
    type: 'select',
    placeholder: 'State',
    // required: 'This field is required',
    // width: '400px',
  },
];

export const KYC_STATUS = {
  approved: 'approved',
  resubmission_requested: 'resubmission_requested',
  declined: 'declined',
  expired: 'expired',
  abandoned: 'rbandoned',
  review: 'review',
  requested: 'requested',
};
