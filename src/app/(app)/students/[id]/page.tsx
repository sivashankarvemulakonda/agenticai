import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { students } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PersonalizedIntervention } from './personalized-intervention';
import { Activity, BookOpen, Eye } from 'lucide-react';

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const student = students.find(s => s.id === params.id);
  
  if (!student) {
    notFound();
  }

  const image = PlaceHolderImages.find(img => img.id === student.avatar);

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-1 space-y-8">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center gap-4">
            {image && (
              <Image
                src={image.imageUrl}
                alt={student.name}
                width={128}
                height={128}
                data-ai-hint={image.imageHint}
                className="rounded-full border-4 border-card shadow-md"
              />
            )}
            <div className="text-center">
              <h1 className="text-2xl font-bold">{student.name}</h1>
              <p className="text-muted-foreground">Student ID: {student.id}</p>
            </div>
            {student.isAtRisk && <Badge variant="destructive">At Risk</Badge>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="h-4 w-4" />
                <span>Engagement Score</span>
              </div>
              <span className="font-semibold">{student.engagement}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>Module Progress</span>
              </div>
              <span className="font-semibold">{student.progress}%</span>
            </div>
             <Progress value={student.progress} className="h-2" />
             <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                <span>Last Seen</span>
              </div>
              <span className="font-semibold">{student.lastSeen}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <PersonalizedIntervention student={student} />
      </div>
    </div>
  );
}
