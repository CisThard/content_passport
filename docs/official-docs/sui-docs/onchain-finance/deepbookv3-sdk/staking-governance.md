<!-- Source: https://docs.sui.io/onchain-finance/deepbookv3-sdk/staking-governance -->

* [](</>)
  * [DeepBookV3](</onchain-finance/deepbookv3/deepbook>)
  * [DeepBookV3 SDK](</onchain-finance/deepbookv3-sdk/>)
  * Staking and Governance


On this page

# Staking and Governance SDK

Examples of interacting with staking and governance. These functions typically require a `balanceManagerKey`, `poolKey`, or both. For details on these keys, see [DeepBookV3 SDK](</onchain-finance/deepbookv3-sdk#keys>). The SDK includes some default keys that you can view in the `constants.ts` file.

See [Staking and Governance](</onchain-finance/deepbookv3/contract-information/staking-governance>) for more information on the staking and governance API.

## Staking and governance functions​

### stake​

Use `stake` to stake an amount you specify into a specific pool. The call returns a `Transaction` object.

**Parameters**

  * `poolKey`: String that identifies the pool.
  * `balanceManagerKey`: String that identifies the balance manager.
  * `stakeAmount`: Number representing the amount to stake.


[code] 
    stake(poolKey: string, balanceManagerKey: string, stakeAmount: number);  
    
[/code]

### unstake​

Use `unstake` to unstake from a particular pool. The call returns a `Transaction` object.

**Parameters**

  * `poolKey`: String that identifies the pool.
  * `balanceManagerKey`: String that identifies the balance manager.


[code] 
    unstake(poolKey: string, balanceManagerKey: string);  
    
[/code]

### submitProposal​

Use `submitProposal` to submit a governance proposal. The call returns a `Transaction` object.

**Parameters**

  * `params`: A `ProposalParams` object that defines the proposal.


[code] 
    submitProposal({ params: ProposalParams });  
    
[/code]

### vote​

Use `vote` to vote on a proposal. The call returns a `Transaction` object.

**Parameters**

  * `poolKey`: String that identifies the pool.
  * `balanceManagerKey`: String that identifies the balance manager.
  * `proposal_id`: String that identifies the proposal to vote on.


[code] 
    vote(poolKey: string, balanceManagerKey: string, proposal_id: string)  
    
[/code]

### `claimRebates`​

Use `claimRebates` to claim maker/taker rebates for a balance manager in a specific pool. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `poolKey`: String that identifies the pool.
  * `balanceManagerKey`: String that identifies the balance manager.


File not found in manifest: `packages/deepbook-v3/src/transactions/deepbook.ts`. You probably need to run `pnpm prebuild` and restart the site.

## Examples​

The following examples demonstrate custom staking and governance functions that you can place into the `DeepBookMarketMaker` class.

### stake custom function​
[code] 
    stake = (  
      poolKey: string,   
      balanceManagerKey: string,   
      stakeAmount: number  
    ) => (tx: Transaction) => {}  
      
    // Custom function to stake 100 DEEP in DeepBookMarketMaker class  
    stake = (tx: Transaction) => {  
      const poolKey = 'DBUSDT_DBUSDC';  
      const balanceManagerKey = 'MANAGER_1';  
      tx.add(this.governance.stake(poolKey, balanceManagerKey, 100));  
    };  
    
[/code]

### unstake custom function​
[code] 
    unstake = (  
      poolKey: string,   
      balanceManagerKey: string  
    ) => (tx: Transaction) => {}  
      
    // Custom function to unstake in DeepBookMarketMaker class  
    unstake = (tx: Transaction) => {  
      const poolKey = 'DBUSDT_DBUSDC';  
      const balanceManagerKey = 'MANAGER_1';  
      tx.add(this.governance.unstake(poolKey, balanceManagerKey));  
    };  
    
[/code]

### submitProposal custom function​
[code] 
    // Proposal params  
    export interface ProposalParams {  
      poolKey: string;  
      balanceManagerKey: string;  
      takerFee: number;  
      makerFee: number;  
      stakeRequired: number;  
    }  
      
    submitProposal = (params: ProposalParams) => (tx: Transaction) => {}  
      
    // Custom function to submit proposal in DeepBookMarketMaker class  
    submitProposal = (tx: Transaction) => {  
      const poolKey = 'DBUSDT_DBUSDC';  
      const balanceManagerKey = 'MANAGER_1';  
      tx.add(  
        this.governance.submitProposal({  
          poolKey,  
          balanceManagerKey,  
          takerFee: 0.002,  
          makerFee: 0.001,  
          stakeRequired: 100,  
        }),  
      );  
    };  
    
[/code]

### vote custom function​
[code] 
    vote = (  
      poolKey: string,   
      balanceManagerKey: string,   
      proposal_id: string  
    ) => (tx: Transaction) => {}  
      
    // Custom function to vote in DeepBookMarketMaker class  
    vote = (tx: Transaction) => {  
      const poolKey = 'DBUSDT_DBUSDC';  
      const balanceManagerKey = 'MANAGER_1';  
      const proposalID = '0x123456789';  
      tx.add(this.governance.vote(poolKey, balanceManagerKey, proposalID));  
    };  
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbookv3-sdk/staking-governance.mdx>)

[PreviousSwaps](</onchain-finance/deepbookv3-sdk/swaps>)[NextIndexer](</onchain-finance/deepbookv3/deepbookv3-indexer>)

  * Staking and governance functions
    * stake
    * unstake
    * submitProposal
    * vote
    * `claimRebates`
  * Examples
    * stake custom function
    * unstake custom function
    * submitProposal custom function
    * vote custom function
