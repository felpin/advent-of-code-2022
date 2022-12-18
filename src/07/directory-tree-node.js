module.exports = class DirectoryTreeNode {
  constructor(name, parent) {
    this.children = {};
    this.files = [];
    this.name = name;
    this.parent = parent;
  }

  createChildDirectory(name) {
    const child = new DirectoryTreeNode(name, this);
    this.children[name] = child;

    return child;
  }

  createChildFile(size) {
    this.files.push(size);
  }

  get size() {
    return (
      Object.values(this.children).reduce(
        (size, directory) => size + directory.size,
        0
      ) + this.files.reduce((size, file) => size + file, 0)
    );
  }
};
