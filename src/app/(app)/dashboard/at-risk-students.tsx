import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { students } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const atRiskStudents = students.filter(s => s.isAtRisk);

export function AtRiskStudents() {
  const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>At-Risk Students</CardTitle>
          <CardDescription>Students showing signs of disengagement.</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/students">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead className="text-center">Engagement</TableHead>
              <TableHead className="text-center">Progress</TableHead>
              <TableHead className="text-right">Last Seen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {atRiskStudents.map(student => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={getImage(student.avatar)} alt={student.name} data-ai-hint="student portrait" />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{student.name}</div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="destructive">{student.engagement}%</Badge>
                </TableCell>
                <TableCell className="text-center">{student.progress}%</TableCell>
                <TableCell className="text-right">{student.lastSeen}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
