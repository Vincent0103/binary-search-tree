function merge(leftElements, rightElements) {
  const sortedArray = [];
  while (leftElements.length > 0 && rightElements.length > 0) {
    const arrayWithMinimum = (leftElements[0] > rightElements[0]) ? rightElements : leftElements;
    sortedArray.push(arrayWithMinimum.shift());
  }

  return sortedArray.concat(leftElements, rightElements);
}

function mergeSort(array) {
  if (array.length <= 1) return array;

  const middleIndex = Math.floor(array.length / 2);
  const leftElements = mergeSort(array.slice(0, middleIndex));
  const rightElements = mergeSort(array.slice(middleIndex, array.length));
  return merge(leftElements, rightElements);
}

export default mergeSort;
