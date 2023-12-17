// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('NFTMarketplace');

// Create a new document in the collection.
db.getCollection('nfts').insertOne({

    // The document's fields.
    name: 'NFT #1',
    description: 'NFT for NFT Marketplace',
    price: 22,
    like: 1,

});
