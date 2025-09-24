export default function normalizeConstituentData(constituentSubmissionData) {
    const constituentFirstName = (constituentSubmissionData?.constituentFirstName || "").trim();
    const constituentLastName = (constituentSubmissionData?.constituentLastName || "").trim();

    // trimming - toLowerCase - strip CRLF injection protection
    const constituentEmail = (constituentSubmissionData?.constituentEmail || "").trim().toLowerCase().replace(/[\r\n]/g, "");
 
    const constituentPhone = (constituentSubmissionData?.constituentPhone || "").trim();
    const constituentAddress = (constituentSubmissionData?.constituentAddress || "").trim();
    const constituentAddressTwo = (constituentSubmissionData?.constituentAddressTwo || "").trim();
    const constituentCity = toTitleCase((constituentSubmissionData?.constituentCity || "").trim());
    const constituentState = toTitleCase((constituentSubmissionData?.constituentState || "").trim());
    const constituentZip = (constituentSubmissionData?.constituentZip || "").trim();
    const constituentEmailBody = (constituentSubmissionData?.constituentEmailBody || "").trim();
    const formID = constituentSubmissionData?.formID;

    // length checks on required fields
    if(constituentFirstName.length > 100) throw new Error("First name too long");
    if(!constituentFirstName.length) throw new Error("First name is required");

    if(constituentLastName.length > 100) throw new Error("Last name too long");
    if(!constituentLastName.length) throw new Error("Last name is required");


    if(constituentEmail.length > 254) throw new Error("Email too long");
    if(!constituentEmail.length) throw new Error("Email is required");


    if(constituentAddress.length > 255) throw new Error("Address #1 too long");
    if(!constituentAddress.length) throw new Error("Address #1 is required");


    if(constituentCity.length > 100) throw new Error("City too long");
    if(!constituentCity.length) throw new Error("City is required");



    if(constituentState.length > 20) throw new Error("State too long");
    if(!constituentState.length) throw new Error("State is required");


    if(constituentZip.length > 10) throw new Error("Zip too long");
    if(!constituentZip.length) throw new Error("Zip is required");


    if(constituentEmailBody.length > 2000) throw new Error("Email Body too long");
    if(!constituentEmailBody.length) throw new Error("Email Body is required");


    // ---- CHECK EMAIL FORMAT ---- 
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(constituentEmail)) { 
        throw new Error("Invalid email format"); 
    }

    // ---- CHECK ZIP FORMAT ---- 
    if (constituentZip && !/^\d{5}(-\d{4})?$/.test(constituentZip)) {
        throw new Error("Invalid ZIP format");
    }

    // ---- CHECK PHONE FORMAT ----     
    if (constituentPhone.length) {
        if (constituentPhone.length > 20) throw new Error("Phone number too long");

        if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(constituentPhone)) {
            throw new Error("Invalid phone format");
        }
    }

    // ---- CHECK ADDRESS 2 FORMAT ----     
    if (constituentAddressTwo.length) {
        if(constituentAddressTwo.length > 255) throw new Error("Address #2 too long");
    }

    return {
        constituentFirstName,
        constituentLastName,
        constituentEmail,
        constituentPhone,
        constituentAddress,
        constituentAddressTwo,
        constituentCity,
        constituentState,
        constituentZip,
        constituentEmailBody,
        formID
    };

}

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(/\s+/)               // split on any whitespace
    .filter(Boolean)            // remove empty strings
    .map(word => {
      // if word has at least 1 char, capitalize first, leave the rest
      return word.length > 0
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : "";
    })
    .join(" ");
}