import { getAsValue , setAsValue } from '@utils';
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

const searchType = [
  { label: 'Password', value: '1' },
  { label: 'Site Name', value: '2' },
  { label: 'Username', value: '3' },
  { label: 'Safe Password', value: '4' },
  { label: 'Weak Password', value: '5' },
  { label: 'Risk Password', value: '6' },
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

const checkPasswordStrength = (password:string) => {
  var strength = 0;
  var tips = "";

  if (password.length < 8) {
    tips += "Make the password longer. ";
  } else {
    strength += 1;
  }

  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
    strength += 1;
  } else {
    tips += "Use both lowercase and uppercase letters. ";
  }

  // Check for numbers
  if (password.match(/\d/)) {
    strength += 1;
  } else {
    tips += "Include at least one number. ";
  }

  // Check for special characters
  if (password.match(/[^a-zA-Z\d]/)) {
    strength += 1;
  } else {
    tips += "Include at least one special character. ";
  }

  // 1 for weak 
  // 2 for Medium difficulty
  // 3 for Dificult
  // 4 for Exactly Difficult
  // Return results
  if (strength < 2) {
    return 1;
  } else if (strength === 2) {
    return 2;
  } else if (strength === 3) {
    return 3;
  } else {
    return 4;
  }
}

const countPasswordStregth = (arr,obj) =>{
    arr.map((item,index)=>{
        let strength = checkPasswordStrength(item.password);
        if(strength == 1) {
          obj.risk++;
        }else if(strength == 2 ){
          obj.weak++;
        }else{
          obj.safe++;
        }
    });
}

const getAllPasswordStrength = async (appStore) =>{
    const user = appStore.currentUser;
    let userData = await getAsValue(`${user}`);
    let { data } = JSON.parse(userData);
    let countObj = {
      safe : 0,
      weak : 0,
      risk : 0,
    }
    if (data) {
      let { Pririty, Entertainment, Study, Others, ECommerce, SocialMedia, Payment } = data;
      countPasswordStregth(Pririty.data,countObj);
      countPasswordStregth(Entertainment.data,countObj);
      countPasswordStregth(Study.data,countObj);
      countPasswordStregth(Others.data,countObj);
      countPasswordStregth(ECommerce.data,countObj);
      countPasswordStregth(SocialMedia.data,countObj);
      countPasswordStregth(Payment.data,countObj);
    }
    return countObj;
}


const getAllPasswordList = async (appStore:any) =>{
  const user = appStore.currentUser;
  let userData = await getAsValue(`${user}`);
  let { data } = JSON.parse(userData);
  let arr = [];
  if(data) {
    let { Pririty, Entertainment, Study, Others, ECommerce, SocialMedia, Payment } = data;
    arr = [...Pririty.data,...Entertainment.data,...Study.data,...Others.data,...ECommerce.data,...SocialMedia.data,...Payment.data]; 
  }
 return arr;
}

const isExpire = async () =>{
  const lastime =await getAsValue('LastUpdatedTime');
  if(!lastime  || lastime?.length == 0){
    await setAsValue('LastUpdatedTime',`${new Date()}`);
  }else{
    let diff = Math.abs(Date.parse(lastime) - new Date());
    if(diff>0){
      let minutes = Math.floor(diff / 1000 / 60);
      if(minutes>=10){
        return true;
      }else{
        await setAsValue('LastUpdatedTime',`${new Date()}`);
        return false;
      }
    }
  }
  return false;
}


export {
  PasswordType,
  emptyPasswordData,
  generatePassword,
  dropDownData,
  getType,
  newPasswordList,
  checkPasswordStrength,
  getAllPasswordStrength,
  getAllPasswordList,
  searchType,
  isExpire,
}