/**
 * 红黑树
 */
export class RedBlackTree<T> {
    private root: RBNode<T> | null = null;

    private rotateLeft(node: RBNode<T>): void {
        const right = node.right!;
        node.right = right.left;
        
        if (right.left) right.left.parent = node;
        right.parent = node.parent;
        
        if (!node.parent) this.root = right;
        else if (node === node.parent.left) node.parent.left = right;
        else node.parent.right = right;
        
        right.left = node;
        node.parent = right;
    }

    private rotateRight(node: RBNode<T>): void {
        const left = node.left!;
        node.left = left.right;
        
        if (left.right) left.right.parent = node;
        left.parent = node.parent;
        
        if (!node.parent) this.root = left;
        else if (node === node.parent.right) node.parent.right = left;
        else node.parent.left = left;
        
        left.right = node;
        node.parent = left;
    }

    insert(value: T): void {
        let node = new RBNode(value);
        
        if (!this.root) {
            this.root = node;
            node.color = false;
            return;
        }

        let parent: RBNode<T> | null = null;
        let current = this.root;
        
        while (current) {
            parent = current;
            if (value < current.value) current = current.left;
            else current = current.right;
        }

        node.parent = parent;
        if (value < parent!.value) parent!.left = node;
        else parent!.right = node;

        this.fixInsertion(node);
    }

    private fixInsertion(node: RBNode<T>): void {
        while (node.parent?.color) {
            if (node.parent === node.parent.parent?.left) {
                const uncle = node.parent.parent.right;
                if (uncle?.color) {
                    node.parent.color = false;
                    uncle.color = false;
                    node.parent.parent.color = true;
                    node = node.parent.parent;
                } else {
                    if (node === node.parent.right) {
                        node = node.parent;
                        this.rotateLeft(node);
                    }
                    node.parent!.color = false;
                    node.parent!.parent!.color = true;
                    this.rotateRight(node.parent!.parent!);
                }
            } else {
                const uncle = node.parent.parent?.left;
                if (uncle?.color) {
                    node.parent.color = false;
                    uncle.color = false;
                    node.parent.parent!.color = true;
                    node = node.parent.parent!;
                } else {
                    if (node === node.parent.left) {
                        node = node.parent;
                        this.rotateRight(node);
                    }
                    node.parent!.color = false;
                    node.parent!.parent!.color = true;
                    this.rotateLeft(node.parent!.parent!);
                }
            }
            if (node === this.root) break;
        }
        this.root!.color = false;
    }
}

/**
 * 红黑树节点
 */
class RBNode<T> {
    constructor(
        public value: T,
        public color: boolean = true, // true为红色，false为黑色
        public left: RBNode<T> | null = null,
        public right: RBNode<T> | null = null,
        public parent: RBNode<T> | null = null
    ) {}
}
