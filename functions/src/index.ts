import * as functions from "firebase-functions";
import { Project } from "./models/Project";
import * as firebase from "firebase-admin";
import { ShareProjectDTO } from "./models/ShareProjectDTO";

firebase.initializeApp();

exports.onCreateProject = functions.firestore
  .document("projects/{projectId}")
  .onCreate(async (snap, context) => {
    return snap.ref.update({
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

exports.onUpdateProject = functions.firestore
  .document("projects/{projectId}")
  .onUpdate((chnage, context) => {
    const oldData: Project = chnage.before.data() as any;
    const now = new Date().getTime();
    functions.logger.log("updated at", oldData.updatedAt);
    if (now > (oldData.updatedAt?.getTime() || now)) {
      functions.logger.log("working", oldData.updatedAt);
      chnage.after.ref.update({ updatedAt: new Date() });
    }
  });

exports.writeUserDoc = functions.auth.user().onCreate(async (user) => {
  const db = firebase.firestore();
  const c_users = db.collection("users");
  const userName = user.displayName?.replace(" ", "-").toLowerCase();
  const m_users = await c_users.where("userName", "==", userName).get();
  let val: number = 0;
  if (m_users.docs.length > 0) {
    val = Math.floor(1000 + Math.random() * 9000);
  }
  c_users.add({
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    phoneNumber: user.phoneNumber,
    photoUrl: user.photoURL,
    userName: val > 0 ? userName + "-" + val : userName,
  });
});

exports.shareProject = functions.https.onCall(
  async (data: ShareProjectDTO, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "authentication error"
      );
    }
    const db = firebase.firestore();
    const c_users = db.collection("users");

    data.userNames.forEach(async (username) => {
      const qs = await c_users.where("userName", "==", username).get();
      const userRef = qs.docs[0].ref;
      const userData = qs.docs[0].data() as any;
      const sharedProjects: string[] = userData.sharedProjects || [];
      if (sharedProjects.filter((sp) => sp === data.projectId).length === 0) {
        sharedProjects.push(data.projectId);
        userRef.update({ sharedProjects: sharedProjects });
      }
    });

    return data.userNames;
  }
);
