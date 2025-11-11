import QuizQuestion from '../QuizQuestion';

export default function QuizQuestionExample() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <QuizQuestion
        question="Do you try new things often?"
        choices={[
          { text: "Always", value: 2 },
          { text: "Sometimes", value: 1 },
          { text: "Never", value: 0 }
        ]}
        onAnswer={(value) => console.log('Selected value:', value)}
      />
    </div>
  );
}
