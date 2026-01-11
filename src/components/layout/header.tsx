
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Gavel, LayoutGrid, Menu, Plus, User as UserIcon, LogOut, Wallet } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth, useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { doc } from 'firebase/firestore';
import { Skeleton } from '../ui/skeleton';

export function Header() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();

  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userData, isLoading: isUserDataLoading } = useDoc<{ balance: number }>(userDocRef);


  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  const navLinks = [
    { href: '/#featured', label: 'Auctions' },
    { href: '/add-product', label: 'Sell Item', icon: Plus },
  ];

  const renderUserSection = () => {
    if (isUserLoading) {
      return (
        <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      )
    }

    if (user) {
      return (
        <>
          <div className="hidden md:flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Balance:</p>
            {isUserDataLoading ? <Skeleton className="h-5 w-16" /> : 
              <p className="text-sm font-bold">${(userData?.balance ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            }
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
                  <AvatarFallback>{user.displayName?.charAt(0) ?? user.email?.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.displayName}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                <LayoutGrid className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/add-product')}>
                <Plus className="mr-2 h-4 w-4" />
                <span>Sell an Item</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/wallet')}>
                <Wallet className="mr-2 h-4 w-4" />
                <span>Wallet</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    }

    return (
        <div className="hidden md:flex gap-2">
            <Button asChild variant="ghost" className="hover:bg-accent hover:text-accent-foreground">
                <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
                <Link href="/signup">Get Started</Link>
            </Button>
        </div>
    );
  };

  const renderMobileMenu = () => {
    if (isUserLoading) {
        return null;
    }
    if (user) {
      return (
         <div className="flex flex-col gap-2 mt-auto">
            <Button asChild size="lg" variant="outline" onClick={handleSignOut}>
               <p>Sign Out</p>
             </Button>
         </div>
      )
    }

    return (
      <div className="flex flex-col gap-2 mt-auto">
        <Button asChild size="lg" variant="outline"><Link href="/login">Sign In</Link></Button>
        <Button asChild size="lg"><Link href="/signup">Get Started</Link></Button>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-md">
            <Gavel className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-white">Auction Hub</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted-foreground transition-colors hover:text-primary font-medium flex items-center gap-1">
              {link.icon && <link.icon className="h-4 w-4" />}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {renderUserSection()}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex h-full flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-2 mb-4">
                    <div className="bg-primary p-2 rounded-md">
                        <Gavel className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold text-white">Auction Hub</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-2">
                      {link.icon && <link.icon className="h-4 w-4" />}
                      {link.label}
                    </Link>
                  ))}
                  {user && (
                    <>
                      <Link href="/dashboard" className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-2">
                          <LayoutGrid className="h-4 w-4" />
                          Dashboard
                      </Link>
                       <Link href="/wallet" className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-2">
                          <Wallet className="h-4 w-4" />
                          Wallet
                      </Link>
                    </>
                  )}
                </nav>
                <div className="md:hidden">
                 {renderMobileMenu()}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
