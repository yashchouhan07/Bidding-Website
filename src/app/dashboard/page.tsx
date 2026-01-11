'use client';

import { useUser } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Hammer, Package, Trophy, Gavel } from 'lucide-react';
import MyListingsTab from '@/components/dashboard/my-listings-tab';
import WonItemsTab from '@/components/dashboard/won-items-tab';
import MyBidsTab from '@/components/dashboard/my-bids-tab';


export default function DashboardPage() {
    const { user } = useUser();

    // Mock data for now, will be replaced with real data
    const stats = {
        activeBids: 0,
        myListings: 0,
        wonAuctions: 0,
    };

    return (
        <div className="container py-8 md:py-12">
            <header className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Dashboard</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Welcome back, {user?.displayName || user?.email}
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Active Bids</CardTitle>
                        <Hammer className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeBids}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">My Listings</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.myListings}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Won Auctions</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.wonAuctions}</div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="my-bids">
                <TabsList>
                    <TabsTrigger value="my-bids">My Bids</TabsTrigger>
                    <TabsTrigger value="my-listings">My Listings</TabsTrigger>
                    <TabsTrigger value="won-items">Won Items</TabsTrigger>
                </TabsList>
                <TabsContent value="my-bids" className="py-6">
                   <MyBidsTab />
                </TabsContent>
                <TabsContent value="my-listings" className="py-6">
                    <MyListingsTab />
                </TabsContent>
                <TabsContent value="won-items" className="py-6">
                    <WonItemsTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
