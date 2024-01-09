import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
    isAuthenticated: boolean;
    userType: string;
}

export interface AuthStore extends AuthState {
    setAuthStatus: (isAuthenticated: boolean, userType: string) => void;
    clearAuthStatus: () => void;
}

const initialState: Pick<AuthStore, keyof AuthState> = {
    isAuthenticated: false,
    userType: "",
};

const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            ...initialState,
            setAuthStatus: (isAuthenticated, userType) => {
                set(() => ({ isAuthenticated, userType }));
            },
            clearAuthStatus: () => {
                set(() => ({...initialState}))
            }
        }),
        { name: "auth-storage", storage: createJSONStorage(() => localStorage) }
    )
);

export default useAuthStore;
