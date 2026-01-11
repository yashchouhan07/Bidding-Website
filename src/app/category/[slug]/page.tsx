import { notFound } from 'next/navigation';
import { categories, products } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

type CategoryPageProps = {
    params: { slug: string };
};

export default function CategoryPage({ params }: CategoryPageProps) {
    const category = categories.find(c => c.id === params.slug);
    if (!category) {
        notFound();
    }

    const categoryProducts = products.filter(p => p.category === category.id);

    return (
        <div className="container py-8 md:py-12">
            <Breadcrumb className="mb-8">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{category.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{category.name}</h1>
            <p className="text-lg text-muted-foreground mb-8">
                {categoryProducts.length} item(s) available for bidding.
            </p>

            {categoryProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categoryProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 border border-dashed rounded-lg">
                    <h2 className="text-xl font-semibold">No Items Found</h2>
                    <p className="text-muted-foreground mt-2">There are currently no items in this category. Check back soon!</p>
                </div>
            )}
        </div>
    );
}
