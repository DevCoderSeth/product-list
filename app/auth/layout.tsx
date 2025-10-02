import { Card, CardContent } from "@/app/views/components/card";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-2 md:px-4 py-5">
      <div className="w-full max-w-sm md:max-w-3xl">
        <Card className="overflow-hidden bg-secondary">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="relative hidden md:block border-r border-gray-300">
              <Image
                src="/auth.png"
                width={500}
                height={500}
                alt="Authentication Image"
                className="h-full py-5 w-full object-contain"
              />
            </div>
            <div className="w-full">{children}</div>
          </CardContent>
        </Card>

        <div className="text-center text-sm mt-2">
          A product of NetUganda DevGroup
        </div>
      </div>
    </div>
  );
}
