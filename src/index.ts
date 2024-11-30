import { startIndexing } from "./indexer";

// Start the indexer when the application starts
console.log("Starting indexer...");
startIndexing().catch(console.error);
