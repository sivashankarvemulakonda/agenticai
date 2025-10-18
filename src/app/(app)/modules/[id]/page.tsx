'use client';

import { notFound } from 'next/navigation';
import { useState } from 'react';
import { modules } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

export default function ModuleDetailPage({ params }: { params: { id: string } }) {
  const module = modules.find(m => m.id === params.id);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!module) {
    notFound();
  }

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: value }));
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true);
  };
  
  const totalCorrect = module.content.quiz.filter((q, i) => answers[i] === q.correctAnswer).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">{module.title}</h1>
        <p className="text-lg text-muted-foreground mt-2">{module.description}</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={module.content.videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-t-lg"
            ></iframe>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="quiz" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="quiz">Interactive Quiz</TabsTrigger>
          <TabsTrigger value="transcript">Video Transcript</TabsTrigger>
        </TabsList>
        <TabsContent value="quiz">
          <Card>
            <CardHeader>
              <CardTitle>Check Your Understanding</CardTitle>
              <CardDescription>Answer these questions to test your knowledge from the video.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {module.content.quiz.map((q, i) => (
                <div key={i} className="space-y-3">
                  <p className="font-semibold">{i + 1}. {q.question}</p>
                  <RadioGroup value={answers[i]} onValueChange={(value) => handleAnswerChange(i, value)} disabled={submitted}>
                    {q.options.map((opt, j) => (
                      <div key={j} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt} id={`q${i}-opt${j}`} />
                        <Label htmlFor={`q${i}-opt${j}`}>{opt}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {submitted && (
                    <div className="flex items-center gap-2 text-sm mt-2">
                      {answers[i] === q.correctAnswer ? (
                         <Badge variant="secondary" className="border-green-500 text-green-700 dark:text-green-400"><CheckCircle className="h-4 w-4 mr-1" /> Correct</Badge>
                      ) : (
                         <Badge variant="destructive"><XCircle className="h-4 w-4 mr-1" /> Incorrect. The answer is: {q.correctAnswer}</Badge>
                      )}
                    </div>
                  )}
                </div>
              ))}
               <div className="flex justify-between items-center pt-4">
                <Button onClick={handleSubmitQuiz} disabled={submitted}>Submit Quiz</Button>
                {submitted && (
                  <p className="font-bold">Your Score: {totalCorrect} / {module.content.quiz.length}</p>
                )}
               </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transcript">
          <Card>
            <CardHeader>
              <CardTitle>Transcript</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
              <p>{module.content.transcript}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
