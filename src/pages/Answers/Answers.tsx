import { Button, Container, List, TextInput, Title, Text } from "@mantine/core";
import classes from "./Answers.module.css";
import useQuizStore from '@/store/useQuizStore';
import useAuthStore from "@/store/useAuthStore";

function Answers() {
    const { clearAuthStatus } = useAuthStore((state) => state);
    const { items, setQuizItems } = useQuizStore((state) => state);

    const setAnswer = (ans: string, index: number) => {
        setQuizItems(
            Object.values({
                ...items,
                [index]: { ...items[index], answer: ans },
            })
        );
    };

    const onSubmitAnswer = (index: number) => {
        if (items[index].answer) {
            setQuizItems(
                Object.values({
                    ...items,
                    [index]: {
                        ...items[index],
                        previousAnswers: [
                            ...items[index].previousAnswers,
                            items[index].answer,
                        ],
                        answer: "",
                    },
                })
            );
        }
    };

    const quizListItems = items?.map((quiz: any, index: number) => (
        <span key={quiz.question}>
        <List.Item className={classes.listItems}>
            {quiz.question}
            <div>
                Enter Your Answer: 
                <TextInput value={quiz.answer} onChange={(event) => setAnswer(event.target.value, index)}/>
                <Button mt='md' onClick={() => onSubmitAnswer(index)}>Submit</Button>
            </div>
            {quiz.previousAnswers.length ? <div>Previous Answer(s): {quiz.previousAnswers.join(', ')}</div> : null}
        </List.Item>
        {/* <Divider /> */}
        </span>
    ))

    return (
        <Container className={classes.container}>
            {items && !!items.length ? (
                <>
                    <Title order={3} mt='xl'>Answer these question</Title>
                    <List withPadding icon={<></>}>
                        {quizListItems}
                    </List>
                </>
            ) : (
                <Text m='xl'>There is no question! Ask admin to create a few.</Text>
            )}
            <Button mt='xl' onClick={clearAuthStatus}>Log Out</Button>
        </Container>
    )
}

export default Answers;