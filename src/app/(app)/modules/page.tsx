import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { modules } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ModulesPage() {
  const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Interactive Modules</h1>
        <p className="text-muted-foreground">Browse and engage with available learning content.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map(module => {
          const image = getImage(module.image);
          return (
            <Card key={module.id} className="flex flex-col">
              <CardHeader className="p-0">
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={module.title}
                    width={600}
                    height={400}
                    data-ai-hint={image.imageHint}
                    className="rounded-t-lg object-cover aspect-video"
                  />
                )}
              </CardHeader>
              <div className="flex flex-col flex-1 p-6">
                <CardTitle>{module.title}</CardTitle>
                <CardDescription className="mt-2 flex-1">{module.description}</CardDescription>
                <CardFooter className="p-0 pt-6">
                  <Button asChild className="w-full">
                    <Link href={`/modules/${module.id}`}>Start Module</Link>
                  </Button>
                </CardFooter>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
