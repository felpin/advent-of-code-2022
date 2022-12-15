function findCommonItem(rucksacks) {
  let common = new Set(rucksacks[0].split(""));

  for (const compartment of rucksacks.slice(1)) {
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

function getItemPriority(badge) {
  if (!badge) {
    return 0;
  }

  const code = badge.charCodeAt(0);
  return code >= 97 ? code - 96 : code - 38;
}

module.exports = (input) => {
  return getItemPriority(findCommonItem(input));
};
