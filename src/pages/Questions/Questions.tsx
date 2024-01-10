import { useState } from "react";
import { Button, Container, List, Title, Text, TextInput, Modal } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import classes from "./Questions.module.css";
import useQuizStore from '@/store/useQuizStore';
import useAuthStore from "@/store/useAuthStore";

function Questions() {
    const { clearAuthStatus } = useAuthStore((state) => state);
    const { items, setQuizItems } = useQuizStore((state) => state);
    const [questionInput, setQuestionInput] = useState('');

    const [opened, { open, close }] = useDisclosure(false);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

    const deleteHandler = (index: number) => {
        let newArr = [...items]
        newArr.splice(index,1)
        setQuizItems(newArr) 
    }

    const createHandler = () => {
        if(!questionInput) return
        let newQuizItem = {question: questionInput, answer: "", previousAnswers: []}
        setQuizItems([...items, newQuizItem])
        setQuestionInput('')
    }

    const modalHandler = (index: number) => {
        setSelectedQuestionIndex(index)
        open()
        console.log(selectedQuestionIndex)
    }

    const editHandler = (value: string) => {
        setQuizItems(
            Object.values({
                ...items,
                [selectedQuestionIndex]: { ...items[selectedQuestionIndex], question: value },
            })
        );
    }

    const quizListItems = items?.map((quiz: any, index: number) => (
        <span key={quiz?.question + '-' + index}>
        <List.Item className={classes.listItems}>
            <div>{quiz?.question}</div>
            <div style={{marginTop: '1em'}}>
                <Button onClick={() => modalHandler(index)}>Edit</Button>
                <Button ml='sm' onClick={() => deleteHandler(index)}>Delete</Button>
            </div>
        </List.Item>
        </span>
    ))

    return (
        <>
        <Container className={classes.container}>
            <>{JSON.stringify(items)}</>
            <TextInput value={questionInput} onChange={(e) => setQuestionInput(e.target.value)} placeholder="Create new question"/>
            <Button mt='sm' onClick={createHandler}>Create</Button>

            {items && !!items.length ? (
                <>
                    <Title order={3} mt='xl'>Questions</Title>
                    <List withPadding icon={<></>}>
                        {quizListItems}
                    </List>
                </>
            ) : (
                <Text m='xl'>Start by creating a question</Text>
            )}

            <Button mt="xl" onClick={clearAuthStatus}>
                Log Out
            </Button>
        </Container>

        <Modal opened={opened} onClose={close} title="Edit Question">
            <TextInput value={items[selectedQuestionIndex].question} onChange={(e) => editHandler(e.target.value)} />
            <Button mt='sm' onClick={close}>Save & Close</Button>
        </Modal>

        </>
    );
}

export default Questions;