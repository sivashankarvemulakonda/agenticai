import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { students } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function StudentsPage() {
  const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Students</CardTitle>
        <CardDescription>A list of all students in the course.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead className="text-center">Engagement</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Last Seen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map(student => (
              <TableRow key={student.id}>
                <TableCell>
                  <Link href={`/students/${student.id}`} className="flex items-center gap-3 hover:underline">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={getImage(student.avatar)} alt={student.name} data-ai-hint="student portrait" />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{student.name}</div>
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={student.isAtRisk ? 'destructive' : 'secondary'}>
                    {student.engagement}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={student.progress} className="w-24 h-2" />
                    <span>{student.progress}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{student.lastSeen}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
