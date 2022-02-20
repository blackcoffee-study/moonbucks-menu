const isNodeChanged = (node1, node2) => {
  const node1Attributes = node1.attributes;
  const node2Attributes = node2.attributes;

  if (node1Attributes.length != node2Attributes.length) return true;

  const differentAttribute = Array.from(node1Attributes).find((attribute) => {
    const { name } = attribute;
    const attribute1 = node1.getAttribute(name);
    const attribute2 = node2.getAttribute(name);

    return attribute1 !== attribute2;
  });

  if (differentAttribute) return true;

  if (node1.children.length === 0 && node2.children.length === 0 && node1.textContent !== node2.textContent) {
    return true;
  }

  return false;
};

const applyDiff = (parentNode, currentNode, virtualNode) => {
  if (currentNode && !virtualNode) {
    currentNode.remove();
    return;
  }

  if (!currentNode && virtualNode) {
    parentNode.appendChild(virtualNode);
    return;
  }

  if (isNodeChanged(virtualNode, currentNode)) {
    currentNode.replaceWith(virtualNode);
    return;
  }

  const realChildren = Array.from(currentNode.children);
  const virtualChildren = Array.from(virtualNode.children);

  // 더 많은 children 갖고 있는 node 찾기
  const max = Math.max(realChildren.length, virtualChildren.length);

  // 재귀
  for (let i = 0; i < max; i++) {
    applyDiff(currentNode, realChildren[i], virtualChildren[i]);
  }
};

export default applyDiff;
