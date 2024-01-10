import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface QuizItem {
    question: String,
    answer: String,
    previousAnswers: String[]
}

interface QuizItems {
    [index: number]: QuizItem
}

interface QuizState {
    items : QuizItems
}

export interface QuizStore extends QuizState {
    setQuizItems: (items: QuizItems) => void;
}

const initialState: Pick<QuizStore, keyof QuizState> = {
    items: [
        {
            question: "who am i?",
            answer: "",
            previousAnswers: ["abc", "asd"]
        },
        {
            question: "who are you?",
            answer: "",
            previousAnswers: ["abc", "asd"]
        },
    ]
};

const useAuthStore = create<QuizStore>()(
    persist(
        (set) => ({
            ...initialState,
            setQuizItems: (items) => {
                console.log(items)
                set((state) => state.items = items);
            },
        }),
        { name: "quiz-storage", storage: createJSONStorage(() => localStorage) }
    )
);

export default useAuthStore;
