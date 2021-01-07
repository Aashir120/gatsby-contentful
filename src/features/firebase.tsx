import firebase from "gatsby-plugin-firebase";

export const logInUser = async (email: string, password: string) => {
  const user = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  return user;
};

export const signUpUser = async (email: string, password: string) => {
  const user = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  return user;
};