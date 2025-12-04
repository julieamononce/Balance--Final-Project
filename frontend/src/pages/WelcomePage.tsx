import { useState } from "react";
export default function WelcomePage() {
    return (

    <div>
        <h1 className="text-5xl font-bold text-white mb-4">Balance</h1>
        <p className="text-lg text-white/90 mb-12 max-w-xl">
        Your companion for academic success and mental well-being</p>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your mode to continue your journey
            </p>

        <h2 className="text-2xl font-semibold">Reflect Mode</h2>
                <p className="text-muted-foreground">
                Check in with your emotions, reflect on your well-being, and practice mindfulness. 
                A space for self-awareness and balance.
                </p>
        
        <h2 className="text-2xl font-semibold">Focus Mode</h2>
                <p className="text-muted-foreground">
                Get help with study strategies, summarize your notes, and organize your academic tasks. 
                Your productivity companion.
                </p>

                <h2 className="font-medium text-foreground">About Balanced:</h2>
        <p>
            A human-centered AI tool that helps you balance productivity with emotional well-being. 
            Choose between <span className="text-primary font-medium">Reflect Mode</span> for mindfulness 
            and <span className="text-secondary font-medium">Focus Mode</span> for academic support.
        </p>

    </div>

    
    );
}