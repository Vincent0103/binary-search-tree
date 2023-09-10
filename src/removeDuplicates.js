function removeDuplicates(arr) {
  const noDupsArr = [];
  arr.forEach((element, index) => {
    if (arr[index + 1] !== element) noDupsArr.push(element);
  });
  return noDupsArr;
}

export default removeDuplicates;
