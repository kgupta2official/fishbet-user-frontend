export const SIGNUP = [
  {
    name: 'username',
    label: 'Username',
    type: 'input',
    placeholder: 'Username',
    required: 'Username is required!',
    pattern: {
      value: /^[A-Za-z0-9]{3,}$/,
      message: 'Username must be at least 3 characters long and contain only letters and numbers without spaces.',
    },
  },
  {
    name: 'password',
    label: 'Password',
    type: 'input',
    placeholder: 'Password',
    required: 'Password is required!',
    pattern: {
      value: /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/, 
      message: 'Password must be at least 6 characters with one uppercase, one lowercase, one number, and one special character. Spaces are not allowed.',
    },
  },
  {
    name: 'isAge',
    label: 'I am at least 18 years old and not a resident of the restricted states.',
    type: 'checkbox',
    required: 'Age must be 18+ required!',
  },
  {
    name: 'terms',
    label: 'I accept the Fishbet stars Terms of Use and Privacy Policy',
    type: 'checkbox',
    required: 'Terms and Condition is required!',
  },
];

export const SIGNIN = [
  {
    name: 'username',
    label: 'Username',
    type: 'input',
    placeholder: 'Username',
    required: 'Username is required!',
    pattern: {
      value: /^[A-Za-z0-9]{3,}$/, // Ensures no spaces
      message: 'Username must be at least 3 characters long and contain only letters and numbers without spaces.',
    },
  },
  {
    name: 'password',
    label: 'Password',
    type: 'input',
    placeholder: 'Password',
    required: 'Password is required!',
    pattern: {
      value: /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/, 
      message: 'Spaces are not allowed',
    },
  },
];

export const FORGOT_PASSWORD = [
  {
    name: 'email',
    label: 'Email',
    type: 'input',
    placeholder: 'Enter your email address',
    required: 'Email is required!',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address',
    },
  },
];
