import {generateJwt, Signing} from "@credify/crypto";

const faker = require('faker');
const vnFaker = require('faker/locale/vi');
const Country = require('i18n-iso-countries');
const moment = require('moment');

const randomCategory = () => faker.random.word();

const randomImage = () => faker.image.imageUrl();

const randomWords = length => faker.random.words(length);

const randomBoolean = () => faker.random.boolean();

const randomFiatCurrency = () => ({
    value: randomNumberInRange(500, 5000)
        .toString(),
    currency: 'USD',
});

const randomDate = () => {
    let fakerDate;
    let
        date;
    do {
        fakerDate = faker.date.between('1970-01-01', '2002-12-31');
        date = moment(fakerDate)
            .format('yyyy-MM-DD');
    } while (!moment(fakerDate)
        .isValid());
    return date;
};

const reformatDateTime = (dateTime:string) => moment(dateTime)
    .format('yyyy-MM-DDTHH:mm:ssZ');

const randomDatetime = () => {
    // generate random future dateTime
    let fakerDate;
    let
        date;
    do {
        fakerDate = faker.date.future(10);
        date = `${moment(fakerDate)
            .format('yyyy-MM-DD')}T14:15:22Z`;
    } while (!moment(fakerDate)
        .isValid());
    return date;
};

const randomNumber = max => faker.random.number(max);

const randomNumberInRange = (min, max) => faker.random.number({min, max,});

const randomString = (length:number) => faker.random.alphaNumeric(length);

const generateRandomVnPhoneNumber = () => {
    const vnPrefixes = ['37', '38', '39', '70', '76', '77', '78', '83', '81', '82', '85'];
    const randomPrefix = vnPrefixes[faker.random.number({
        min: 0,
        max: vnPrefixes.length - 1,
    })];
    return randomPrefix + faker.phone.phoneNumber('#######');
};

const generateRandomVnPhone = () => {
    const phone = {
        phoneNumber: generateRandomVnPhoneNumber(),
        countryCode: '+84',
    };
    return phone;
};

const generateRandomEmail = () => faker.internet.email();

const generatePassword = () => {
    // Password must have at least: 1 special character, 1 digit
    const initPassword = `${faker.random.alpha(10) + faker.random.number(999)}@`;
    const password = initPassword.charAt(0)
        .toUpperCase() + initPassword.charAt(1)
        .toLowerCase() + initPassword.slice(2);
    return password;
};

// Start data util for Individual

const generateRandomProfile = (isEnglish, withFullName, email) => {
    //   gender = faker.random.boolean() ? 1 : 0
    const f = isEnglish ? faker : vnFaker;
    // Gender param doesn't work with VN Faker.
    const randomFN = f.name.firstName();
    const randomLN = f.name.lastName();

    const randomFullName = isEnglish ? `${randomFN} ${randomLN}` : `${randomLN} ${randomFN}`;
    const name = withFullName ? {fullName: randomFullName} : {
        firstName: randomFN,
        lastName: randomLN
    };
    const randomPhone = generateRandomVnPhoneNumber();
    const randomEmail = f.internet.email();
    const nameKey = isEnglish ? 'name' : 'localName';
    return {
        [nameKey]: name,
        phones: [
            {
                phoneNumber: randomPhone,
                countryCode: '+84',
            },
        ],
        emails: [
            {
                email: email || randomEmail,
            },
        ],
    };
};

const generateBasicProfile = () => {
    const gender = faker.random.boolean() ? 1 : 0;
    const randomFN = faker.name.firstName(gender);
    const randomLN = faker.name.lastName(gender);
    const randomPhone = generateRandomVnPhoneNumber();
    const randomEmail = faker.internet.email();
    const nameKey = 'name';
    const profile = {
        [nameKey]: {
            firstName: randomFN,
            lastName: randomLN,
        },
        phones: [
            {
                phoneNumber: randomPhone,
                countryCode: '+84',
            },
        ],
        emails: [
            {
                email: randomEmail,
            },
        ],
    };
    return profile;
};

const generateFullProfile = ({wrongName = false, wrongPhone = false, wrongEmail = false} = {}) => {
    const newBasicProfile = generateBasicProfile();
    let date;
    let
        birthday;
    do {
        date = faker.date.between('1970-01-01', '2002-12-31');
        birthday = moment(date)
            .format('yyyy-MM-DD');
    } while (!moment(date)
        .isValid());
    const dob = {
        date: birthday,
    };
    const address = {
        postalCode: faker.address.zipCode(),
        country: Country.alpha2ToAlpha3(faker.address.countryCode()),
        province: faker.address.county(),
        city: faker.address.city(),
        addressLine: faker.address.streetAddress('##'),
    };
    const nationality = {
        country: Country.alpha2ToAlpha3(faker.address.countryCode()),
    };
    let profile = {
        ...newBasicProfile,
        dob,
        address,
        nationality
    };

    if (wrongName) {
        const isEng = !!profile.name;
        const key = isEng ? 'name' : 'localName';
        profile = {
            ...profile,
            [key]: {
                ...profile[key],
                firstName: '',
            },
        };
    }
    if (wrongPhone) {
        profile = {
            ...profile,
            phones: [
                {
                    phoneNumber: '123456',
                    countryCode: '84',
                },
            ],
        };
    }
    if (wrongEmail) {
        profile = {
            ...profile,
            emails: [
                {
                    email: 'test@com',
                },
            ],
        };
    }

    return profile;
};

// End data util for Individual

// Start data util for Organization

const generateOrganizationInfo = () => {
    const companyName = faker.company.companyName();
    return {
        name: companyName,
        appUrl: faker.internet.url(),
        logoUrl: faker.image.imageUrl(),
        websiteUrl: faker.internet.url(),
        email: faker.internet.email(),
        phone: generateRandomVnPhone(),
        description: randomWords(10),
        registrationDate: randomDate(),
        registeredLocalName: companyName,
        registeredName: companyName,
        registrationCountry: faker.address.country(),
        registrationCity: faker.address.city(),
        registrationAddress: faker.address.streetAddress(),
        registrationLicenses: randomWords(5),
        // @ts-ignore
        registrationNumber: randomNumber().toString(),
    };
};

const generateClaimProviderInfo = () => ({
    userCountsApi: faker.internet.url(),
    encryptedClaimsApi: faker.internet.url(),
    offerEvaluationApi: faker.internet.url(),
    offerFilteringApi: faker.internet.url(),
    placementFee: randomFiatCurrency(),
});

const generateGoogleOIDCDebuggerUrl = () => 'https://oidcdebugger.com/debug';

const generateSignature = (signingPrivateKey: string) => {
    const signing = new Signing();
    signing.importPrivateKey(signingPrivateKey);
    return generateJwt(signing);
}

module.exports = {
    randomBoolean,
    reformatDateTime,
    randomDatetime,
    randomString,
    generateRandomEmail,
    generateBasicProfile,
    generateSignature,
    generateFullProfile,
    generateRandomProfile,
    generatePassword,
    generateGoogleOIDCDebuggerUrl,
    generateClaimProviderInfo,
    generateOrganizationInfo,
    randomImage,
    randomCategory
}
  
