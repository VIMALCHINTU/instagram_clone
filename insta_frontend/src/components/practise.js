class Node{
    constructor(value){
        this.value=value
        this.left=null
        this.right=null
    }
}
let mytree=new Node(10)
mytree.left=new Node(8)
mytree.right=new Node(9)
mytree.left.right=new Node(7)
console.log(mytree);
