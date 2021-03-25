const equalsDate = (dateA, dateB = new Date()) =>
  dateA.toLocaleString() === dateB.toLocaleString();
const isEmptyObject = obj => Object.keys(obj).length === 0;

const toDateFormat = dateString => dateString.split('T')[0];

export { equalsDate, isEmptyObject, toDateFormat };
