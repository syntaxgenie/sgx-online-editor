import { User } from "@firebase/auth-types";
import firebase from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  logOut,
  signInWithGitHub,
  signInWithGoogle,
} from "../../firebase/fire-auth/FireAuth";
import {
  deleteSharedProjectId,
  getUserData,
} from "../../firebase/firestore/Firestore";
import { Project } from "../projects-context/ProjectsContext";

export enum SignInMethod {
  Google,
  GitHub,
}

export interface IUserContext {
  isAuth: boolean;
  user: User | null;
  userName: string;
  sharedProjects: Project[];
  register: (method: SignInMethod) => void;
  signIn: (method: SignInMethod) => void;
  signOut: () => void;
  removeSharedProjectFromList: (project: Project) => Promise<void | null>;
}

interface IState {
  isAuth: boolean;
  user: User | null;
}

const initialContext: IUserContext = {
  isAuth: false,
  user: null,
  userName: "",
  sharedProjects: [],
  register: () => {},
  signIn: () => {},
  signOut: () => {},
  removeSharedProjectFromList: (project: Project) =>
    new Promise<null>(() => {}),
};

const initialState: IState = {
  isAuth: false,
  user: null,
};

const UserContext = createContext<IUserContext>(initialContext);

interface IProps {
  children: any;
}

export const UserProvider = (props: IProps) => {
  const [state, setState] = useState(initialState);
  const [userName, setUserName] = useState("");
  const [sharedProjects, setSharedProjecs] = useState<Project[]>([]);
  const history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user != null) {
        setState({
          isAuth: true,
          user: user,
        });

        getUserData(user.uid)
          .then((data) => {
            setUserName(data.username);
            setSharedProjecs(data.sharedProjects);
          })
          .catch((error) => {
            console.log("cant get user name:" + error);
          });
      } else {
        console.log("not sign in");
      }
    });
  }, []);

  const register = (method: SignInMethod) => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        if (method === SignInMethod.Google) {
          signInWithGoogle()
            .then((value) => {
              setState({
                isAuth: true,
                user: value?.user || null,
              });
              history.push("home");
            })
            .catch((reason) => {
              console.log(reason);
            });
        } else {
          signInWithGitHub()
            .then((value) => {
              setState({
                isAuth: true,
                user: value?.user || null,
              });
              history.push("home");
            })
            .catch((reason) => {
              console.log("error::", reason);
            });
        }
      })
      .catch((reason) => {
        console.log("reason:::", reason);
      });
  };

  const signIn = (method: SignInMethod) => {
    if (method === SignInMethod.Google) {
      signInWithGoogle()
        .then((value) => {
          setState({
            isAuth: true,
            user: value?.user || null,
          });
          history.push("home");
        })
        .catch((reason) => {
          console.log(reason);
        });
    } else {
      signInWithGitHub()
        .then((value) => {
          setState({
            isAuth: true,
            user: value?.user || null,
          });
          history.push("home");
        })
        .catch((reason) => {
          console.log(reason);
        });
    }
  };

  const removeSharedProjectFromList = async (project: Project) => {
    if (project.id && state.user?.uid) {
      return deleteSharedProjectId(project.id, state.user?.uid)
        .then(() => {
          setSharedProjecs((ps) => {
            return sharedProjects.filter((p) => p.id !== project.id);
          });
        })
        .catch((error) => {
          console.log("shared project id deletion failted with", error);
        });
    }
    return null;
  };

  const signOut = () => {
    logOut().then(() => {
      history.push("login");
    });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        userName,
        sharedProjects,
        register,
        signIn,
        signOut,
        removeSharedProjectFromList,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = (): IUserContext => useContext(UserContext);
