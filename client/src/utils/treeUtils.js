export function generateTreeHTML(node, prefix = '', isLeft = true) {
    if (!node) return '';
  
    let treeHTML = '';
    treeHTML += prefix + (isLeft ? "├── " : "└── ") + (node.type === 'operator' ? node.operator : `${node.key} ${node.operator} ${node.value}`) + '<br>';
  
    if (node.left) treeHTML += generateTreeHTML(node.left, prefix + (isLeft ? "│   " : "    "), true);
    if (node.right) treeHTML += generateTreeHTML(node.right, prefix + (isLeft ? "│   " : "    "), false);
  
    return treeHTML;
  }