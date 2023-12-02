import { ObjectId } from "mongodb";
export type TreeNode = {
    _id: string | ObjectId;
    name: string;
    description: string;
    parentId: string | ObjectId;
    icon: string;
    nodeColor: string; //hex color
    cost: number; //cost to unlock, default to 1

}
export type Tree = {
    _id: string | ObjectId;
    name: string;
    description: string;
    nodeColor: string; //hex color
    auto_currency: boolean;//to increase currency automatically after every level
    rootNode: TreeNode;
    background: string;//image url or hex color
    levelPoints: Number[];//points allocation for each level, can be changed later
    isPresenting: boolean;//if the tree is currently being presented
    currentUnlockedId: string | ObjectId;//the id of the node that is unlocked meaning we tarverse the tree from root to this node, this is how we save the progress
}
