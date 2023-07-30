const PasswordType = () => {
  const passwordType = ["Pririty", "Entertainment", "Study", "Social Media", "E-Commerce", "Payment", "Others"];
  return passwordType;
}

const emptyPasswordData = [
  {
    title: 'Pririty',
    data: [],
  },
  {
    title: 'Entertainment',
    data: [],
  },
  {
    title: 'Study',
    data: [],
  },
  {
    title: 'Social Media',
    data: [],
  },
  {
    title: 'E-Commerce',
    data: [],
  },
  {
    title: 'Payment',
    data: [],
  },
  {
    title: 'Others',
    data: [],
  },
];

const newPasswordList = {
  Pririty : {
      title : 'Pririty',
      data : []
  },
  Entertainment : {
      title : 'Entertainment',
      data : []
  },
  Study : {
      title : 'Study',
      data : []
  },
  Others : {
      title : 'Others',
      data : []
  },
  ECommerce : {
      title : 'E-Commerce',
      data : []
  },
  SocialMedia : {
      title : 'Social Media',
      data : []
  },
  Payment : {
      title : 'Payment',
      data : []
  }
};

const dropDownData = [
  { label: 'Pririty', value: '1' },
  { label: 'Entertainment', value: '2' },
  { label: 'Study', value: '3' },
  { label: 'Social Media', value: '4' },
  { label: 'E-Commerce', value: '5' },
  { label: 'Payment', value: '6' },
  { label: 'Others', value: '7' },
];

const getType = (data:string) => {
      data = `${data}`;
      if(data == 'Pririty') return 'Pririty';
      if(data == 'Entertainment') return 'Entertainment';
      if(data == 'Study') return  'Study';
      if(data == 'Social Media') return 'SocialMedia';
      if(data == 'E-Commerce') return 'ECommerce';
      if(data == 'Payment') return 'Payment';
      if(data == 'Others') return 'Others';
}

const UppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const NumericChars = "0123456789";
const SpecialChars = "@#$&";


const generatePassword = (passwordLength: any, isUppercaseChars: any, isLowercaseChars: any, isNumericChars: any, isSpecialChars: any) => {
  const uppercaseChars = isUppercaseChars ? UppercaseChars : "";
  const lowercaseChars = isLowercaseChars ? LowercaseChars : "";
  const numericChars = isNumericChars ? NumericChars : "";
  const specialChars = isSpecialChars ? SpecialChars : "";

  let password = "";

  // Ensure inclusion of at least one uppercase letter, lowercase letter, number, and special character
  password += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
  password += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
  password += numericChars.charAt(Math.floor(Math.random() * numericChars.length));
  password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));

  const remainingLength = passwordLength - password.length;

  // Fill the remaining password length with random characters from all character sets
  for (let i = 0; i < remainingLength; i++) {
    const allChars = uppercaseChars + lowercaseChars + numericChars + specialChars;
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  // Shuffle the password characters to randomize their positions
  const shuffledPassword = password.split('').sort(() => 0.5 - Math.random()).join('');
  return shuffledPassword;
};


export {
  PasswordType,
  emptyPasswordData,
  generatePassword,
  dropDownData,
  getType,
  newPasswordList,
}