'use client';

import { useState } from 'react';
import { suggestBidIncrement, type SuggestBidIncrementInput, type SuggestBidIncrementOutput } from '@/ai/flows/bidding-tool';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

type BiddingToolProps = {
  currentBid: number;
  productValue: number;
  timeRemaining: number;
};

export default function BiddingTool({ currentBid, productValue, timeRemaining }: BiddingToolProps) {
  const [aggressiveness, setAggressiveness] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");
  const [suggestion, setSuggestion] = useState<SuggestBidIncrementOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSuggestion = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    const input: SuggestBidIncrementInput = {
      currentBid,
      productValue,
      timeRemaining,
      bidderAggressiveness: aggressiveness,
    };

    try {
      const result = await suggestBidIncrement(input);
      setSuggestion(result);
    } catch (e) {
      console.error(e);
      setError('Failed to get suggestion. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card/50 border-primary/20 border-dashed">
      <CardHeader>
        <div className="flex items-center gap-3">
            <BrainCircuit className="h-6 w-6 text-primary"/>
            <div>
                <CardTitle>AI Bidding Advisor</CardTitle>
                <CardDescription>Not sure how much to bid? Get an AI-powered suggestion.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="mb-2 block font-semibold">My Bidding Style</Label>
          <RadioGroup
            defaultValue="MEDIUM"
            onValueChange={(value: "LOW" | "MEDIUM" | "HIGH") => setAggressiveness(value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="LOW" id="low" />
              <Label htmlFor="low" className="font-normal">Conservative</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="MEDIUM" id="medium" />
              <Label htmlFor="medium" className="font-normal">Balanced</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="HIGH" id="high" />
              <Label htmlFor="high" className="font-normal">Aggressive</Label>
            </div>
          </RadioGroup>
        </div>
        <Button onClick={getSuggestion} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Getting Suggestion...
            </>
          ) : (
            'Get Suggestion'
          )}
        </Button>
        {error && <p className="text-destructive text-sm">{error}</p>}
        {suggestion && (
          <Alert className="bg-background">
            <AlertTitle className="text-primary font-bold flex items-center gap-2">
              AI Suggests an Increment of ${suggestion.suggestedIncrement.toLocaleString()}
            </AlertTitle>
            <AlertDescription className="mt-2">
              <strong>Reasoning:</strong> {suggestion.reasoning}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
