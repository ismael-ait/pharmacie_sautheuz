const validationUtils = {
  validatePhoneNumber: (phoneNumber) => {
    const phoneNumberRegex = /^(06|07)\d{8}$/;
    return phoneNumberRegex.test(phoneNumber);
  },
  validateName: (name) => {
    const nameRegex = /^(?=.*[^\s])[\p{L}\s-]+$/u;
    return nameRegex.test(name);
  },
  
  
  validateSocialSecurityNumber: (socialSecurityNumber) => {
    const socialSecurityNumberRegex = /^\d{13}$/; // Regex pour vérifier 13 chiffres exactement
    return socialSecurityNumberRegex.test(socialSecurityNumber);
  }
};

module.exports = validationUtils;
