'use client';

import { useState, useTransition } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { runInteractionAnalysis } from '@/actions/ai';
import type { AnalyzeStudentInteractionsOutput } from '@/ai/flows/analyze-student-interactions';

export function InteractionAnalysis() {
  const [isPending, startTransition] = useTransition();
  const [analysis, setAnalysis] = useState<AnalyzeStudentInteractionsOutput | null>(null);
  const { toast } = useToast();

  const handleAnalysis = () => {
    startTransition(async () => {
      try {
        const result = await runInteractionAnalysis();
        setAnalysis(result);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Analysis Failed',
          description: 'Could not analyze student interactions. Please try again.',
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Forum Interaction Analysis</CardTitle>
        <CardDescription>
          Use AI to analyze recent forum posts for engagement patterns and identify at-risk students.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {analysis ? (
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2 text-primary">Engagement Summary</h3>
              <p className="text-muted-foreground">{analysis.engagementSummary}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-primary">Topics Needing Attention</h3>
              <p className="text-muted-foreground">{analysis.topicsNeedingAttention}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-primary">Potentially At-Risk Students</h3>
              <p className="text-muted-foreground">{analysis.atRiskStudents}</p>
            </div>
             <Button variant="outline" size="sm" onClick={() => setAnalysis(null)} className="mt-4">
              Run New Analysis
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed border-muted-foreground/30 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <p className="text-muted-foreground">Click the button to start the AI analysis.</p>
            <Button onClick={handleAnalysis} disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze Interactions
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
