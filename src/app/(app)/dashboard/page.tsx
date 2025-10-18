import { Users, BookOpen, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { students, modules } from '@/lib/data';
import { EngagementChart } from './engagement-chart';
import { AtRiskStudents } from './at-risk-students';
import { InteractionAnalysis } from './interaction-analysis';

export default function DashboardPage() {
  const atRiskCount = students.filter(s => s.isAtRisk).length;
  const averageEngagement = Math.round(students.reduce((acc, s) => acc + s.engagement, 0) / students.length);

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">in this course</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interactive Modules</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{modules.length}</div>
            <p className="text-xs text-muted-foreground">available for learning</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageEngagement}%</div>
            <p className="text-xs text-muted-foreground">average across all students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
            <Users className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{atRiskCount}</div>
            <p className="text-xs text-muted-foreground">require intervention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2">
           <EngagementChart />
        </div>
        <div className="row-start-3 xl:row-start-1">
           <AtRiskStudents />
        </div>
        <div className="xl:col-span-3">
          <InteractionAnalysis />
        </div>
      </div>
    </div>
  );
}
