function findCommonItem(compartments) {
  let common = new Set(compartments[0].split(""));

  for (const compartment of compartments.slice(1)) {
    const nextCommon = new Set();

    for (const item of compartment.split("")) {
      if (common.has(item)) {
        nextCommon.add(item);
      }
    }

    common = nextCommon;
  }

  const commonItems = Array.from(common.values());
  return commonItems.length > 0 ? commonItems[0] : undefined;
}

function getItemPriority(item) {
  if (!item) {
    return 0;
  }

  const code = item.charCodeAt(0);
  return code >= 97 ? code - 96 : code - 38;
}

function separateCompartments(input) {
  return [input.slice(0, input.length / 2), input.slice(input.length / 2)];
}

module.exports = (input) => {
  return getItemPriority(findCommonItem(separateCompartments(input)));
};
