import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export function mapPostsToJson(
  postsDoc: QueryDocumentSnapshot<DocumentData>[]
) {
  return postsDoc?.map((post) => ({
    ...post.data(),
    createdAt: post.data().createdAt.toDate().toDateString(),
    updatedAt: post.data().updatedAt.toDate().toDateString(),
  }));
}
