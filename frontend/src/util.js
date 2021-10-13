export const stringToOption = (answer) => ({ label: answer, value: answer });

export const optionsToAnswers = (options) => (options ? options.map((e) => e.value) : []);

export const answersToOptions = (answers) => answers.map(stringToOption);

export const dataToAddress = (data) => data.description;

export const optionsFromData = (data) => data.map((e) => stringToOption(dataToAddress(e)));

export const capitalize = (str) => str[0].toUpperCase() + str.substring(1);
