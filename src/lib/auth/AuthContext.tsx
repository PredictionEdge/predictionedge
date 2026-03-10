"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  Auth,
} from "firebase/auth";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const googleProvider = new GoogleAuthProvider();

async function syncSession(user: User | null) {
  if (user) {
    const idToken = await user.getIdToken();
    await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
  } else {
    await fetch("/api/auth/session", { method: "DELETE" });
  }
}

function getAuth_lazy(): Auth | null {
  try {
    const { getFirebaseAuth } = require("./firebase");
    return getFirebaseAuth();
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const auth = useMemo(() => getAuth_lazy(), []);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      await syncSession(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (!auth) throw new Error("Firebase not initialized");
      await signInWithEmailAndPassword(auth, email, password);
    },
    [auth]
  );

  const signUp = useCallback(
    async (email: string, password: string) => {
      if (!auth) throw new Error("Firebase not initialized");
      await createUserWithEmailAndPassword(auth, email, password);
    },
    [auth]
  );

  const signInWithGoogle = useCallback(async () => {
    if (!auth) throw new Error("Firebase not initialized");
    await signInWithPopup(auth, googleProvider);
  }, [auth]);

  const signOut = useCallback(async () => {
    if (!auth) throw new Error("Firebase not initialized");
    await firebaseSignOut(auth);
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
