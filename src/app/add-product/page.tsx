'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/lib/data";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, useUser } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";

const productSchema = z.object({
  name: z.string().min(1, "Item Title is required."),
  description: z.string().min(1, "Description is required."),
  categoryId: z.string().min(1, "Category is required."),
  startingBid: z.coerce.number().min(1, "Starting bid must be at least 1."),
  auctionDuration: z.coerce.number().min(1, "Auction must last at least 1 day.").max(30, "Auction can last at most 30 days."),
  imageUrl: z.any().refine(files => files?.length == 1, "Image is required."),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function AddProductPage() {
    const { toast } = useToast();
    const firestore = useFirestore();
    const { user } = useUser();
    const router = useRouter();

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            categoryId: "",
            startingBid: 0,
            auctionDuration: 7,
        }
    });

    const onSubmit = async (data: ProductFormValues) => {
        if (!user || !firestore) {
            toast({
                variant: "destructive",
                title: "Authentication Error",
                description: "You must be logged in to list an item.",
            });
            return;
        }

        // This is a placeholder for image upload. In a real app, you would upload the file
        // to a storage service like Firebase Storage and get the URL.
        const imageUrl = "https://picsum.photos/seed/new-item/600/400";
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + data.auctionDuration);

        try {
            const productData = {
                name: data.name,
                description: data.description,
                categoryId: data.categoryId,
                sellerId: user.uid,
                startingBid: data.startingBid,
                currentBid: data.startingBid,
                imageUrl: imageUrl,
                images: [imageUrl],
                endDate: endDate.toISOString(),
                createdAt: new Date().toISOString(),
                bidHistory: [],
            };

            const productsCollection = collection(firestore, 'products');
            await addDoc(productsCollection, productData);
            
            toast({
                title: "Item Listed!",
                description: `${data.name} is now up for auction.`,
            });
            router.push('/dashboard');
        } catch (error) {
            console.error("Error adding document: ", error);
            const errorMessage = (error instanceof Error) ? error.message : "There was an error listing your item. Please try again.";
            toast({
                variant: "destructive",
                title: "Listing Failed",
                description: errorMessage,
            });
        }
    };


    return (
        <div className="container py-12">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl">List a New Item</CardTitle>
                    <CardDescription>Fill out the details below to put your item up for auction.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Item Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Vintage Leather Jacket" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Describe your item in detail." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="categoryId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                            </FormControl>
                                                    <SelectContent>
                                                        {categories.map(category => (
                                                            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Image</FormLabel>
                                            <FormControl>
                                                 <Input type="file" className="file:text-foreground" onChange={(e) => field.onChange(e.target.files)} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="startingBid"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Starting Bid ($)</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="e.g., 25" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="auctionDuration"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Auction Duration (days)</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="e.g., 7" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? 'Listing Item...' : 'List Item'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
