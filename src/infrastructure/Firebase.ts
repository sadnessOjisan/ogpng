import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/storage";
import { EnvType } from "../types/util/env";
import { FirebaseConfigType } from "../types/util/firebase";

export const genFirebaseConfig = (env: EnvType): FirebaseConfigType => {
  switch (env) {
    case "development":
      return {
        apiKey: "AIzaSyAjIt9xC4sxdqerZhe6OQcgqqy7IpERgXc",
        authDomain: "ogpng-dev-ca280.firebaseapp.com",
        databaseURL: "https://ogpng-dev-ca280.firebaseio.com",
        projectId: "ogpng-dev-ca280",
        storageBucket: "ogpng-dev-ca280.appspot.com",
        messagingSenderId: "12952861645",
        appId: "1:12952861645:web:5cd3a751ac755e3cf0a284",
        measurementId: "G-RRBQC4QNBH",
      };
    case "production":
      return {
        apiKey: "AIzaSyCTZTIzkXdFLP_oFKy__oKjhUUMLDeU-gk",
        authDomain: "ogpng-fed0a.firebaseapp.com",
        databaseURL: "https://ogpng-fed0a.firebaseio.com",
        projectId: "ogpng-fed0a",
        storageBucket: "ogpng-fed0a.appspot.com",
        messagingSenderId: "1072339628875",
        appId: "1:1072339628875:web:5aa1b319bdf18c8576aece",
        measurementId: "G-BSNFTVKR5C",
      };
    default:
      throw new Error("unexpected env");
  }
};

export default class Firebase {
  private static _instance: Firebase;
  private _app: firebase.app.App;
  private _storage: firebase.storage.Storage;

  private constructor() {
    // https://github.com/zeit/next.js/issues/1999#issuecomment-302244429
    if (!firebase.apps.length) {
      const env = genFirebaseConfig(process.env.NODE_ENV);
      firebase.initializeApp(env);
      if (process.browser) {
        firebase.analytics();
      }
    }
    if (process.browser) {
      firebase.analytics();
    }
  }

  init() {
    this.app;
    this.storage;
  }

  public static get instance(): Firebase {
    console.log(this._instance);
    if (!this._instance) {
      this._instance = new Firebase();
    }
    return this._instance;
  }

  public get app() {
    if (this._app) {
      return this._app;
    } else {
      this._app = firebase.app();
      return this._app;
    }
  }

  public get storage() {
    if (this._storage) {
      return this._storage;
    } else {
      this._storage = firebase.storage();
      return this._storage;
    }
  }
}
