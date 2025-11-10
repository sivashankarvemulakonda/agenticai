'use client';

import { useState, useTransition } from 'react';
import { Sparkles, Loader2, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { getPersonalizedIntervention } from '@/actions/ai';
import type { PersonalizeInterventionsOutput } from '@/ai/flows/personalize-interventions';
import type { Student } from '@/types';

export function PersonalizedIntervention({ student }: { student: Student }) {
  const [isPending, startTransition] = useTransition();
  const [intervention, setIntervention] = useState<PersonalizeInterventionsOutput | null>(null);
  const { toast } = useToast();

  const handleGeneration = () => {
    startTransition(async () => {
      try {
        const result = await getPersonalizedIntervention(student.id);
        setIntervention(result);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Generation Failed',
          description: 'Could not generate a personalized intervention. Please try again.',
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalized Intervention</CardTitle>
        <CardDescription>
          Generate an AI-powered activity or intervention suggestion for {student.name}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {intervention ? (
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Wand2 className="h-4 w-4 text-accent" />
                {intervention.interventionType}
              </h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{intervention.interventionDetails}</p>
            </div>
             <Button variant="outline" size="sm" onClick={() => setIntervention(null)} className="mt-4">
              Generate New Suggestion
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed border-muted-foreground/30 p-8 text-center">
             <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <Sparkles className="h-8 w-8 text-accent" />
            </div>
            <p className="text-muted-foreground">Click to generate a tailored suggestion to boost engagement.</p>
            <Button onClick={handleGeneration} disabled={isPending} variant="secondary">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Suggestion
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
